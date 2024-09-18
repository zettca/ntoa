import langs, { en } from "./langs.ts";
import type { LangObj } from "./types.ts";

export type Lang = keyof typeof langs;

const splitDigits = (digits: number, pad = 3) =>
  [...String(digits).padStart(pad, "0")].map(Number);

const illionsPrefix = (index: number, lang: LangObj) => {
  const { zeros, units, tens, huns } = lang.illions;
  const { tensMod, hunsMod } = lang;

  if (index > 999) throw Error("💥 Number is too large");

  const [h, t, u] = splitDigits(index);

  if (h) return units[u] + hunsMod(u, h) + tens[t] + huns[h]; // centillion+
  if (t) return units[u] + tensMod(u, t) + tens[t]; // decillion+
  if (u) return zeros[index];

  throw Error("how did we get here? 🤔");
};

/**
 * Translates a number group index into the string
 * @example
 * illions(2) // million
 * illions(4) // trillion
 */
export const illions = (index: number, langString: Lang = "en") => {
  const lang = langs[langString!] || en;

  if (index === 0) return "";
  if (index === 1) return lang.thousand;

  return lang.final(illionsPrefix(index - 1, lang));
};
