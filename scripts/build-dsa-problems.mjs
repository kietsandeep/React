// node scripts/build-dsa-problems.mjs  ->  src/features/workspace/data/dsa/<id>.json
// Add a problem = add an entry to PROBLEMS below (key = question id), then run this script.
// Questions without an entry still open the DSA workspace with a generic starter (no tests yet).
import fs from "node:fs";

const OUT = "src/features/workspace/data/dsa";

const doc = (params, ret) => `/**\n${params.map(([t, n]) => ` * @param {${t}} ${n}`).join("\n")}\n * @return {${ret}}\n */\n`;
const sig = (fn, params) => `function ${fn}(${params.map((p) => p[1]).join(", ")})`;

const PROBLEMS = {
  "dsa-001": {
    fn: "removeDuplicates", params: [["number[]", "arr"]], ret: "number[]",
    statement: "Given a `sorted array` `nums` of size `n`, remove the duplicates in place such that each element appears only once and returns the new array.",
    examples: [
      "const nums = [1, 1, 2];\nconst newArray = removeDuplicates(nums);\nconsole.log(newArray); // [1, 2]",
      "const nums = [0, 0, 2, 2, 3, 3, 4];\nconst newArray = removeDuplicates(nums);\nconsole.log(newArray); // [0, 2, 3, 4]",
    ],
    note: "The array should be `sorted` before calling the function. If it's not sorted, the result may be incorrect.",
    cases: [[[[1, 1, 2]], [1, 2], "Sorted simple"], [[[1, 2, 3]], [1, 2, 3], "No duplicates"], [[[5, 5, 5]], [5], "All the same"], [[[]], [], "Empty array"]],
    body: "  const out = [];\n  for (const x of arr) {\n    if (out[out.length - 1] !== x) out.push(x);\n  }\n  return out;",
  },
  "dsa-002": {
    fn: "isPalindrome", params: [["string", "str"]], ret: "boolean",
    statement: "Given a string `str`, return `true` if it reads the same forward and backward, otherwise `false`. The check is case-sensitive.",
    examples: ['console.log(isPalindrome("madam")); // true', 'console.log(isPalindrome("hello")); // false'],
    cases: [[["madam"], true, "Odd length"], [["abba"], true, "Even length"], [["hello"], false, "Not a palindrome"], [[""], true, "Empty string"], [["a"], true, "Single character"], [["abca"], false, "Almost a palindrome"]],
    body: "  let i = 0, j = str.length - 1;\n  while (i < j) {\n    if (str[i++] !== str[j--]) return false;\n  }\n  return true;",
  },
  "dsa-003": {
    fn: "factorial", params: [["number", "n"]], ret: "number",
    statement: "Given a non-negative integer `n`, return `n!` — the product of all positive integers up to `n`. `0!` is `1`.",
    examples: ["console.log(factorial(5)); // 120", "console.log(factorial(0)); // 1"],
    cases: [[[0], 1, "Zero"], [[1], 1, "One"], [[5], 120, "Small number"], [[10], 3628800, "Larger number"]],
    body: "  let result = 1;\n  for (let i = 2; i <= n; i++) result *= i;\n  return result;",
  },
  "dsa-004": {
    fn: "longestWord", params: [["string", "sentence"]], ret: "string",
    statement: "Given a `sentence`, return the longest word in it. If several words tie, return the first one.",
    examples: ['console.log(longestWord("I love JavaScript")); // "JavaScript"'],
    cases: [[["I love JavaScript"], "JavaScript", "Simple sentence"], [["one two"], "one", "Tie returns first"], [["a bb ccc dd"], "ccc", "Middle word"], [["hello"], "hello", "Single word"]],
    body: '  let best = "";\n  for (const w of sentence.split(" ")) {\n    if (w.length > best.length) best = w;\n  }\n  return best;',
  },
  "dsa-005": {
    fn: "findMax", params: [["number[]", "arr"]], ret: "number",
    statement: "Given a non-empty array of numbers `arr`, return the largest number without using `Math.max`.",
    examples: ["console.log(findMax([3, 9, 2])); // 9"],
    cases: [[[[3, 9, 2]], 9, "Positive numbers"], [[[-5, -1, -9]], -1, "All negative"], [[[7]], 7, "Single element"], [[[1, 1, 1]], 1, "All equal"]],
    body: "  let max = arr[0];\n  for (const x of arr) if (x > max) max = x;\n  return max;",
  },
  "dsa-006": {
    fn: "isPrime", params: [["number", "n"]], ret: "boolean",
    statement: "Given an integer `n`, return `true` if it is a prime number, otherwise `false`. Numbers below `2` are not prime.",
    examples: ["console.log(isPrime(7)); // true", "console.log(isPrime(9)); // false"],
    cases: [[[2], true, "Smallest prime"], [[7], true, "Small prime"], [[9], false, "Odd composite"], [[1], false, "One"], [[0], false, "Zero"], [[97], true, "Larger prime"], [[100], false, "Even composite"]],
    body: "  if (n < 2) return false;\n  for (let i = 2; i * i <= n; i++) {\n    if (n % i === 0) return false;\n  }\n  return true;",
  },
  "dsa-007": {
    fn: "reverseString", params: [["string", "str"]], ret: "string",
    statement: "Given a string `str`, return it reversed. Do not use `reverse()` or `split()` — use a loop.",
    examples: ['console.log(reverseString("hello")); // "olleh"'],
    cases: [[["hello"], "olleh", "Simple word"], [[""], "", "Empty string"], [["a"], "a", "Single character"], [["ab cd"], "dc ba", "With a space"]],
    body: '  let out = "";\n  for (let i = str.length - 1; i >= 0; i--) out += str[i];\n  return out;',
  },
  "dsa-009": {
    fn: "fibonacci", params: [["number", "n"]], ret: "number[]",
    statement: "Given `n`, return an array with the first `n` terms of the Fibonacci sequence, starting `0, 1, 1, 2, ...`. `fibonacci(0)` returns an empty array.",
    examples: ["console.log(fibonacci(6)); // [0, 1, 1, 2, 3, 5]"],
    cases: [[[0], [], "Zero terms"], [[1], [0], "One term"], [[2], [0, 1], "Two terms"], [[6], [0, 1, 1, 2, 3, 5], "Six terms"], [[10], [0, 1, 1, 2, 3, 5, 8, 13, 21, 34], "Ten terms"]],
    body: "  const out = [];\n  for (let i = 0; i < n; i++) {\n    out.push(i < 2 ? i : out[i - 1] + out[i - 2]);\n  }\n  return out;",
  },
  "dsa-014": {
    fn: "charCount", params: [["string", "str"]], ret: "Object<string, number>",
    statement: "Given a string `str`, return an object that maps each character to the number of times it appears.",
    examples: ['console.log(charCount("aab")); // { a: 2, b: 1 }'],
    cases: [[["aab"], { a: 2, b: 1 }, "Two letters"], [[""], {}, "Empty string"], [["hello"], { h: 1, e: 1, l: 2, o: 1 }, "Repeated letter"]],
    body: "  const counts = {};\n  for (const ch of str) counts[ch] = (counts[ch] || 0) + 1;\n  return counts;",
  },
  "dsa-020": {
    fn: "secondLargest", params: [["number[]", "arr"]], ret: "number",
    statement: "Given an array `arr`, return the second-largest `distinct` number. Return `-1` if there is none.",
    examples: ["console.log(secondLargest([100, 20, 112, 22])); // 100", "console.log(secondLargest([5, 5, 5])); // -1"],
    cases: [[[[100, 20, 112, 22]], 100, "Mixed numbers"], [[[5, 5, 5]], -1, "All equal"], [[[1, 2]], 1, "Two elements"], [[[9]], -1, "Single element"], [[[3, 8, 8, 1]], 3, "Duplicate maximum"]],
    body: "  let first = -Infinity, second = -Infinity;\n  for (const x of arr) {\n    if (x > first) { second = first; first = x; }\n    else if (x > second && x < first) second = x;\n  }\n  return second === -Infinity ? -1 : second;",
  },
};

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });
for (const [id, p] of Object.entries(PROBLEMS)) {
  const head = doc(p.params, p.ret) + sig(p.fn, p.params);
  const out = {
    id,
    kind: "function",
    language: "javascript",
    statement: p.statement,
    examples: p.examples,
    ...(p.note && { note: p.note }),
    files: { "solution.js": `${head} {\n  // Write your solution here\n}\n` },
    solution: { "solution.js": `${head} {\n${p.body}\n}\n` },
    tests: p.cases.map(([args, equals, name], i) => ({
      name: name ?? `Case ${i + 1}`,
      steps: [{ expect: "call", fn: p.fn, args, equals }],
    })),
  };
  fs.writeFileSync(`${OUT}/${id}.json`, JSON.stringify(out, null, 2) + "\n");
}
console.log(`wrote ${Object.keys(PROBLEMS).length} DSA problems`);
