import { illions, splitN } from "./utils.ts";
import type { Lang } from "./types.d.ts";
import defaultLang from "./lang/en.ts";

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

const printPart = (lang: Lang) =>
  (str: string, idx: number) => {
    if (!str || !Number(str)) return "";
    return `${str} ${illions(idx, lang)}`.trim();
  };

export default function ntoa(
  input: string | number,
  options?: { scale?: Scale; lang?: Lang },
) {
  const { scale = "short", lang = defaultLang } = options || {};
  const inputParts = splitN(input, scaleToNum(scale));

  return inputParts.map(printPart(lang)).filter(Boolean).reverse();
}
