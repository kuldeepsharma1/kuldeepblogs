
import { compile } from "@mdx-js/mdx";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import matter from "gray-matter";

import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { performance } from "node:perf_hooks";

const SUPPORTED_EXTENSIONS = new Set([".md", ".mdx"]);

const MDX_OPTIONS = {
  format: "mdx",
  remarkPlugins: [remarkGfm],
  rehypePlugins: [
    [
      rehypePrettyCode,
      {
        theme: "github-dark",
      },
    ],
  ],
};

function getErrorLocation(error, lineOffset = 0) {
  const position = error?.position?.start;

  const line =
    position?.line ??
    error?.line ??
    error?.loc?.line ??
    null;

  const column =
    position?.column ??
    error?.column ??
    error?.loc?.column ??
    null;

  return {
    line: line ? line + lineOffset : null,
    column,
  };
}

function countFrontmatterLines(raw, parsedContent) {
  if (raw === parsedContent) return 0;

  const index = raw.indexOf(parsedContent);

  if (index < 0) return 0;

  return (raw.slice(0, index).match(/\n/g) ?? []).length;
}

export async function discoverContentFiles(root) {
  const files = [];

  async function walk(directory) {
    const entries = await readdir(directory, {
      withFileTypes: true,
    });

    entries.sort((a, b) => a.name.localeCompare(b.name));

    for (const entry of entries) {
      const fullPath = path.join(directory, entry.name);

      if (entry.isSymbolicLink()) continue;

      if (entry.isDirectory()) {
        await walk(fullPath);
        continue;
      }

      if (!entry.isFile()) continue;

      const extension = path.extname(entry.name).toLowerCase();

      if (SUPPORTED_EXTENSIONS.has(extension)) {
        files.push(fullPath);
      }
    }
  }

  await walk(root);

  return files.sort((a, b) => a.localeCompare(b));
}

export async function validateContentFile(filePath) {
  const startedAt = performance.now();

  const result = {
    file: filePath,
    status: "passed",
    errors: [],
    durationMs: 0,
  };

  let raw;

  try {
    raw = await readFile(filePath, "utf8");
  } catch (error) {
    result.status = "failed";
    result.errors.push({
      type: "FILE_READ_ERROR",
      message: error.message,
      line: null,
      column: null,
    });

    return result;
  }

  let parsed;

  try {
    parsed = matter(raw);
  } catch (error) {
    result.status = "failed";

    result.errors.push({
      type: "FRONTMATTER_ERROR",
      message: error.message,
      line: getErrorLocation(error).line,
      column: getErrorLocation(error).column,
    });

    result.durationMs = Number(
      (performance.now() - startedAt).toFixed(2),
    );

    return result;
  }

  const source = parsed.content;
  const lineOffset = countFrontmatterLines(raw, source);

  try {
    await compile(source, MDX_OPTIONS);
  } catch (error) {
    const location = getErrorLocation(error, lineOffset);

    result.status = "failed";

    result.errors.push({
      type: "MDX_COMPILE_ERROR",
      message: error.message,
      line: location.line,
      column: location.column,
    });
  }

  result.durationMs = Number(
    (performance.now() - startedAt).toFixed(2),
  );

  return result;
}

export async function validateAllFiles(
  files,
  {
    concurrency = 4,
  } = {},
) {
  const results = new Array(files.length);
  let nextIndex = 0;

  async function worker() {
    while (true) {
      const index = nextIndex++;

      if (index >= files.length) return;

      results[index] = await validateContentFile(files[index]);
    }
  }

  const workerCount = Math.min(
    Math.max(1, concurrency),
    files.length,
  );

  await Promise.all(
    Array.from({ length: workerCount }, () => worker()),
  );

  return results;
}

export function summarizeResults(results) {
  const passed = results.filter(
    (result) => result.status === "passed",
  );

  const failed = results.filter(
    (result) => result.status === "failed",
  );

  const totalDurationMs = Number(
    results.reduce(
      (total, result) => total + result.durationMs,
      0,
    ).toFixed(2),
  );

  return {
    total: results.length,
    passed: passed.length,
    failed: failed.length,
    totalDurationMs,
  };
}
