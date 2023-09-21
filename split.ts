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
export const splitString = (input: string, partSize = 3) => {
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

  return Number(input).toLocaleString("fullwide").split(",").reverse();
};

/**
 * Splits `input` into an array of parts of length `partSize`
 * @param input input value
 * @param partSize length of each part
 * @returns array of the parts, reversed
 */
export const split = (input: string | number, partSize = 3) => {
  return typeof input === "number" && partSize === 3
    ? splitNumber(input)
    : splitString(String(input), partSize);
};
