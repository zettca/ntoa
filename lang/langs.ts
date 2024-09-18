import type { LangObj } from "./types.ts";

// deno-fmt-ignore
export const en: LangObj = {
  zero: "Zero",
  ones: [
    "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten",
    "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen",
  ],
  tens: ["Ten", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"],
  hundred: "Hundred",
  thousand: "Thousand",
  illions: {
    suffix: "illion",
    zeros: ["", "M", "B", "Tr", "Quadr", "Quint", "Sext", "Sept", "Oct", "Non"],
    units: ["", "un", "duo", "tre", "quattuor", "quin", "sex", "septen", "octo", "novem"], // TODO: fix edge cases? (3,6,7,9)
    tens: ["", "dec", "vigint", "triginta", "quadraginta", "quinquaginta", "sexaginta", "septuaginta", "octoginta", "nonaginta"],
    huns: ["", "cent", "ducent", "trecent", "quadringent", "quingent", "sescent", "septingent", "octingent", "nongent"],
  },
};

export default {
  en,
};
