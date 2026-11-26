import { mkdirSync, writeFileSync } from "node:fs";

const LINE =
  "You made xX_SwampLord_Xx at 13 as a joke. It's on my Nobel certificate, my mortgage, and the hospital wing. The dean still pronounces the X's.";

// The gate requires UTF-8 text of 1 to 200 characters, not only whitespace.
// Fail fast here so a bad line never ships as a silent invalid entry.
if (LINE.length < 1 || LINE.length > 200 || LINE.trim().length === 0) {
  throw new Error(`entry line must be 1-200 characters, got ${LINE.length}`);
}

try {
  mkdirSync("/output", { recursive: true });
} catch {
  // /output already exists or cannot be created; the write below will say so.
}

writeFileSync("/output/entry.txt", LINE, "utf8");

// Best-effort local copy next to the program. A read-only working
// directory must never fail the run, so this stays inside try/catch.
try {
  writeFileSync("entry.txt", LINE, "utf8");
} catch {
  // Ignore: the graded artifact is /output/entry.txt.
}
