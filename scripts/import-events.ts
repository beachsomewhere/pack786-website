/**
 * Import events from a Google Sheets CSV export into the Pack 786 event schema.
 *
 * Usage:
 *   npx tsx scripts/import-events.ts path/to/export.csv
 *
 * This script only PREVIEWS and writes a `data/events.import.json` draft file —
 * it never overwrites data/events.json directly. An admin should review the
 * draft (via /admin/import in production) before merging it in.
 *
 * Expected/likely source columns (adjust HEADER_MAP below to match your sheet):
 *   Day, Date, Time, Event, Location, Activity
 *
 * Any column not present in the sheet is left blank rather than guessed.
 */
import fs from "node:fs";
import path from "node:path";
import type { PackEvent } from "../types";

const HEADER_MAP: Record<string, keyof PackEvent | "dayOfWeek" | "time" | "activity"> = {
  Day: "dayOfWeek",
  Date: "date",
  Time: "time",
  Event: "category",
  Location: "location",
  Activity: "activity",
};

function slugify(name: string, date: string): string {
  const base = `${name}-${date}`.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  return base;
}

function parseCsv(text: string): string[][] {
  return text
    .trim()
    .split("\n")
    .map((line) => line.split(",").map((cell) => cell.trim().replace(/^"|"$/g, "")));
}

function main() {
  const file = process.argv[2];
  if (!file) {
    console.error("Usage: npx tsx scripts/import-events.ts path/to/export.csv");
    process.exit(1);
  }

  const raw = fs.readFileSync(file, "utf-8");
  const rows = parseCsv(raw);
  const [header, ...body] = rows;

  const drafts: (Partial<PackEvent> & { _sourceRow: number })[] = body.map((row, i) => {
    const record: Record<string, string> = {};
    header.forEach((h, idx) => (record[h] = row[idx] ?? ""));

    const name = record["Activity"] || record["Event"] || "Untitled Event";
    const date = record["Date"] || "";

    return {
      _sourceRow: i + 2, // +2 to account for header row + 1-index
      slug: slugify(name, date || `row-${i}`),
      name,
      category: (record["Event"] as PackEvent["category"]) || "Pack Event",
      dateLabel: `${record["Day"] ?? ""} ${date}`.trim(),
      date: date, // left as-is; admin should normalize to ISO before publishing
      startTime: record["Time"]?.split("-")[0]?.trim() || undefined,
      endTime: record["Time"]?.split("-")[1]?.trim() || undefined,
      location: record["Location"] || undefined,
      status: date.includes("TBD") ? "Tentative" : "Draft",
      confirmed: false,
    };
  });

  const outPath = path.join(__dirname, "../data/events.import.json");
  fs.writeFileSync(outPath, JSON.stringify(drafts, null, 2));
  console.log(`Wrote ${drafts.length} draft events to ${outPath}`);
  console.log("Review this file (or use /admin/import) before merging into data/events.json.");
}

main();
