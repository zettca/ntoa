import { illions, splitN } from "./utils.ts";
import type { Lang, Scale } from "./types.d.ts";
import defaultLang from "./lang/en.ts";

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
  (val: string | number, idx: number) =>
    (!val || !Number(val)) ? "" : `${val} ${illions(idx, lang)}`.trim();

export default function ntoa(
  input: string | number,
  options?: { scale?: Scale; lang?: Lang },
) {
  const { scale = "short", lang = defaultLang } = options || {};

  return splitN(input, scaleToNum(scale))
    .map(printPart(lang))
    .filter(Boolean)
    .reverse()
    .join(" ");
}
