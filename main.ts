// One Line to Stop the Scroll.
//
// One line that makes a stranger stop scrolling and smile. The trick
// is confessing the scroll itself: I arrived to check the weather and
// stayed for a cat called Chairman Meow. A stranger recognises the
// exact detour, smiles at the chairman, and the rating at the end
// ("ten out of ten, would get distracted again") is the shrug that
// sells it. Read it like telling a friend why you are late.
import fs from "node:fs";
import path from "node:path";

const LINE =
  "I came here to check the weather and stayed for a cat named Chairman Meow, ten out of ten, would get distracted again.";

function problems(text: string): string[] {
  const found: string[] = [];
  const chars = [...text].length;
  if (chars < 1 || chars > 200) found.push(`length ${chars} is outside 1-200`);
  if (text.trim().length === 0) found.push("line is only white space");
  if (text.includes("\n")) found.push("line spans more than one line");
  if (text.includes("  ")) found.push("line has a double space");
  if (!text.trimEnd().endsWith(".")) found.push("line does not end on a full stop");
  // One sentence, one breath: the weather, the cat and the rating
  // belong to a single thought, so a second full stop would break it.
  const sentences = text.split(/[.!?]/).filter((part) => part.trim().length > 0).length;
  if (sentences !== 1) found.push(`line has ${sentences} sentences, want 1`);
  if (!text.includes("Chairman Meow")) found.push("the cat is missing");
  return found;
}

function main(): void {
  const bad = problems(LINE);
  if (bad.length > 0) {
    throw new Error(`scroll line is not valid: ${bad.join("; ")}`);
  }
  const outDir = path.resolve(process.env.MAKEFUN_OUTPUT_DIR ?? "/output");
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, "entry.txt"), LINE, { encoding: "utf8", mode: 0o644 });
}

main();
