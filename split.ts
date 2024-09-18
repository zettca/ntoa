export const splitAt = (str: string, index = 0) => {
  return [str.slice(0, index), str.slice(index)];
};

/**
 * Splits `input` into an array of parts of length `partSize`
 * @param input input value
 * @param partSize length of each part
 * @returns array of the parts
 */
export function split(input: string, partSize = 3) {
  const remainder = input.length % partSize;
  const [firstGroup, rest] = splitAt(input, remainder);

  return [
    ...(remainder === 0 ? [] : [firstGroup]),
    ...rest.match(new RegExp(`.{1,${partSize}}`, "g")) ?? [],
  ].map(Number);
}
