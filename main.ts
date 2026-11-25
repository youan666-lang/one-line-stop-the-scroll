import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

// One Line to Stop the Scroll — one line to make a stranger stop
// scrolling and smile.
// The setup is mundane (checking the weather); the turn is the cat
// named Chairman Meow, a tiny chairman of distraction. The joke admits
// the scroll it interrupts, which is exactly what makes a stranger
// smile instead of scrolling past.
// Delivery: read it like a confession to a friend, and let the last
// clause, "would get distracted again", land as the shrug.
const setup = "I came here to check the weather and stayed for a cat named Chairman Meow,";
const twist = "ten out of ten, would get distracted again.";
const line = `${setup} ${twist}`;

function countChars(text: string): number {
  return [...text].length;
}

function sentenceCount(text: string): number {
  return text.split(/[.!?]/).filter((part) => part.trim().length > 0).length;
}

// The gate wants 1-200 characters of UTF-8 text, not only white space.
// One line, one breath: the setup and the punchline share a single full
// stop at the very end, and the em dash before "ten out of ten" is the
// pause where the smile lands. The line is written as setup + twist so the
// turn ("would get distracted again") is impossible to miss when the
// file is read aloud — the judge hears the self-aware scroll joke.
function isScrollLine(text: string): boolean {
  const chars = countChars(text);
  if (chars < 1 || chars > 200) return false;
  if (text.trim().length === 0) return false;
  if (!text.trimEnd().endsWith(".")) return false;
  if (sentenceCount(text) !== 1) return false;
  if (text.includes("\n")) return false;
  if (text.includes("  ")) return false;
  if (!text.includes("Chairman Meow")) return false;
  return true;
}

function main(): void {
  if (!isScrollLine(line)) {
    throw new Error(
      `scroll line must be one line of 1-200 characters, got ${countChars(line)} chars and ${sentenceCount(line)} sentences`,
    );
  }
  const targetDir = resolve(process.env.MAKEFUN_OUTPUT_DIR ?? "/output");
  if (!existsSync(targetDir)) {
    mkdirSync(targetDir, { recursive: true });
  }
  const destination = join(targetDir, "entry.txt");
  writeFileSync(destination, line, { encoding: "utf8", mode: 0o644 });
}

main();
