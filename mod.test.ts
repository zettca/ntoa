import { assertEquals } from "https://deno.land/std@0.202.0/assert/mod.ts";

import ntoa from "./mod.ts";
import { split } from "./split.ts";

Deno.test("split", async (t) => {
  await t.step("splits in 3 by default", () => {
    assertEquals(split("123456789"), [123, 456, 789]);
    assertEquals(split("123"), [123]);
  });

  await t.step("splits correctly in default", () => {
    assertEquals(split(""), []);
    assertEquals(split("1"), [1]);
    assertEquals(split("12"), [12]);
    assertEquals(split("123"), [123]);
    assertEquals(split("1235"), [1, 235]);
    assertEquals(split("12345"), [12, 345]);
    assertEquals(split("123456"), [123, 456]);
  });

  await t.step("splits in single group correctly", () => {
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

  await t.step("splits in multiple groups correctly", () => {
    assertEquals(split("1234", 1), [1, 2, 3, 4]);
    assertEquals(split("1234", 2), [12, 34]);
    assertEquals(split("1234", 3), [1, 234]);
    assertEquals(split("1234", 4), [1234]);
    assertEquals(split("123456789", 5), [1234, 56789]);
    assertEquals(split("123456789", 6), [123, 456789]);
  });
});

Deno.test("ntoa short scale", async (t) => {
  await t.step("small numbers", () => {
    // units
    assertEquals(ntoa("1"), "1");
    assertEquals(ntoa("3"), "3");

    // dozens
    assertEquals(ntoa("30"), "30");
    assertEquals(ntoa("42"), "42");
    assertEquals(ntoa("69"), "69");

    // hundreds
    assertEquals(ntoa("123"), "123");
    assertEquals(ntoa("567"), "567");
  });

  await t.step("small millions", () => {
    assertEquals(ntoa(String(1 * 1000000)), "1 Million");
    assertEquals(ntoa(String(12 * 1000000)), "12 Million");
    assertEquals(ntoa(String(32 * 1000000)), "32 Million");
    assertEquals(ntoa(String(723 * 1000000)), "723 Million");

    assertEquals(ntoa(String(BigInt(1000 ** 3))), "1 Billion");
    assertEquals(ntoa(String(BigInt(1000 ** 4))), "1 Trillion");
    assertEquals(ntoa(String(BigInt(1000 ** 5))), "1 Quadrillion");
    assertEquals(ntoa(String(BigInt(1000 ** 6))), "1 Quintillion");
    // from this point on converting from number to String/BigInt isn't safe 😔
  });

  await t.step("large names", () => {
    const ntoaM = (n: number) => ntoa(123 + "000".repeat(n + 1));

    assertEquals(ntoaM(8), "123 Octillion");
    assertEquals(ntoaM(9), "123 Nonillion");
    assertEquals(ntoaM(10), "123 Decillion");
    assertEquals(ntoaM(11), "123 Undecillion");
    assertEquals(ntoaM(12), "123 Duodecillion");
    assertEquals(ntoaM(13), "123 Tredecillion");
    assertEquals(ntoaM(14), "123 Quattuordecillion");
    assertEquals(ntoaM(15), "123 Quindecillion");
    assertEquals(ntoaM(16), "123 Sexdecillion");
    assertEquals(ntoaM(17), "123 Septendecillion");
    assertEquals(ntoaM(18), "123 Octodecillion");
    assertEquals(ntoaM(19), "123 Novemdecillion");
    assertEquals(ntoaM(20), "123 Vigintillion");

    assertEquals(ntoaM(100), "123 Centillion");
    assertEquals(ntoaM(200), "123 Ducentillion");
    assertEquals(ntoaM(300), "123 Trecentillion");
    assertEquals(ntoaM(400), "123 Quadringentillion");
    assertEquals(ntoaM(500), "123 Quingentillion");
    assertEquals(ntoaM(600), "123 Sescentillion");
    assertEquals(ntoaM(700), "123 Septingentillion");
    assertEquals(ntoaM(800), "123 Octingentillion");
    assertEquals(ntoaM(900), "123 Nongentillion");
    // assertEquals(ntoaM(1000), "123 Millinillion");
  });

  await t.step("large names long scale", () => {
    const ntoaM = (n: number) =>
      ntoa(123 + "000".repeat((n + 1) * 2), { scale: "long" });

    assertEquals(ntoaM(8), "123 Octillion");
    assertEquals(ntoaM(9), "123 Nonillion");
    assertEquals(ntoaM(10), "123 Decillion");
    assertEquals(ntoaM(11), "123 Undecillion");
    assertEquals(ntoaM(12), "123 Duodecillion");
    assertEquals(ntoaM(13), "123 Tredecillion");
    assertEquals(ntoaM(14), "123 Quattuordecillion");
    assertEquals(ntoaM(15), "123 Quindecillion");
    assertEquals(ntoaM(16), "123 Sexdecillion");
    assertEquals(ntoaM(17), "123 Septendecillion");
    assertEquals(ntoaM(18), "123 Octodecillion");
    assertEquals(ntoaM(19), "123 Novemdecillion");
    assertEquals(ntoaM(20), "123 Vigintillion");

    assertEquals(ntoaM(100), "123 Centillion");
    assertEquals(ntoaM(200), "123 Ducentillion");
    assertEquals(ntoaM(300), "123 Trecentillion");
    assertEquals(ntoaM(400), "123 Quadringentillion");
    assertEquals(ntoaM(500), "123 Quingentillion");
    assertEquals(ntoaM(600), "123 Sescentillion");
    assertEquals(ntoaM(700), "123 Septingentillion");
    assertEquals(ntoaM(800), "123 Octingentillion");
    assertEquals(ntoaM(900), "123 Nongentillion");
    // assertEquals(ntoaM(1000), "123 Millinillion");
  });

  await t.step("large compound numbers", () => {
    assertEquals(
      ntoa("100".repeat(12) + "0"),
      "1 Undecillion 1 Decillion 1 Nonillion 1 Octillion 1 Septillion 1 Sextillion 1 Quintillion 1 Quadrillion 1 Trillion 1 Billion 1 Million 1 Thousand",
    );
    assertEquals(
      ntoa("123".repeat(12)),
      "123 Decillion 123 Nonillion 123 Octillion 123 Septillion 123 Sextillion 123 Quintillion 123 Quadrillion 123 Trillion 123 Billion 123 Million 123 Thousand 123",
    );
  });
});
