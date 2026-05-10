const CODE_PATTERN = /\b(?:\d\s+\d{3}\s+\d{3}\s+\d{3}|[A-Z]{1,4}\d{3,}[A-Z0-9]*|\d{3,4}[A-Z]\d{3,}[A-Z0-9]*)\b/g;
const NON_CODES = new Set(["NOT_APPLICABLE", "TO_VERIFY", "UNIVERSAL"]);

export function splitPartNumberField(value: string | null | undefined): string[] {
  if (!value) return [];
  return extractPartCodes(value);
}

export function extractPartCodes(value: string): string[] {
  const matches = value.match(CODE_PATTERN) ?? [];
  return Array.from(new Set(matches.map((match) => match.trim()).filter((match) => !NON_CODES.has(match.toUpperCase()))));
}

export function stripPartCodes(value: string, codes: string[]): string {
  let text = value;
  for (const code of codes) {
    text = text.replace(code, "");
  }

  return text
    .replace(/\s+\/\s+/g, " ")
    .replace(/\s*,\s*/g, " ")
    .replace(/\s{2,}/g, " ")
    .replace(/\s+([,.;:])/g, "$1")
    .trim();
}
