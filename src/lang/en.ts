import type { Lang } from "../types";

const lang: Lang = {
  separator: " ",
  none: "",
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
    units: ["", "un", "duo", "tre", "quattuor", "quinqua", "sex", "septen", "octo", "novem"], // TODO: fix edge cases? (3,6,7,9)
    tens: ["", "dec", "viginti", "triginta", "quadraginta", "quinquaginta", "sexaginta", "septuaginta", "octoginta", "nonaginta"],
    huns: ["", "centi", "ducenti", "trecenti", "quadringenti", "quingenti", "sescenti", "septingenti", "octingenti", "nongenti"],
  },
};

export default lang;
