// deno-lint-ignore-file no-explicit-any
import { parseArgs } from "@std/cli/parse-args";
import { ntoa, type Options } from "./mod.ts";

const args = parseArgs(Deno.args, {
  string: ["lang", "scale", "_"],
  boolean: ["verbose"],
});

const numbers = args._ as string[];

if (numbers?.length < 1) throw new Error("Pass numbers as arguments");

const options: Options = {
  lang: args.lang as any,
  scale: args.scale as any,
  verbose: args.verbose,
};

numbers.forEach((num) => {
  if (/^\d+$/.test(num)) {
    console.log(ntoa(num, options));
  } else {
    console.error(`"${num}" is not a valid integer`);
  }
});
