export type Tuple<
  T,
  N extends number,
  R extends readonly T[] = [],
> = R["length"] extends N ? R : Tuple<T, N, readonly [T, ...R]>;

/** Tuple of `N` strings */
export type TS<N extends number> = Tuple<string, N>;

/** The object of number translations */
export type LangObj = {
  separator: string;
  none: string;
  zero: string;
  ones: TS<19>;
  tens: TS<9>;
  hundred: string;
  thousand: string;
  illions: {
    suffix: string;
    zeros: TS<10>;
    units: TS<10>;
    tens: TS<10>;
    huns: TS<10>;
  };
};
