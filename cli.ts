#!/usr/bin/env -S deno run

import { parse } from "https://deno.land/std@0.151.0/flags/mod.ts";
import ntoa from "./mod.ts";

function main() {
  const args = parse(Deno.args);
  const numbers = args._ as string[];

  if (numbers.length < 1) {
    throw new Error("Pass numbers as arguments");
  }

  (numbers).forEach((number) => {
    if (isNaN(parseInt(number))) {
      console.error(`${number} is not a number`);
    }
    console.log(ntoa(number).join(" "));
  });
}

if (import.meta.main) {
  main();
}
