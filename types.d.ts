export type Tuple<
  T,
  N extends number,
  R extends readonly T[] = [],
> = R["length"] extends N ? R : Tuple<T, N, readonly [T, ...R]>;

export type TS<N extends number> = Tuple<string, N>;

export type Lang = {
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

/** The number scale to use. https://en.wikipedia.org/wiki/Long_and_short_scales */
export type Scale = number | "long" | "short" | "knuth";
