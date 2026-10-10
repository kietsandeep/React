// Turns an old plain-string answer into content blocks.
//  "1. a 2. b 3. c"            -> ordered list
//  "Intro text: 1. a 2. b"     -> text + ordered list
//  anything else               -> single text block
export function toBlocks(answer) {
  if (Array.isArray(answer)) return answer;
  const text = String(answer).trim();
  const m = text.match(/^(.*?)\s*(?:^|\s)1\.\s(.*\s2\.\s.*)$/s);
  if (!m) return [{ type: "text", value: text }];
  const intro = m[1].trim();
  const items = ("1. " + m[2])
    .split(/\s+(?=\d+\.\s)/)
    .map((s) => s.replace(/^\d+\.\s*/, "").replace(/,?\s+and$/, "").replace(/,$/, "").trim())
    .filter(Boolean);
  const blocks = [];
  if (intro) blocks.push({ type: "text", value: intro });
  blocks.push({ type: "list", ordered: true, items });
  return blocks;
}
