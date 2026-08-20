"use client";

import {
  ChangeEvent,
  DragEvent,
  KeyboardEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

/**
 * Enterprise CSV Viewer
 * ---------------------
 * Single-file Next.js App Router page.
 *
 * Design goals:
 * - No runtime dependencies beyond React / Next.js.
 * - Strict TypeScript.
 * - Safe parsing: size/row/cell limits, no eval, no HTML injection.
 * - Supports CSV + TSV-like exports, including UTF-16 exports from tools such as
 *   Google Ads Keyword Planner (often delivered with a .csv extension).
 * - Responsive premium UI with sticky table header/first column.
 * - Search, sortable columns, pagination, column visibility, density control.
 * - Formula-injection protection on export.
 */

type Row = string[];
type SortDirection = "asc" | "desc";
type Density = "compact" | "comfortable";
type ToastTone = "info" | "success" | "error";

interface Toast {
  id: number;
  tone: ToastTone;
  message: string;
}

interface CsvDocument {
  headers: string[];
  rows: Row[];
  delimiter: string;
  encoding: string;
  fileName: string;
  originalRowCount: number;
}

const MAX_FILE_BYTES = 50 * 1024 * 1024;
const MAX_ROWS = 100_000;
const MAX_COLUMNS = 200;
const MAX_CELL_CHARS = 100_000;
const DEFAULT_PAGE_SIZE = 50;
const PAGE_SIZE_OPTIONS = [25, 50, 100, 250] as const;

const theme = {
  ink: "#102033",
  muted: "#66758a",
  soft: "#f6f8fb",
  border: "#e4eaf1",
  accent: "#2563eb",
  accentSoft: "#eff6ff",
  white: "#ffffff",
  success: "#047857",
  danger: "#b42318",
  warning: "#b45309",
};

function detectEncoding(bytes: Uint8Array): {
  encoding: "utf-8" | "utf-16le" | "utf-16be";
  offset: number;
} {
  if (bytes.length >= 3 && bytes[0] === 0xef && bytes[1] === 0xbb && bytes[2] === 0xbf) {
    return { encoding: "utf-8", offset: 3 };
  }

  if (bytes.length >= 2 && bytes[0] === 0xff && bytes[1] === 0xfe) {
    return { encoding: "utf-16le", offset: 2 };
  }

  if (bytes.length >= 2 && bytes[0] === 0xfe && bytes[1] === 0xff) {
    return { encoding: "utf-16be", offset: 2 };
  }

  // UTF-16LE exports sometimes arrive without a reliable BOM.
  let zeroOdd = 0;
  let zeroEven = 0;
  const sampleLength = Math.min(bytes.length, 4000);

  for (let i = 0; i < sampleLength; i += 1) {
    if (bytes[i] === 0) {
      if (i % 2 === 0) zeroEven += 1;
      else zeroOdd += 1;
    }
  }

  if (zeroOdd > sampleLength / 25 && zeroOdd > zeroEven * 2) {
    return { encoding: "utf-16le", offset: 0 };
  }

  if (zeroEven > sampleLength / 25 && zeroEven > zeroOdd * 2) {
    return { encoding: "utf-16be", offset: 0 };
  }

  return { encoding: "utf-8", offset: 0 };
}

function decodeBytes(bytes: Uint8Array): {
  text: string;
  encoding: string;
} {
  const detected = detectEncoding(bytes);
  const decoder = new TextDecoder(detected.encoding, { fatal: false });
  return {
    text: decoder.decode(bytes.subarray(detected.offset)).replace(/^\uFEFF/, ""),
    encoding: detected.encoding.toUpperCase(),
  };
}

function detectDelimiter(text: string): string {
  const sample = text.split(/\r?\n/).slice(0, 12).join("\n");
  const candidates = [",", "\t", ";", "|"];
  let best = ",";
  let bestScore = -Infinity;

  for (const delimiter of candidates) {
    let score = 0;
    let inQuotes = false;
    let fieldsOnLine = 1;
    let lines = 0;

    for (let i = 0; i < sample.length; i += 1) {
      const char = sample[i];

      if (char === '"') {
        if (inQuotes && sample[i + 1] === '"') {
          i += 1;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (!inQuotes && char === delimiter) {
        fieldsOnLine += 1;
      } else if (!inQuotes && char === "\n") {
        if (fieldsOnLine > 1) score += fieldsOnLine;
        lines += 1;
        fieldsOnLine = 1;
      }
    }

    score += Math.max(0, fieldsOnLine - 1);
    if (lines > 0 && score > bestScore) {
      best = delimiter;
      bestScore = score;
    }
  }

  return best;
}

function parseDelimited(
  text: string,
  delimiter: string,
): { headers: string[]; rows: Row[]; originalRowCount: number } {
  const rows: Row[] = [];
  let row: string[] = [];
  let cell = "";
  let inQuotes = false;
  let sawAnyCharacter = false;
  let originalRowCount = 0;

  const pushCell = () => {
    if (cell.length > MAX_CELL_CHARS) {
      throw new Error(
        `A cell exceeds the ${MAX_CELL_CHARS.toLocaleString()} character safety limit.`,
      );
    }
    row.push(cell);
    cell = "";
  };

  const pushRow = () => {
    // Ignore a completely blank line.
    if (row.length === 1 && row[0] === "") {
      row = [];
      return;
    }

    originalRowCount += 1;

    if (row.some((value) => value.length > 0)) {
      rows.push(row);
    }

    row = [];

    if (rows.length > MAX_ROWS + 1) {
      throw new Error(
        `This file exceeds the ${MAX_ROWS.toLocaleString()} data-row safety limit.`,
      );
    }
  };

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    sawAnyCharacter = true;

    if (inQuotes) {
      if (char === '"') {
        if (text[i + 1] === '"') {
          cell += '"';
          i += 1;
        } else {
          inQuotes = false;
        }
      } else {
        cell += char;
      }
      continue;
    }

    if (char === '"') {
      if (cell.length === 0) {
        inQuotes = true;
      } else {
        // Preserve non-structural quote characters literally.
        cell += char;
      }
      continue;
    }

    if (char === delimiter) {
      pushCell();
      continue;
    }

    if (char === "\n") {
      pushCell();
      pushRow();
      continue;
    }

    if (char === "\r") {
      if (text[i + 1] === "\n") {
        continue;
      }
      pushCell();
      pushRow();
      continue;
    }

    cell += char;
  }

  if (inQuotes) {
    throw new Error("The CSV contains an unterminated quoted field.");
  }

  if (sawAnyCharacter || cell.length > 0 || row.length > 0) {
    pushCell();
    pushRow();
  }

  if (rows.length === 0) {
    throw new Error("The file does not contain any tabular data.");
  }

  const rawHeaders = rows[0];
  const columnCount = rawHeaders.length;

  if (columnCount === 0) {
    throw new Error("The file does not contain columns.");
  }

  if (columnCount > MAX_COLUMNS) {
    throw new Error(
      `This file contains ${columnCount.toLocaleString()} columns. The safety limit is ${MAX_COLUMNS}.`,
    );
  }

  const headers = rawHeaders.map((header, index) => {
    const clean = header.trim();
    return clean || `Column ${index + 1}`;
  });

  const dataRows = rows.slice(1).map((source) => {
    const output = Array.from({ length: columnCount }, (_, index) => source[index] ?? "");
    return output;
  });

  return {
    headers,
    rows: dataRows.slice(0, MAX_ROWS),
    originalRowCount: Math.max(0, originalRowCount - 1),
  };
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  return `${(bytes / 1024 / 1024 / 1024).toFixed(1)} GB`;
}

function compareValues(a: string, b: string): number {
  const aTrimmed = a.trim();
  const bTrimmed = b.trim();

  const aNumber = Number(aTrimmed.replace(/,/g, ""));
  const bNumber = Number(bTrimmed.replace(/,/g, ""));

  const aIsNumber = aTrimmed !== "" && Number.isFinite(aNumber);
  const bIsNumber = bTrimmed !== "" && Number.isFinite(bNumber);

  if (aIsNumber && bIsNumber) {
    return aNumber - bNumber;
  }

  if (aIsNumber !== bIsNumber) {
    return aIsNumber ? -1 : 1;
  }

  return aTrimmed.localeCompare(bTrimmed, undefined, {
    numeric: true,
    sensitivity: "base",
  });
}

function safeCsvCell(value: string): string {
  // Prevent spreadsheet formula injection when exporting imported data.
  let safe = value;
  if (/^[\t\r\n ]*[=+\-@]/.test(safe)) {
    safe = `'${safe}`;
  }

  if (/[",\r\n]/.test(safe)) {
    safe = `"${safe.replace(/"/g, '""')}"`;
  }

  return safe;
}

function downloadText(content: string, fileName: string): void {
  const blob = new Blob([content], {
    type: "text/csv;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = fileName.endsWith(".csv") ? fileName : `${fileName}.csv`;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

function initials(fileName: string): string {
  const pieces = fileName
    .replace(/\.[^/.]+$/, "")
    .split(/[\s_-]+/)
    .filter(Boolean);

  if (pieces.length === 0) return "CSV";
  return pieces.slice(0, 2).map((part) => part[0]?.toUpperCase() ?? "").join("");
}

function humanDelimiter(delimiter: string): string {
  if (delimiter === "\t") return "Tab";
  if (delimiter === ",") return "Comma";
  if (delimiter === ";") return "Semicolon";
  if (delimiter === "|") return "Pipe";
  return delimiter;
}

function Icon({
  name,
  size = 18,
  strokeWidth = 1.8,
}: {
  name:
    | "upload"
    | "search"
    | "download"
    | "columns"
    | "chevron-down"
    | "chevron-left"
    | "chevron-right"
    | "sort"
    | "x"
    | "file"
    | "shield"
    | "rows"
    | "sparkles";
  size?: number;
  strokeWidth?: number;
}) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (name) {
    case "upload":
      return (
        <svg {...common}>
          <path d="M12 16V4" />
          <path d="m7 9 5-5 5 5" />
          <path d="M5 20h14" />
        </svg>
      );
    case "search":
      return (
        <svg {...common}>
          <circle cx="11" cy="11" r="6.5" />
          <path d="m16 16 4 4" />
        </svg>
      );
    case "download":
      return (
        <svg {...common}>
          <path d="M12 4v11" />
          <path d="m7 11 5 5 5-5" />
          <path d="M5 20h14" />
        </svg>
      );
    case "columns":
      return (
        <svg {...common}>
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <path d="M9 4v16M15 4v16" />
        </svg>
      );
    case "chevron-down":
      return (
        <svg {...common}>
          <path d="m6 9 6 6 6-6" />
        </svg>
      );
    case "chevron-left":
      return (
        <svg {...common}>
          <path d="m14 6-6 6 6 6" />
        </svg>
      );
    case "chevron-right":
      return (
        <svg {...common}>
          <path d="m10 6 6 6-6 6" />
        </svg>
      );
    case "sort":
      return (
        <svg {...common}>
          <path d="m8 6-3 3 3 3" />
          <path d="M5 9h10" />
          <path d="m16 18 3-3-3-3" />
          <path d="M19 15H9" />
        </svg>
      );
    case "x":
      return (
        <svg {...common}>
          <path d="m6 6 12 12M18 6 6 18" />
        </svg>
      );
    case "file":
      return (
        <svg {...common}>
          <path d="M7 3h7l4 4v14H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
          <path d="M14 3v5h5" />
        </svg>
      );
    case "shield":
      return (
        <svg {...common}>
          <path d="M12 3 19 6v5c0 4.5-2.7 8-7 10-4.3-2-7-5.5-7-10V6l7-3Z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
    case "rows":
      return (
        <svg {...common}>
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      );
    case "sparkles":
      return (
        <svg {...common}>
          <path d="m12 3 1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5L12 3Z" />
          <path d="m19 15 .7 2.3L22 18l-2.3.7L19 21l-.7-2.3L16 18l2.3-.7L19 15Z" />
        </svg>
      );
  }
}

function normalizeSearch(value: string): string {
  return value.trim().toLocaleLowerCase();
}

function getColumnType(values: string[]): "number" | "text" | "mixed" {
  const sample = values.filter((value) => value.trim() !== "").slice(0, 100);
  if (sample.length === 0) return "text";

  let numeric = 0;
  for (const value of sample) {
    const normalized = value.trim().replace(/,/g, "");
    if (normalized !== "" && Number.isFinite(Number(normalized))) {
      numeric += 1;
    }
  }

  if (numeric === sample.length) return "number";
  if (numeric >= Math.ceil(sample.length * 0.75)) return "mixed";
  return "text";
}

export default function CsvViewerPage() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const dragDepthRef = useRef(0);
  const toastIdRef = useRef(1);

  const [document, setDocument] = useState<CsvDocument | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isParsing, setIsParsing] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] =
    useState<(typeof PAGE_SIZE_OPTIONS)[number]>(DEFAULT_PAGE_SIZE);
  const [sortColumn, setSortColumn] = useState<number | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [density, setDensity] = useState<Density>("comfortable");
  const [visibleColumns, setVisibleColumns] = useState<boolean[]>([]);
  const [columnMenuOpen, setColumnMenuOpen] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, tone: ToastTone) => {
    const id = toastIdRef.current++;
    setToasts((current) => [...current, { id, tone, message }]);

    window.setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id));
    }, 3600);
  }, []);

  const parseFile = useCallback(
    async (file: File) => {
      if (file.size > MAX_FILE_BYTES) {
        showToast(
          `File is ${formatBytes(file.size)}. The maximum supported size is ${formatBytes(
            MAX_FILE_BYTES,
          )}.`,
          "error",
        );
        return;
      }

      setIsParsing(true);

      try {
        const bytes = new Uint8Array(await file.arrayBuffer());
        const decoded = decodeBytes(bytes);
        const delimiter = detectDelimiter(decoded.text);
        const parsed = parseDelimited(decoded.text, delimiter);

        if (parsed.headers.length === 0) {
          throw new Error("No header row was detected.");
        }

        setDocument({
          ...parsed,
          delimiter,
          encoding: decoded.encoding,
          fileName: file.name,
        });
        setVisibleColumns(parsed.headers.map(() => true));
        setSearch("");
        setPage(1);
        setSortColumn(null);
        setSortDirection("asc");
        setColumnMenuOpen(false);

        const truncated =
          parsed.originalRowCount > parsed.rows.length
            ? ` Showing the first ${parsed.rows.length.toLocaleString()} rows.`
            : "";

        showToast(
          `Loaded ${parsed.rows.length.toLocaleString()} rows and ${
            parsed.headers.length
          } columns.${truncated}`,
          "success",
        );
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "The file could not be parsed safely.";

        showToast(message, "error");
      } finally {
        setIsParsing(false);
      }
    },
    [showToast],
  );

  const handleInput = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        void parseFile(file);
      }

      // Allow selecting the same file again.
      event.target.value = "";
    },
    [parseFile],
  );

  const handleDrop = useCallback(
    (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();

      setIsDragging(false);
      dragDepthRef.current = 0;

      const file = event.dataTransfer.files?.[0];
      if (file) {
        void parseFile(file);
      }
    },
    [parseFile],
  );

  const openFilePicker = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const handleDragEnter = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    dragDepthRef.current += 1;
    setIsDragging(true);
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    dragDepthRef.current -= 1;
    if (dragDepthRef.current <= 0) {
      setIsDragging(false);
      dragDepthRef.current = 0;
    }
  };

  const handleDropzoneKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openFilePicker();
    }
  };

  const filteredRows = useMemo(() => {
    if (!document) return [];

    const normalized = normalizeSearch(search);
    if (!normalized) return document.rows;

    return document.rows.filter((row) =>
      row.some((value) => normalizeSearch(value).includes(normalized)),
    );
  }, [document, search]);

  const sortedRows = useMemo(() => {
    if (!document || sortColumn === null) return filteredRows;

    const output = [...filteredRows];
    const activeColumn = sortColumn;

    output.sort((left, right) => {
      const result = compareValues(left[activeColumn] ?? "", right[activeColumn] ?? "");
      return sortDirection === "asc" ? result : -result;
    });

    return output;
  }, [document, filteredRows, sortColumn, sortDirection]);

  const totalPages = Math.max(1, Math.ceil(sortedRows.length / pageSize));

  useEffect(() => {
    setPage((current) => Math.min(current, totalPages));
  }, [totalPages]);

  useEffect(() => {
    if (document) {
      setVisibleColumns((current) =>
        document.headers.map((_, index) => current[index] ?? true),
      );
    }
  }, [document]);

  const pagedRows = useMemo(() => {
    const start = (page - 1) * pageSize;
    return sortedRows.slice(start, start + pageSize);
  }, [page, pageSize, sortedRows]);

  const shownColumnIndices = useMemo(() => {
    if (!document) return [];
    return document.headers
      .map((_, index) => index)
      .filter((index) => visibleColumns[index] !== false);
  }, [document, visibleColumns]);

  const columnTypes = useMemo(() => {
    if (!document) return [];
    return document.headers.map((_, columnIndex) =>
      getColumnType(document.rows.map((row) => row[columnIndex] ?? "")),
    );
  }, [document]);

  const keywordCount = useMemo(() => {
    if (!document) return 0;
    const keywordIndex = document.headers.findIndex(
      (header) => header.toLocaleLowerCase() === "keyword",
    );
    if (keywordIndex < 0) return document.rows.length;
    return document.rows.filter((row) => row[keywordIndex]?.trim()).length;
  }, [document]);

  const handleSort = (columnIndex: number) => {
    if (sortColumn === columnIndex) {
      setSortDirection((current) => (current === "asc" ? "desc" : "asc"));
    } else {
      setSortColumn(columnIndex);
      setSortDirection("asc");
    }
    setPage(1);
  };

  const toggleColumn = (columnIndex: number) => {
    setVisibleColumns((current) =>
      current.map((visible, index) =>
        index === columnIndex ? !visible : visible,
      ),
    );
  };

  const exportVisibleData = useCallback(() => {
    if (!document) return;

    const header = shownColumnIndices
      .map((index) => safeCsvCell(document.headers[index]))
      .join(",");

    const body = sortedRows
      .map((row) =>
        shownColumnIndices.map((index) => safeCsvCell(row[index] ?? "")).join(","),
      )
      .join("\r\n");

    const baseName = document.fileName.replace(/\.[^/.]+$/, "");
    downloadText(`${header}\r\n${body}`, `${baseName}-view.csv`);
    showToast("Exported the current filtered view safely.", "success");
  }, [document, shownColumnIndices, sortedRows, showToast]);

  const clearDocument = () => {
    setDocument(null);
    setSearch("");
    setPage(1);
    setSortColumn(null);
    setColumnMenuOpen(false);
    setVisibleColumns([]);
  };

  const rangeStart =
    sortedRows.length === 0 ? 0 : Math.min((page - 1) * pageSize + 1, sortedRows.length);
  const rangeEnd =
    sortedRows.length === 0 ? 0 : Math.min(page * pageSize, sortedRows.length);

  const densityClass = density === "compact" ? "densityCompact" : "densityComfortable";

  return (
    <main className="pageShell">
      <style jsx global>{`
        :root {
          color-scheme: light;
        }

        * {
          box-sizing: border-box;
        }

        html,
        body {
          margin: 0;
          padding: 0;
          min-height: 100%;
          background: #f4f7fb;
          color: ${theme.ink};
          font-family:
            Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
            "Segoe UI", sans-serif;
        }

        button,
        input,
        select {
          font: inherit;
        }

        button {
          border: 0;
        }

        .pageShell {
          min-height: 100vh;
          background:
            radial-gradient(circle at top right, rgba(37, 99, 235, 0.08), transparent 28%),
            linear-gradient(180deg, #f8fbff 0%, #f4f7fb 42%, #f2f5f9 100%);
        }

        .appFrame {
          width: min(1540px, calc(100% - 40px));
          margin: 0 auto;
          padding: 30px 0 42px;
        }

        .topBar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
          margin-bottom: 22px;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .brandMark {
          width: 42px;
          height: 42px;
          border-radius: 13px;
          display: grid;
          place-items: center;
          color: #fff;
          background: linear-gradient(135deg, #1d4ed8, #60a5fa);
          box-shadow: 0 11px 24px rgba(37, 99, 235, 0.22);
        }

        .brandTitle {
          margin: 0;
          font-size: 18px;
          font-weight: 800;
          letter-spacing: -0.02em;
        }

        .brandSub {
          margin: 2px 0 0;
          color: ${theme.muted};
          font-size: 12px;
        }

        .pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 10px;
          border: 1px solid ${theme.border};
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.72);
          color: #4c5c70;
          font-size: 12px;
          font-weight: 700;
          backdrop-filter: blur(12px);
        }

        .uploadCard {
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(216, 225, 237, 0.95);
          border-radius: 26px;
          background: rgba(255, 255, 255, 0.82);
          box-shadow:
            0 20px 50px rgba(28, 45, 70, 0.08),
            0 2px 8px rgba(28, 45, 70, 0.04);
          backdrop-filter: blur(20px);
        }

        .uploadCard::after {
          content: "";
          position: absolute;
          width: 220px;
          height: 220px;
          right: -70px;
          top: -90px;
          border-radius: 50%;
          background: rgba(37, 99, 235, 0.06);
          pointer-events: none;
        }

        .heroContent {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 30px;
          padding: 42px;
        }

        .heroCopy {
          position: relative;
          z-index: 1;
          align-self: center;
        }

        .eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 7px 10px;
          border-radius: 999px;
          background: ${theme.accentSoft};
          color: ${theme.accent};
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .heroTitle {
          margin: 16px 0 10px;
          max-width: 650px;
          font-size: clamp(34px, 5vw, 58px);
          line-height: 0.98;
          letter-spacing: -0.05em;
          font-weight: 850;
        }

        .heroDescription {
          max-width: 630px;
          margin: 0;
          color: ${theme.muted};
          font-size: 15px;
          line-height: 1.7;
        }

        .trustRow {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 20px;
        }

        .dropZone {
          min-height: 330px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 28px;
          border: 1.5px dashed #cfd9e7;
          border-radius: 22px;
          background:
            radial-gradient(circle at center, rgba(239, 246, 255, 0.9), rgba(249, 251, 253, 0.96));
          transition:
            transform 160ms ease,
            border-color 160ms ease,
            background 160ms ease,
            box-shadow 160ms ease;
          cursor: pointer;
          outline: none;
        }

        .dropZone:hover,
        .dropZone:focus-visible,
        .dropZone.dragging {
          transform: translateY(-1px);
          border-color: #7ea8f7;
          background: #f3f8ff;
          box-shadow: 0 14px 32px rgba(37, 99, 235, 0.09);
        }

        .dropIcon {
          width: 64px;
          height: 64px;
          display: grid;
          place-items: center;
          border-radius: 18px;
          color: ${theme.accent};
          background: #fff;
          border: 1px solid #dce6f4;
          box-shadow: 0 12px 22px rgba(31, 50, 82, 0.07);
        }

        .dropTitle {
          margin: 18px 0 6px;
          font-size: 18px;
          font-weight: 800;
        }

        .dropDescription {
          max-width: 360px;
          margin: 0;
          color: ${theme.muted};
          font-size: 13px;
          line-height: 1.6;
        }

        .primaryButton,
        .secondaryButton,
        .iconButton {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          border-radius: 11px;
          cursor: pointer;
          transition:
            transform 140ms ease,
            box-shadow 140ms ease,
            background 140ms ease,
            border-color 140ms ease;
        }

        .primaryButton {
          margin-top: 20px;
          min-height: 44px;
          padding: 0 17px;
          color: #fff;
          background: linear-gradient(135deg, #1d4ed8, #2563eb);
          box-shadow: 0 10px 22px rgba(37, 99, 235, 0.22);
          font-size: 13px;
          font-weight: 800;
        }

        .primaryButton:hover {
          transform: translateY(-1px);
          box-shadow: 0 13px 25px rgba(37, 99, 235, 0.28);
        }

        .primaryButton:disabled {
          cursor: default;
          opacity: 0.7;
          transform: none;
        }

        .secondaryButton {
          min-height: 40px;
          padding: 0 13px;
          color: #314155;
          border: 1px solid ${theme.border};
          background: #fff;
          font-size: 12px;
          font-weight: 800;
        }

        .secondaryButton:hover {
          border-color: #c5d0de;
          background: #fbfcfe;
        }

        .iconButton {
          width: 38px;
          height: 38px;
          color: #58697e;
          border: 1px solid ${theme.border};
          background: #fff;
        }

        .iconButton:hover {
          color: ${theme.accent};
          border-color: #b9c9df;
          background: #f8fbff;
        }

        .loadingBar {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 3px;
          overflow: hidden;
          background: #dbeafe;
        }

        .loadingBar span {
          display: block;
          width: 40%;
          height: 100%;
          border-radius: inherit;
          background: #2563eb;
          animation: loading 1s ease-in-out infinite;
        }

        @keyframes loading {
          from {
            transform: translateX(-120%);
          }
          to {
            transform: translateX(280%);
          }
        }

        .viewerCard {
          margin-top: 18px;
          overflow: hidden;
          border: 1px solid rgba(216, 225, 237, 0.95);
          border-radius: 22px;
          background: #fff;
          box-shadow:
            0 16px 40px rgba(28, 45, 70, 0.06),
            0 2px 6px rgba(28, 45, 70, 0.035);
        }

        .viewerTop {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 18px;
          padding: 20px 22px 18px;
          border-bottom: 1px solid ${theme.border};
        }

        .fileIdentity {
          display: flex;
          gap: 12px;
          min-width: 0;
        }

        .fileBadge {
          width: 42px;
          height: 42px;
          flex: 0 0 auto;
          display: grid;
          place-items: center;
          border-radius: 12px;
          color: ${theme.accent};
          background: ${theme.accentSoft};
        }

        .fileName {
          margin: 1px 0 4px;
          font-size: 14px;
          font-weight: 800;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          max-width: min(70vw, 570px);
        }

        .fileMeta {
          color: ${theme.muted};
          font-size: 11px;
        }

        .viewerActions {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: flex-end;
          gap: 8px;
        }

        .toolbar {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 16px;
          border-bottom: 1px solid ${theme.border};
          background: #fbfcfe;
        }

        .searchWrap {
          position: relative;
          flex: 1;
          min-width: 200px;
        }

        .searchWrap svg {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #8a99ab;
          pointer-events: none;
        }

        .searchInput {
          width: 100%;
          min-height: 40px;
          padding: 0 38px;
          border: 1px solid ${theme.border};
          border-radius: 11px;
          color: ${theme.ink};
          outline: none;
          background: #fff;
          font-size: 12px;
          transition:
            border-color 140ms ease,
            box-shadow 140ms ease;
        }

        .searchInput:focus {
          border-color: #a8c0ec;
          box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.08);
        }

        .searchClear {
          position: absolute;
          right: 7px;
          top: 50%;
          transform: translateY(-50%);
          width: 28px;
          height: 28px;
          color: #708198;
          background: transparent;
          cursor: pointer;
          border-radius: 8px;
        }

        .searchClear:hover {
          background: #f1f5f9;
        }

        .densityToggle {
          display: flex;
          align-items: center;
          gap: 3px;
          padding: 3px;
          border: 1px solid ${theme.border};
          border-radius: 11px;
          background: #fff;
        }

        .densityToggle button {
          min-width: 70px;
          min-height: 32px;
          padding: 0 8px;
          border-radius: 8px;
          color: #76859a;
          background: transparent;
          cursor: pointer;
          font-size: 11px;
          font-weight: 800;
        }

        .densityToggle button.active {
          color: #29415f;
          background: #eff4fa;
        }

        .columnMenu {
          position: relative;
        }

        .menuPanel {
          position: absolute;
          z-index: 30;
          right: 0;
          top: calc(100% + 8px);
          width: min(300px, 80vw);
          max-height: 360px;
          overflow: auto;
          padding: 8px;
          border: 1px solid ${theme.border};
          border-radius: 14px;
          background: #fff;
          box-shadow: 0 18px 46px rgba(18, 35, 58, 0.14);
        }

        .menuTitle {
          padding: 7px 8px 9px;
          font-size: 11px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: #7b8aa0;
        }

        .menuItem {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 9px 8px;
          border-radius: 9px;
          background: transparent;
          color: #38495e;
          text-align: left;
          cursor: pointer;
          font-size: 12px;
        }

        .menuItem:hover {
          background: #f6f8fb;
        }

        .menuCheckbox {
          width: 16px;
          height: 16px;
          accent-color: ${theme.accent};
        }

        .tableShell {
          overflow: auto;
          max-height: min(66vh, 820px);
          scrollbar-color: #c7d3e1 transparent;
        }

        table {
          width: max-content;
          min-width: 100%;
          border-collapse: separate;
          border-spacing: 0;
        }

        thead th {
          position: sticky;
          top: 0;
          z-index: 5;
          padding: 0;
          border-bottom: 1px solid ${theme.border};
          background: #f8fafc;
          color: #607087;
          text-align: left;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        thead th:first-child {
          left: 0;
          z-index: 8;
        }

        .headButton {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          min-width: 140px;
          max-width: 360px;
          min-height: 46px;
          padding: 0 14px;
          background: transparent;
          color: inherit;
          cursor: pointer;
          text-align: left;
        }

        .headButton:hover {
          background: #f1f5f9;
        }

        .sortState {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          color: ${theme.accent};
          font-size: 9px;
          white-space: nowrap;
        }

        tbody td {
          max-width: 360px;
          padding: 14px;
          border-bottom: 1px solid #edf1f5;
          color: #2f4055;
          background: #fff;
          vertical-align: top;
          font-size: 12px;
          line-height: 1.45;
        }

        tbody tr:hover td {
          background: #fbfdff;
        }

        tbody td:first-child {
          position: sticky;
          left: 0;
          z-index: 4;
          font-weight: 800;
          color: #17283e;
          background: #fff;
          box-shadow: 8px 0 12px rgba(14, 29, 46, 0.035);
        }

        tbody tr:hover td:first-child {
          background: #fbfdff;
        }

        .densityCompact tbody td {
          padding-top: 9px;
          padding-bottom: 9px;
          font-size: 11px;
        }

        .densityCompact .headButton {
          min-height: 40px;
        }

        .numericCell {
          font-variant-numeric: tabular-nums;
        }

        .emptyState {
          padding: 62px 24px;
          text-align: center;
          color: #7c8b9f;
        }

        .emptyIcon {
          width: 46px;
          height: 46px;
          margin: 0 auto 12px;
          display: grid;
          place-items: center;
          border-radius: 14px;
          background: #f4f7fb;
          color: #8b9ab0;
        }

        .pagination {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 12px 16px;
          border-top: 1px solid ${theme.border};
          background: #fbfcfe;
        }

        .rangeText {
          color: #75849a;
          font-size: 11px;
          font-weight: 700;
        }

        .paginationActions {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .pageButton {
          min-width: 36px;
          height: 36px;
          display: inline-grid;
          place-items: center;
          border: 1px solid ${theme.border};
          border-radius: 10px;
          background: #fff;
          color: #506176;
          cursor: pointer;
        }

        .pageButton:disabled {
          opacity: 0.45;
          cursor: default;
        }

        .pageSelect {
          height: 36px;
          padding: 0 10px;
          border: 1px solid ${theme.border};
          border-radius: 10px;
          background: #fff;
          color: #506176;
          font-size: 11px;
          outline: none;
        }

        .statusStrip {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
          margin-top: 14px;
        }

        .metricCard {
          padding: 15px 16px;
          border: 1px solid rgba(216, 225, 237, 0.92);
          border-radius: 16px;
          background: rgba(255, 255, 255, 0.74);
        }

        .metricLabel {
          color: #77869a;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        .metricValue {
          margin-top: 6px;
          color: #1b2d44;
          font-size: 20px;
          font-weight: 850;
          font-variant-numeric: tabular-nums;
          letter-spacing: -0.02em;
        }

        .toastStack {
          position: fixed;
          right: 20px;
          bottom: 20px;
          z-index: 100;
          display: flex;
          flex-direction: column;
          gap: 9px;
          width: min(380px, calc(100vw - 40px));
        }

        .toast {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          padding: 12px 13px;
          border: 1px solid;
          border-radius: 14px;
          background: rgba(255, 255, 255, 0.96);
          box-shadow: 0 18px 38px rgba(21, 34, 55, 0.13);
          backdrop-filter: blur(12px);
          font-size: 12px;
          line-height: 1.45;
        }

        .toast.info {
          border-color: #cfe0f9;
          color: #2a5a9f;
        }

        .toast.success {
          border-color: #bfe5d5;
          color: ${theme.success};
        }

        .toast.error {
          border-color: #f4c9c6;
          color: ${theme.danger};
        }

        .srOnly {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }

        @media (max-width: 980px) {
          .heroContent {
            grid-template-columns: 1fr;
          }

          .dropZone {
            min-height: 260px;
          }

          .statusStrip {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 720px) {
          .appFrame {
            width: min(100% - 20px, 1540px);
            padding-top: 15px;
          }

          .topBar {
            margin-bottom: 14px;
          }

          .pill {
            display: none;
          }

          .heroContent {
            padding: 24px 20px;
            gap: 18px;
          }

          .heroTitle {
            font-size: 38px;
          }

          .viewerTop {
            align-items: stretch;
            flex-direction: column;
          }

          .viewerActions {
            justify-content: flex-start;
          }

          .toolbar {
            align-items: stretch;
            flex-wrap: wrap;
          }

          .searchWrap {
            min-width: 100%;
          }

          .viewerCard {
            border-radius: 18px;
          }

          .statusStrip {
            grid-template-columns: 1fr 1fr;
          }

          .pagination {
            align-items: flex-start;
            flex-direction: column;
          }
        }

        @media (max-width: 500px) {
          .statusStrip {
            grid-template-columns: 1fr;
          }

          .densityToggle {
            flex: 1;
          }

          .densityToggle button {
            flex: 1;
          }

          .secondaryButton {
            flex: 1;
          }
        }
      `}</style>

      <div className="appFrame">
        <header className="topBar">
          <div className="brand">
            <div className="brandMark" aria-hidden="true">
              <Icon name="sparkles" />
            </div>
            <div>
              <p className="brandTitle">CSV Studio</p>
              <p className="brandSub">Private, browser-only data viewer</p>
            </div>
          </div>

          <div className="pill">
            <Icon name="shield" size={14} />
            No upload required
          </div>
        </header>

        {!document ? (
          <section className="uploadCard" aria-labelledby="hero-title">
            <div className="heroContent">
              <div className="heroCopy">
                <div className="eyebrow">
                  <Icon name="sparkles" size={13} />
                  Enterprise CSV workspace
                </div>
                <h1 id="hero-title" className="heroTitle">
                  Turn raw CSV data into a polished, searchable workspace.
                </h1>
                <p className="heroDescription">
                  Drop a CSV into the browser and get a clean data grid with safe parsing,
                  fast search, sorting, column controls, pagination, and export. Your file
                  stays in this browser tab.
                </p>

                <div className="trustRow">
                  <span className="pill">
                    <Icon name="shield" size={13} />
                    Browser-side processing
                  </span>
                  <span className="pill">
                    <Icon name="rows" size={13} />
                    Up to {MAX_ROWS.toLocaleString()} rows
                  </span>
                  <span className="pill">
                    UTF-8 + UTF-16
                  </span>
                </div>
              </div>

              <div
                className={`dropZone ${isDragging ? "dragging" : ""}`}
                role="button"
                tabIndex={0}
                aria-label="Choose a CSV file"
                onClick={openFilePicker}
                onKeyDown={handleDropzoneKeyDown}
                onDragEnter={handleDragEnter}
                onDragOver={(event) => {
                  event.preventDefault();
                  event.dataTransfer.dropEffect = "copy";
                }}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div className="dropIcon">
                  <Icon name="upload" size={28} />
                </div>
                <div className="dropTitle">
                  {isParsing ? "Parsing your file…" : "Drop your CSV here"}
                </div>
                <p className="dropDescription">
                  Supports standard CSV and tab-separated exports. Files are parsed locally
                  in your browser with no server upload.
                </p>

                <button
                  type="button"
                  className="primaryButton"
                  disabled={isParsing}
                  onClick={(event) => {
                    event.stopPropagation();
                    openFilePicker();
                  }}
                >
                  <Icon name="upload" size={16} />
                  {isParsing ? "Reading file…" : "Choose CSV file"}
                </button>

                <div style={{ marginTop: 12, color: "#8795a7", fontSize: 11 }}>
                  Maximum {formatBytes(MAX_FILE_BYTES)}
                </div>
              </div>
            </div>

            {isParsing && (
              <div className="loadingBar" aria-hidden="true">
                <span />
              </div>
            )}

            <input
              ref={inputRef}
              className="srOnly"
              type="file"
              accept=".csv,.tsv,text/csv,text/tab-separated-values,text/plain"
              onChange={handleInput}
            />
          </section>
        ) : (
          <>
            <section className="viewerCard" aria-label="CSV viewer">
              <div className="viewerTop">
                <div className="fileIdentity">
                  <div className="fileBadge">
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 900,
                        letterSpacing: "0.06em",
                      }}
                    >
                      {initials(document.fileName)}
                    </span>
                  </div>

                  <div style={{ minWidth: 0 }}>
                    <div className="fileName" title={document.fileName}>
                      {document.fileName}
                    </div>
                    <div className="fileMeta">
                      {document.headers.length} columns ·{" "}
                      {document.rows.length.toLocaleString()} rows ·{" "}
                      {humanDelimiter(document.delimiter)} delimiter ·{" "}
                      {document.encoding}
                    </div>
                  </div>
                </div>

                <div className="viewerActions">
                  <button
                    type="button"
                    className="secondaryButton"
                    onClick={() => inputRef.current?.click()}
                  >
                    <Icon name="upload" size={15} />
                    Replace
                  </button>

                  <div className="columnMenu">
                    <button
                      type="button"
                      className="secondaryButton"
                      onClick={() => setColumnMenuOpen((current) => !current)}
                      aria-expanded={columnMenuOpen}
                    >
                      <Icon name="columns" size={15} />
                      Columns
                    </button>

                    {columnMenuOpen && (
                      <div className="menuPanel" role="menu">
                        <div className="menuTitle">
                          Visible columns ({shownColumnIndices.length}/{document.headers.length})
                        </div>
                        {document.headers.map((header, index) => (
                          <label key={`${header}-${index}`} className="menuItem">
                            <input
                              className="menuCheckbox"
                              type="checkbox"
                              checked={visibleColumns[index] ?? true}
                              onChange={() => toggleColumn(index)}
                            />
                            <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
                              {header}
                            </span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>

                  <button
                    type="button"
                    className="primaryButton"
                    style={{ marginTop: 0 }}
                    onClick={exportVisibleData}
                    disabled={shownColumnIndices.length === 0}
                  >
                    <Icon name="download" size={15} />
                    Export view
                  </button>

                  <button
                    type="button"
                    className="iconButton"
                    onClick={clearDocument}
                    aria-label="Close file"
                    title="Close file"
                  >
                    <Icon name="x" size={16} />
                  </button>
                </div>
              </div>

              <div className="toolbar">
                <div className="searchWrap">
                  <Icon name="search" size={16} />
                  <input
                    className="searchInput"
                    type="search"
                    value={search}
                    onChange={(event) => {
                      setSearch(event.target.value);
                      setPage(1);
                    }}
                    placeholder="Search every visible row…"
                    aria-label="Search CSV data"
                  />
                  {search && (
                    <button
                      type="button"
                      className="searchClear"
                      onClick={() => {
                        setSearch("");
                        setPage(1);
                      }}
                      aria-label="Clear search"
                    >
                      <Icon name="x" size={14} />
                    </button>
                  )}
                </div>

                <div className="densityToggle" aria-label="Table density">
                  <button
                    type="button"
                    className={density === "comfortable" ? "active" : ""}
                    onClick={() => setDensity("comfortable")}
                  >
                    Comfortable
                  </button>
                  <button
                    type="button"
                    className={density === "compact" ? "active" : ""}
                    onClick={() => setDensity("compact")}
                  >
                    Compact
                  </button>
                </div>
              </div>

              <div className={`tableShell ${densityClass}`}>
                {sortedRows.length > 0 ? (
                  <table>
                    <thead>
                      <tr>
                        {shownColumnIndices.map((columnIndex) => {
                          const header = document.headers[columnIndex];
                          const active = sortColumn === columnIndex;

                          return (
                            <th key={`${header}-${columnIndex}`}>
                              <button
                                type="button"
                                className="headButton"
                                onClick={() => handleSort(columnIndex)}
                                title={`Sort by ${header}`}
                              >
                                <span
                                  style={{
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                  }}
                                >
                                  {header}
                                </span>

                                <span className="sortState">
                                  {active ? (
                                    sortDirection === "asc" ? (
                                      "ASC"
                                    ) : (
                                      "DESC"
                                    )
                                  ) : (
                                    <Icon name="sort" size={12} />
                                  )}
                                </span>
                              </button>
                            </th>
                          );
                        })}
                      </tr>
                    </thead>

                    <tbody>
                      {pagedRows.map((row, rowIndex) => (
                        <tr key={`${page}-${rowIndex}`}>
                          {shownColumnIndices.map((columnIndex) => {
                            const value = row[columnIndex] ?? "";
                            const type = columnTypes[columnIndex];
                            const numeric =
                              type === "number" ||
                              (type === "mixed" && /^-?[\d,.]+%?$/.test(value.trim()));

                            return (
                              <td
                                key={`${columnIndex}-${rowIndex}`}
                                className={numeric ? "numericCell" : ""}
                                title={value}
                              >
                                {value || (
                                  <span style={{ color: "#a1adba" }}>—</span>
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="emptyState">
                    <div className="emptyIcon">
                      <Icon name="search" size={20} />
                    </div>
                    <div style={{ color: "#394b62", fontWeight: 800 }}>
                      No matching rows
                    </div>
                    <div style={{ marginTop: 5, fontSize: 12 }}>
                      Try a broader search term or clear the filter.
                    </div>
                  </div>
                )}
              </div>

              <div className="pagination">
                <div className="rangeText">
                  {rangeStart.toLocaleString()}–{rangeEnd.toLocaleString()} of{" "}
                  {sortedRows.length.toLocaleString()} matching rows
                  {search ? ` · filtered from ${document.rows.length.toLocaleString()}` : ""}
                </div>

                <div className="paginationActions">
                  <select
                    className="pageSelect"
                    value={pageSize}
                    onChange={(event) => {
                      const nextSize = Number(event.target.value) as (typeof PAGE_SIZE_OPTIONS)[number];
                      setPageSize(nextSize);
                      setPage(1);
                    }}
                    aria-label="Rows per page"
                  >
                    {PAGE_SIZE_OPTIONS.map((size) => (
                      <option key={size} value={size}>
                        {size} / page
                      </option>
                    ))}
                  </select>

                  <button
                    type="button"
                    className="pageButton"
                    onClick={() => setPage((current) => Math.max(1, current - 1))}
                    disabled={page <= 1}
                    aria-label="Previous page"
                  >
                    <Icon name="chevron-left" size={16} />
                  </button>

                  <div className="rangeText" style={{ minWidth: 78, textAlign: "center" }}>
                    Page {page} / {totalPages}
                  </div>

                  <button
                    type="button"
                    className="pageButton"
                    onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
                    disabled={page >= totalPages}
                    aria-label="Next page"
                  >
                    <Icon name="chevron-right" size={16} />
                  </button>
                </div>
              </div>
            </section>

            <section className="statusStrip" aria-label="CSV summary">
              <div className="metricCard">
                <div className="metricLabel">Rows</div>
                <div className="metricValue">{document.rows.length.toLocaleString()}</div>
              </div>
              <div className="metricCard">
                <div className="metricLabel">Columns</div>
                <div className="metricValue">{document.headers.length}</div>
              </div>
              <div className="metricCard">
                <div className="metricLabel">Keywords</div>
                <div className="metricValue">{keywordCount.toLocaleString()}</div>
              </div>
              <div className="metricCard">
                <div className="metricLabel">Visible</div>
                <div className="metricValue">{shownColumnIndices.length}</div>
              </div>
            </section>
          </>
        )}
      </div>

      <input
        ref={inputRef}
        className="srOnly"
        type="file"
        accept=".csv,.tsv,text/csv,text/tab-separated-values,text/plain"
        onChange={handleInput}
        tabIndex={-1}
      />

      <div className="toastStack" aria-live="polite" aria-atomic="true">
        {toasts.map((toast) => (
          <div key={toast.id} className={`toast ${toast.tone}`}>
            <Icon
              name={toast.tone === "success" ? "shield" : toast.tone === "error" ? "x" : "sparkles"}
              size={16}
            />
            <div>{toast.message}</div>
          </div>
        ))}
      </div>
    </main>
  );
}
