export type Tuple<
  T,
  N extends number,
  R extends readonly T[] = [],
> = R["length"] extends N ? R : Tuple<T, N, readonly [T, ...R]>;

/** Tuple of `N` strings */
export type StringTuple<N extends number> = Tuple<string, N>;

/** The object of number translations */
export type LangObj = {
  zero: string;
  ones: StringTuple<19>;
  tens: StringTuple<9>;
  hundred: string;
  thousand: string;
  illions: {
    suffix: string;
    zeros: StringTuple<10>;
    units: StringTuple<10>;
    tens: StringTuple<10>;
    huns: StringTuple<10>;
  };
};
