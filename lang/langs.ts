import type { LangObj } from "./types.ts";

const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

// deno-fmt-ignore
const illions: LangObj["illions"] = {
  zeros: ["", "M", "B", "Tr", "Quadr", "Quint", "Sext", "Sept", "Oct", "Non"],
  units: ["", "un", "duo", "tre", "quattuor", "quin", "se", "septe", "octo", "nove"],
  tens: ["", "deci", "viginti", "triginta", "quadraginta", "quinquaginta", "sexaginta", "septuaginta", "octoginta", "nonaginta"],
  huns: ["", "cent", "ducent", "trecent", "quadringent", "quingent", "sescent", "septingent", "octingent", "nongent"],
}

export const en: LangObj = {
  // deno-fmt-ignore
  ones: [
    "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten",
    "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen",
  ],
  // deno-fmt-ignore
  tens: ["Ten", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"],
  hundred: "Hundred",
  thousand: "Thousand",
  illions,
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

export const fr: LangObj = {
  // deno-fmt-ignore
  ones: [
    "Un", "Deux", "Trois", "Quatre", "Cinq", "Six", "Sept", "Huit", "Neuf", "Dix",
    "Onze", "Douze", "Treize", "Quatorze", "Quinze", "Seize", "Dix-sept", "Dix-huit", "Dix-neuf"
  ],
  // deno-fmt-ignore
  tens: ["Dix", "Vingt", "Trente", "Quarante", "Cinquante", "Soixante", "Soixante-dix", "Quatre-vingts", "Quatre-vingt-dix"],
  hundred: "Cent",
  thousand: "Mille",
  illions,
  tensMod: (u, t) => {
    const modMap: Record<number, string> = {
      3: "__ssss____",
      6: "__ssss__x_",
      7: "_nmnnnnnm_",
      9: "_nmnnnnnm_",
    };

    return modMap[u]?.[t].replace("_", "") || "";
  },
  hunsMod: (u, h) => {
    const modMap: Record<number, string> = {
      3: "___sss____",
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

export const pt: LangObj = {
  // deno-fmt-ignore
  ones: [
    "Um", "Dois", "Três", "Quatro", "Cinco", "Seis", "Sete", "Oito", "Nove", "Dez",
    "Onze", "Doze", "Treze", "Quatorze", "Quinze", "Dezesseis", "Dezessete", "Dezoito", "Dezenove",
  ],
  // deno-fmt-ignore
  tens: ["Dez", "Vinte", "Trinta", "Quarenta", "Cinquenta", "Sessenta", "Setenta", "Oitenta", "Noventa"],
  hundred: "Cem",
  thousand: "Mil",
  // deno-fmt-ignore
  illions,
  tensMod: () => "",
  hunsMod: () => "",
  final: (illion: string) => {
    const base = illion.replace(/[ai]$/, "");
    return capitalize(base === "M" ? "ilhão" : "ilihão"); // br is better
  },
};

export default {
  en,
  fr,
  pt,
};
