#!/usr/bin/env node
import ntoa from ".";

const [, , ...numbers] = process.argv;

if (numbers.length < 1) {
  throw new Error("Pass numbers as arguments");
}

numbers.forEach((number) => {
  if (number == null || isNaN(parseInt(number))) {
    console.error(`${number} is not a number`);
  }
  console.log(ntoa(number).join(" "));
});
