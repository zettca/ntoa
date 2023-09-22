export const splitAt = (str: string, index = 0) => {
  return [str.slice(0, index), str.slice(index)];
};

/**
 * Splits `input` in parts of length `partSize`
 * @param input input value
 * @param partSize length of each part
 * @returns array of the parts
 */
export const splitString = (input: string, partSize = 3) => {
  const remainder = input.length % partSize;
  const [firstGroup, rest] = splitAt(input, remainder);

  return [
    ...(remainder === 0 ? [] : [firstGroup]),
    ...rest.match(new RegExp(`.{1,${partSize}}`, "g")) ?? [],
  ];
};

/**
 * Splits `input` in parts of 3, up to length of 308 chars
 * @param input
 * @returns array of the parts
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
 * @returns array of the parts
 */
export const split = (input: string | number, partSize = 3) => {
  const groups = typeof input === "number" && partSize === 3
    ? splitNumber(input)
    : splitString(String(input), partSize);

  return groups.map(Number);
};
