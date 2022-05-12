import type { Lang } from "./types";

export const range = (num = 10, fn = (v, i) => i) => Array.from(Array(num), fn);

export const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

export const splitDigits = (digits: number, pad = 3) =>
  [...String(digits).padStart(pad, "0")].map(Number);

export const splitAt = (str: string, index = 0) => {
  const safeIndex = index > 0 ? index : 0;
  return [str.slice(0, safeIndex), str.slice(safeIndex)];
};

/**
 * Splits `input` in parts of length `partSize`
 * @param input input value
 * @param partSize length of each part
 * @returns array of the parts, reversed
 */
export const splitString = (input: string, partSize = 3): string[] => {
  const result = [];

  while (input.length > 0) {
    const [str, part] = splitAt(input, input.length - partSize);
    result.push(part);
    input = str;
  }

  return result;
};

/**
 * Splits `input` in parts of 3, up to length of 308 chars
 * @param input
 * @returns array of the parts, reversed
 */
export const splitNumber = (input: number) => {
  if (String(input).length > 308) {
    // TODO: use splitString to parse as string
    throw Error("Number too large for now 😔");
  }

  return Number(input).toLocaleString("fullwide").split(",");
};

/**
 * Splits `input` into an array of parts of length `partSize`
 * @param input input value
 * @param partSize length of each part
 * @returns array of the parts, reversed
 */
export const splitN = (input: string | number, partSize = 3) => {
  if (typeof input === "number" && partSize === 3) {
    return splitNumber(input);
  }

  return splitString(String(input), partSize);
};

export const illionsPrefix = (index: number, lang: Lang) => {
  const { zeros, units, tens, huns } = lang.illions;

  if (index > 999) throw Error("Number too large - names don't exist 😢");

  const [h, t, u] = splitDigits(index);

  if (h) return units[u] + tens[t] + huns[h].slice(0, -1); // centillion+
  if (t) return units[u] + tens[t].slice(0, -1); // decillion+
  if (u) return zeros[index];

  throw Error("how did we get here? 🤔");
};

export const illions = (index: number, lang: Lang) => {
  if (index === 0) return lang.none;
  if (index === 1) return lang.thousand;

  const prefix = illionsPrefix(index - 1, lang);

  return capitalize(prefix + lang.illions.suffix);
};
