// One Line, Big Laugh — make.fun entry (u-coral-404-one-line-big-laugh-328fb857)
//
// Writes a single funny line (one joke, no title, no setup, no explanation)
// to /output/entry.txt. The line is 125 characters, under the 200 cap.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const ENTRY =
  "My bank called about suspicious activity \u2014 turns out it was just me buying a $400 sword at 3 a.m. like a responsible adult.";

const OUT = "/output/entry.txt";

// Count characters as code points, the way the gate counts them
// (an em dash is one character, not three bytes).
const charCount = (s: string): number => [...s].length;

function main(): void {
  // Gate: exactly one non-empty line, 1-200 characters.
  const lines = ENTRY.split("\n");
  if (lines.length !== 1) {
    throw new Error(`entry must be a single line, got ${lines.length} lines`);
  }
  if (ENTRY.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (charCount(ENTRY) > 200) {
    throw new Error(
      `entry is ${charCount(ENTRY)} characters, over the 200 cap`,
    );
  }
  mkdirSync(dirname(OUT), { recursive: true });
  writeFileSync(OUT, ENTRY, "utf8");
  // Round-trip check: what landed on disk is exactly the entry.
  const written = readFileSync(OUT, "utf8");
  if (written !== ENTRY) {
    throw new Error("written entry does not match the entry");
  }
  console.log(`Wrote ${charCount(ENTRY)} characters to ${OUT}`);
}

main();
