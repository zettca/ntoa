function splitAt(str = "", index = 0) {
  return [str.slice(0, index), str.slice(index)];
}

/**
 * Splits `input` into an array of parts of length `partSize`
 * @param input input value
 * @param partSize length of each part
 * @returns array of the parts
 */
export function split(input = "", partSize = 3) {
  const [firstPart, rest] = splitAt(input, input.length % partSize);

  return [
    firstPart,
    ...rest.match(new RegExp(`.{1,${partSize}}`, "g")) ?? [],
  ].filter(Boolean).map(Number);
}
