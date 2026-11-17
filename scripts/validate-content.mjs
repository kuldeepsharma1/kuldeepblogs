
import path from "node:path";
import process from "node:process";

import {
  discoverContentFiles,
  validateAllFiles,
  summarizeResults,
} from "./lib/content-validator.mjs";

const CONTENT_DIR = path.resolve(process.cwd(), "content");

function parseArguments(args) {
  const options = {
    json: false,
    quiet: false,
    concurrency: 4,
    help: false,
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (arg === "--json") {
      options.json = true;
    } else if (arg === "--quiet") {
      options.quiet = true;
    } else if (arg === "--help" || arg === "-h") {
      options.help = true;
    } else if (arg === "--concurrency") {
      const value = Number(args[++i]);

      if (!Number.isInteger(value) || value < 1 || value > 32) {
        throw new Error(
          "--concurrency must be an integer between 1 and 32",
        );
      }

      options.concurrency = value;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  if (options.json && options.quiet) {
    throw new Error("--json and --quiet cannot be used together.");
  }

  return options;
}

function printHelp() {
  console.log(`
Content Validation CLI

Usage:
  node scripts/validate-content.mjs [options]

Options:
  --json                 Output machine-readable JSON
  --quiet                Show only failures and summary
  --concurrency <number> Number of parallel workers (default: 4)
  --help, -h             Show help

Examples:
  npm run validate:content
  npm run validate:content -- --json
  npm run validate:content -- --quiet
  npm run validate:content -- --concurrency 8
`);
}

function relativeFile(file) {
  return path.relative(process.cwd(), file);
}

function printResult(result, quiet) {
  const filename = relativeFile(result.file);

  if (result.status === "passed") {
    if (!quiet) {
      console.log(`  PASS  ${filename}`);
    }

    return;
  }

  console.log(`  FAIL  ${filename}`);

  for (const error of result.errors) {
    const location = [
      error.line ? `line ${error.line}` : null,
      error.column ? `column ${error.column}` : null,
    ]
      .filter(Boolean)
      .join(", ");

    console.log(`        [${error.type}] ${location}`);
    console.log(`        ${error.message.split("\n")[0]}`);
  }
}

function printSummary(summary) {
  console.log("\n=========================");
  console.log("Validation Summary");
  console.log("=========================");
  console.log(`Total files: ${summary.total}`);
  console.log(`Passed:      ${summary.passed}`);
  console.log(`Failed:      ${summary.failed}`);
  console.log(`Duration:    ${summary.totalDurationMs} ms`);

  console.log(
    summary.failed === 0
      ? "\nSUCCESS: All content files compiled successfully."
      : "\nFAILED: Some content files need attention.",
  );
}

async function main() {
  const options = parseArguments(process.argv.slice(2));

  if (options.help) {
    printHelp();
    return;
  }

  if (!options.json) {
    console.log("\nContent Quality Validation");
    console.log("=========================\n");

    console.log(`Content directory: ${CONTENT_DIR}`);
    console.log(`Concurrency: ${options.concurrency}\n`);
  }

  const files = await discoverContentFiles(CONTENT_DIR);

  if (files.length === 0) {
    const message = "No Markdown or MDX files found.";

    if (options.json) {
      console.log(
        JSON.stringify({
          success: false,
          error: message,
          summary: {
            total: 0,
            passed: 0,
            failed: 0,
            totalDurationMs: 0,
          },
          results: [],
        }, null, 2),
      );
    } else {
      console.error(message);
    }

    process.exitCode = 1;
    return;
  }

  const results = await validateAllFiles(files, {
    concurrency: options.concurrency,
  });

  const summary = summarizeResults(results);

  if (options.json) {
    console.log(
      JSON.stringify(
        {
          success: summary.failed === 0,
          summary,
          results: results.map((result) => ({
            ...result,
            file: relativeFile(result.file),
          })),
        },
        null,
        2,
      ),
    );
  } else {
    console.log("File validation results:\n");

    for (const result of results) {
      printResult(result, options.quiet);
    }

    printSummary(summary);
  }

  if (summary.failed > 0) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error("\nContent validation failed:");
  console.error(error.message);

  process.exitCode = 1;
});
