import { assertEquals } from "jsr:@std/assert";

import { split } from "./split.ts";

Deno.test("splits in 3 by default", () => {
  assertEquals(split("123456789"), [123, 456, 789]);
  assertEquals(split("123"), [123]);
});

Deno.test("splits correctly in default", () => {
  assertEquals(split(""), []);
  assertEquals(split("1"), [1]);
  assertEquals(split("12"), [12]);
  assertEquals(split("123"), [123]);
  assertEquals(split("1235"), [1, 235]);
  assertEquals(split("12345"), [12, 345]);
  assertEquals(split("123456"), [123, 456]);
});

Deno.test("splits in single group correctly", () => {
  assertEquals(split("", 6), []);
  assertEquals(split("1", 1), [1]);
  assertEquals(split("1", 2), [1]);
  assertEquals(split("1", 3), [1]);
  assertEquals(split("1", 4), [1]);
  assertEquals(split("1", 5), [1]);
  assertEquals(split("1", 6), [1]);
  assertEquals(split("12", 6), [12]);
  assertEquals(split("123", 6), [123]);
  assertEquals(split("123", 6), [123]);
  assertEquals(split("1234", 6), [1234]);
  assertEquals(split("12345", 6), [12345]);
  assertEquals(split("123456", 6), [123456]);
});

Deno.test("splits in multiple groups correctly", () => {
  assertEquals(split("1234", 1), [1, 2, 3, 4]);
  assertEquals(split("1234", 2), [12, 34]);
  assertEquals(split("1234", 3), [1, 234]);
  assertEquals(split("1234", 4), [1234]);
  assertEquals(split("123456789", 5), [1234, 56789]);
  assertEquals(split("123456789", 6), [123, 456789]);
});
