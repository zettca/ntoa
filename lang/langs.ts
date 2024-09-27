export interface LangObj {
  ones: string[];
  tens: string[];
  hundreds: string[];
  thousand: string;
  illions: typeof illions;
  illion: string;
  /** Print the small part (eg. ten, hundreds, etc) */
  nillions: (val: number) => string;
  /** Print the illions part (eg. trillion, centillion, etc) */
  millions: (index: number, num: number) => string;
  millionsModifier: (illion: string, number: number) => string;
  /** illions modifier connector thing */
  mod: (h: number, t: number, u: number) => string;
}

function splitDigits(digits: number, pad = 3) {
  return [...String(digits).padStart(pad, "0")].map(Number);
}

// deno-fmt-ignore
const illions = {
  zeros: ["", "m", "b", "tr", "quadr", "quint", "sext", "sept", "oct", "non"],
  units: ["", "un", "duo", "tre", "quattuor", "quin", "se", "septe", "octo", "nove"],
  tens: ["", "deci", "viginti", "triginta", "quadraginta", "quinquaginta", "sexaginta", "septuaginta", "octoginta", "nonaginta"],
  huns: ["", "cent", "ducent", "trecent", "quadringent", "quingent", "sescent", "septingent", "octingent", "nongent"],
}

const baseLang = {
  ones: [],
  tens: [],
  hundreds: [],
  thousand: "",
  illion: "illion",
  illions,
  mod: () => "",
  nillions(val: number) {
    return `${val}`;
  },
  millions(index: number, num: number) {
    const { zeros, units, tens, huns } = this.illions;
    if (index < 0) return "";
    if (index === 0) return this.thousand;
    if (index < 10) return this.millionsModifier(zeros[index], num);
    if (index > 999) throw Error("💥 Number is too large");

    const [h, t, u] = splitDigits(index);

    const value = [units[u], this.mod(h, t, u), tens[t], huns[h]]
      .filter(Boolean)
      .join("");

    return this.millionsModifier(value, num);
  },
  millionsModifier(illion: string) {
    if (!illion) return "";
    return illion.replace(/[ai]$/, "") + this.illion;
  },
} satisfies LangObj;

export const en: LangObj = {
  ...baseLang,
  // deno-fmt-ignore
  ones: [
    "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten",
    "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen",
  ],
  // deno-fmt-ignore
  tens: ["ten", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"],
  get hundreds() {
    return this.ones.slice(0, 9).map((n) => `${n} hundred`);
  },
  thousand: "thousand",
  illions,
  nillions(num: number) {
    const [h, t, u] = splitDigits(num).map((n) => n - 1);

    switch (true) {
      case num < 20:
        return this.ones[num - 1];
      case num < 100:
        return [this.tens[t], this.ones[u]].join("-");
      case num < 1000:
        return `${this.hundreds[h]} ${this.nillions(num % 100)}`;
      default:
        return [
          this.nillions(Math.floor(num / 1000)),
          this.thousand,
          this.nillions(num % 1000),
        ].join(" ");
    }
  },
  mod: (h, t, u) => {
    const tensModMad: Record<number, string> = {
      3: "__ssss__x_",
      6: "_xssss__x_",
      7: "_nmnnnnnm_",
      9: "_nmnnnnnm_",
    };
    const hunsModMap: Record<number, string> = {
      3: "_x_sss__x_",
      6: "_x_sss__x_",
      7: "_nnnnnnnm_",
      9: "_nnnnnnnm_",
    };

    const modMap = (h && !t) ? hunsModMap[u]?.[h] : tensModMad[u]?.[t];
    return modMap?.replace("_", "") || "";
  },
};

export const fr: LangObj = {
  ...baseLang,
  // deno-fmt-ignore
  ones: [
    "un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf", "dix",
    "onze", "douze", "treize", "quatorze", "quinze", "seize", "dix-sept", "dix-huit", "dix-neuf",
  ],
  // deno-fmt-ignore
  tens: ["dix", "vingt", "trente", "quarante", "cinquante", "soixante", "soixante-dix", "quatre-vingt", "quatre-vingt-dix"],
  get hundreds() {
    return ["cent", ...this.ones.slice(1, 9).map((n) => `${n} cent`)];
  },
  thousand: "mille",
  nillions(num: number) {
    const [h, t, u] = splitDigits(num).map((n) => n - 1);

    switch (true) {
      case num < 20:
        return this.ones[num - 1];
      case num < 100:
        return [this.tens[t], this.ones[u]].join("-");
      case num < 1000:
        return `${this.hundreds[h]} ${this.nillions(num % 100)}`;
      default:
        return [
          this.nillions(Math.floor(num / 1000)),
          this.thousand,
          this.nillions(num % 1000),
        ].join(" ");
    }
  },
  millionsModifier(illion, number) {
    if (!illion) return "";
    const base = illion.replace(/[ai]$/, "");
    const suffix = number === 1 ? "" : "s";
    return base + this.illion + suffix;
  },
  mod: (h, t, u) => {
    const tensModMad: Record<number, string> = {
      3: "__ssss____",
      6: "__ssss__x_",
      7: "_nmnnnnnm_",
      9: "_nmnnnnnm_",
    };
    const hunsModMap: Record<number, string> = {
      3: "___sss____",
      6: "_x_sss__x_",
      7: "_nnnnnnnm_",
      9: "_nnnnnnnm_",
    };

    const modMap = (h && !t) ? hunsModMap[u]?.[h] : tensModMad[u]?.[t];
    return modMap?.replace("_", "") || "";
  },
};

export const pt: LangObj = {
  ...baseLang,
  // deno-fmt-ignore
  ones: [
    "um", "dois", "três", "quatro", "cinco", "seis", "sete", "oito", "nove", "dez",
    "onze", "doze", "treze", "quatorze", "quinze", "dezasseis", "dezassete", "dezoito", "dezanove",
  ],
  // deno-fmt-ignore
  tens: ["dez", "vinte", "trinta", "quarenta", "cinquenta", "sessenta", "setenta", "oitenta", "noventa"],
  hundreds: [
    "cento",
    "duzentos",
    "trezentos",
    "quatrocentos",
    "quinhentos",
    "seiscentos",
    "setecentos",
    "oitocentos",
    "novecentos",
  ],
  thousand: "mil",
  nillions(num: number) {
    const [h, t, u] = splitDigits(num).map((n) => n - 1);

    switch (true) {
      case num < 20:
        return this.ones[num - 1];
      case num < 100:
        return [this.tens[t], this.ones[u]].join(" e ");
      case num < 1000:
        return [this.hundreds[h], this.nillions(num % 100)].join(" e ");
      default:
        return [
          this.nillions(Math.floor(num / 1000)),
          this.thousand,
          this.nillions(num % 1000),
        ].join(" ");
    }
  },
  millionsModifier(illion, number) {
    const base = illion.replace(/[ai]$/, "");
    const name = base === "m" ? "ilh" : "ili"; // 🇧🇷 is better 😞
    const suffix = number === 1 ? "ão" : "ões"; // handle plurals
    return `${base}${name}${suffix}`;
  },
};

export default {
  en,
  fr,
  pt,
};
