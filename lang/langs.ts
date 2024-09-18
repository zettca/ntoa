import type { LangObj } from "./types.ts";

const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

export const en: LangObj = {
  zero: "Zero",
  // deno-fmt-ignore
  ones: [
    "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten",
    "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen",
  ],
  // deno-fmt-ignore
  tens: ["Ten", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"],
  hundred: "Hundred",
  thousand: "Thousand",
  // deno-fmt-ignore
  illions: {
    zeros: ["", "M", "B", "Tr", "Quadr", "Quint", "Sext", "Sept", "Oct", "Non"],
    units: ["", "un", "duo", "tre", "quattuor", "quin", "se", "septe", "octo", "nove"],
    tens: ["", "deci", "viginti", "triginta", "quadraginta", "quinquaginta", "sexaginta", "septuaginta", "octoginta", "nonaginta"],
    huns: ["", "cent", "ducent", "trecent", "quadringent", "quingent", "sescent", "septingent", "octingent", "nongent"],
  },
  tensMod: (u, t) => {
    const modMap: Record<number, string> = {
      3: "__ssss__x_",
      6: "_xssss__x_",
      7: "_nmnnnnnm_",
      9: "_nmnnnnnm_",
    };

    return modMap[u]?.[t].replace("_", "") || "";
  },
  hunsMod: (u, h) => {
    const modMap: Record<number, string> = {
      3: "_x_sss__x_",
      6: "_x_sss__x_",
      7: "_nnnnnnnm_",
      9: "_nnnnnnnm_",
    };

    return modMap[u]?.[h].replace("_", "") || "";
  },
  final: (illion: string) => {
    return capitalize(illion.replace(/[ai]$/, "") + "illion");
  },
};

export default {
  en,
};
