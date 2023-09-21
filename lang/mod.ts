import { en } from "./langs.ts";

type LangObj = typeof en;

const langs = {
  en,
} satisfies Record<string, LangObj>;

export type Lang = keyof typeof langs;

export function getLang(lang?: Lang) {
  return (lang && langs[lang]) || en;
}

export const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

export const splitDigits = (digits: number, pad = 3) =>
  [...String(digits).padStart(pad, "0")].map(Number);

const illionsPrefix = (index: number, lang: LangObj) => {
  const { zeros, units, tens, huns } = lang.illions;

  if (index > 999) throw Error("Number too large - names don't exist 😢");

  const [h, t, u] = splitDigits(index);

  if (h) return units[u] + tens[t] + huns[h].slice(0, -1); // centillion+
  if (t) return units[u] + tens[t].slice(0, -1); // decillion+
  if (u) return zeros[index];

  throw Error("how did we get here? 🤔");
};

/**
 * Translates a number group index into the string
 * @example illions(3) // billion
 */
export const illions = (index: number, langString: Lang = "en") => {
  const lang = getLang(langString);

  if (index === 0) return lang.none;
  if (index === 1) return lang.thousand;

  const prefix = illionsPrefix(index - 1, lang);

  return capitalize(prefix + lang.illions.suffix);
};
