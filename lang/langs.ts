export interface LangObj {
  ones: string[];
  tens: string[];
  hundred: string;
  thousand: string;
  illions: typeof illions;
  tensMod: (u: number, t: number) => string;
  hunsMod: (u: number, h: number) => string;
  final: (illion: string, number: number) => string;
}

const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

// deno-fmt-ignore
const illions = {
  zeros: ["", "m", "b", "tr", "quadr", "quint", "sext", "sept", "oct", "non"],
  units: ["", "un", "duo", "tre", "quattuor", "quin", "se", "septe", "octo", "nove"],
  tens: ["", "deci", "viginti", "triginta", "quadraginta", "quinquaginta", "sexaginta", "septuaginta", "octoginta", "nonaginta"],
  huns: ["", "cent", "ducent", "trecent", "quadringent", "quingent", "sescent", "septingent", "octingent", "nongent"],
}

export const en: LangObj = {
  // deno-fmt-ignore
  ones: [
    "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten",
    "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen",
  ],
  // deno-fmt-ignore
  tens: ["ten", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"],
  hundred: "hundred",
  thousand: "thousand",
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
  final: (illion) => {
    return capitalize(illion.replace(/[ai]$/, "") + "illion");
  },
};

export const fr: LangObj = {
  // deno-fmt-ignore
  ones: [
    "un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf", "dix",
    "onze", "douze", "treize", "quatorze", "quinze", "seize", "dix-sept", "dix-huit", "dix-neuf",
  ],
  // deno-fmt-ignore
  tens: ["dix", "vingt", "trente", "quarante", "cinquante", "soixante", "soixante-dix", "quatre-vingts", "quatre-vingt-dix"],
  hundred: "cent",
  thousand: "mille",
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
  final: (illion) => {
    return capitalize(illion.replace(/[ai]$/, "") + "illion");
  },
};

export const pt: LangObj = {
  // deno-fmt-ignore
  ones: [
    "um", "dois", "três", "quatro", "cinco", "seis", "sete", "oito", "nove", "dez",
    "onze", "doze", "treze", "quatorze", "quinze", "dezasseis", "dezassete", "dezoito", "dezanove",
  ],
  // deno-fmt-ignore
  tens: ["dez", "vinte", "trinta", "quarenta", "cinquenta", "sessenta", "setenta", "oitenta", "noventa"],
  hundred: "cento",
  thousand: "mil",
  // deno-fmt-ignore
  illions,
  tensMod: () => "",
  hunsMod: () => "",
  final: (illion, number) => {
    const base = illion.replace(/[ai]$/, "");
    const name = base === "M" ? "ilh" : "ili"; // 🇧🇷 is better 😞
    const suffix = number === 1 ? "ão" : "ões"; // handle plurals
    return capitalize(`${base}${name}${suffix}`);
  },
};

export default {
  en,
  fr,
  pt,
};
