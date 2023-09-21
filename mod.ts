import { illions, Lang } from "./lang/mod.ts";
import { split } from "./split.ts";

/** The number scale to use. https://en.wikipedia.org/wiki/Long_and_short_scales */
type Scale = number | "long" | "short" | "knuth";

type Options = {
  scale?: Scale;
  lang?: Lang;
};

const scaleToNum = (scale: Scale) => {
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

const printPart = (lang: Lang) => (val: string, idx: number) => {
  return (!val || !Number(val)) ? "" : `${val} ${illions(idx, lang)}`.trim();
};

/**
 * Transforms a number/string to its name.
 * @example ntoa(123456) // => 123 thousand 456"
 */
export default function ntoa(input: string | number, options: Options = {}) {
  const { scale = "short", lang = "en" } = options;

  return split(input, scaleToNum(scale))
    .map(printPart(lang))
    .filter(Boolean)
    .reverse()
    .join(" ");
}
