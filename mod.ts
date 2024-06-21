import { illions, type Lang } from "./lang/mod.ts";
import { split } from "./split.ts";

type Options = {
  /** The number scale to use. https://en.wikipedia.org/wiki/Long_and_short_scales */
  scale?: number | "long" | "short" | "knuth";
  lang?: Lang;
};

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

const printPart = (lang: Lang) => (val: number, idx: number) => {
  return (!val) ? "" : `${val} ${illions(idx, lang)}`.trim();
};

/**
 * Transforms a number/string to its name.
 * @example ntoa(123456) // => 123 thousand 456"
 */
export default function ntoa(
  input: string | number,
  options: Options = {},
): string {
  const { scale = "short", lang = "en" } = options;

  return split(input, scaleToNum(scale))
    .toReversed()
    .map(printPart(lang))
    .filter(Boolean)
    .toReversed()
    .join(" ");
}
