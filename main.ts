import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The funniest voicemail greeting a cat could record (115 characters).
const ENTRY =
  "You've reached Miso. I knocked your phone off the counter, so leave a message after the beep. Tuna bribes accepted.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");

// Gate self-check: UTF-8 text, 1 to 120 characters, not only whitespace, one line.
if (ENTRY.length < 1 || ENTRY.length > 120) {
  throw new Error(`entry is ${ENTRY.length} characters, must be 1-120`);
}
if (!ENTRY.trim()) {
  throw new Error("entry must not be only whitespace");
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error("entry must be a single line");
}

writeFileSync(outPath, ENTRY, "utf8");

// Read back and verify byte-for-byte.
const back = readFileSync(outPath, "utf8");
if (back !== ENTRY) {
  throw new Error("read-back mismatch: entry.txt does not match the entry");
}
console.log(`Wrote ${outPath} (${ENTRY.length} characters)`);
