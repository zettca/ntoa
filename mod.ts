import { illions, type Lang } from "./lang/mod.ts";
import { split } from "./split.ts";

interface Options {
  /** The number scale to use. https://en.wikipedia.org/wiki/Long_and_short_scales */
  scale?: number | "long" | "short" | "knuth";
  lang?: Lang;
}

const scaleToNum = (scale: Options["scale"]) => {
  if (typeof scale === "number") return scale;
  switch (scale) {
    case "long":
      return 6;
    case "knuth":
      return 4;
    case "short":
    default:
      return 3;
  }
};

const splitParts = (input = "", scale: Options["scale"]) => {
  if (scale === "long") {
    if (input.length <= 9) return split(input, 3);
    return [
      ...split(input.slice(0, -6), 6),
      ...split(input.slice(-6), 3),
    ];
  }

  return split(input, scaleToNum(scale));
};

const printPart = (lang: Lang) => (val: number, idx: number) => {
  return (!val) ? "" : `${val} ${illions(idx, lang)}`.trim();
};

/**
 * Transforms a number/string to its name.
 * @example ntoa(123456) // => 123 thousand 456"
 */
export function ntoa(
  input: string,
  options: Options = {},
): string {
  const { scale = "short", lang = "en" } = options;

  return splitParts(input, scale)
    .toReversed()
    .map(printPart(lang))
    .filter(Boolean)
    .toReversed()
    .join(" ");
}

// running as CLI
if (import.meta.main) {
  const numbers = Deno.args;

  if (numbers?.length < 1) throw new Error("Pass numbers as arguments");

  numbers.forEach((num) => {
    if (/^\d+$/.test(num)) {
      console.log(ntoa(num));
    } else {
      console.error(`"${num}" is not a valid integer`);
    }
  });
}

export default ntoa;
