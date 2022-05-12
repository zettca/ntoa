import { splitN, illions } from "./utils";
import type { Lang } from "./types";
import defaultLang from "./lang/en";

export type Scale = number | "long" | "short" | "knuth";
export type Options = { scale?: Scale; lang?: Lang };

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

const printPart = (lang: Lang) => (str: string, idx: number) => {
  if (!str || !Number(str)) return "";
  return `${str} ${illions(idx, lang)}`.trim();
};

const ntoa = (input: string | number, options?: Options) => {
  const { scale = "short", lang = defaultLang } = options || {};
  const inputParts = splitN(input, scaleToNum(scale));

  return inputParts.map(printPart(lang)).filter(Boolean).reverse();
};

export default ntoa;
