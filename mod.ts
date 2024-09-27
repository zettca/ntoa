import langs from "./lang/langs.ts";
import { split } from "./split.ts";

export type Lang = keyof typeof langs;

export interface Options {
  /** The number scale to use. https://en.wikipedia.org/wiki/Long_and_short_scales */
  scale?: number | "long" | "short" | "knuth";
  lang?: Lang;
  verbose?: boolean;
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

/**
 * Transforms a number/string to its name.
 * @example ntoa(123456) // => 123 thousand 456"
 */
export function ntoa(
  input: string,
  options: Options = {},
): string {
  const { scale = "short", lang: langString = "en", verbose = false } = options;
  const lang = langs[langString] || langs.en;

  const printPart = (val: number, i: number, arr: number[]) => {
    if (!val) return "";

    const idx = arr.length - i - 2;

    const p1 = verbose ? lang.nillions(val) : val;
    const p2 = lang.millions(idx, val);
    return `${p1} ${p2}`.trim();
  };

  return splitParts(input, scale)
    .map(printPart)
    .filter(Boolean)
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
