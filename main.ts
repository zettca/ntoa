#!/usr/bin/env -S deno run

import ntoa from "./mod.ts";

function main() {
  const numbers = Deno.args;

  if (numbers.length < 1) throw new Error("Pass numbers as arguments");

  numbers.forEach((number) => {
    if (isNaN(parseInt(number))) {
      console.error(`"${number}" is not a number`);
    } else {
      console.log(ntoa(number));
    }
  });
}

if (import.meta.main) {
  main();
}
