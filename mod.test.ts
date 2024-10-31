import { assertEquals } from "jsr:@std/assert";

import { ntoa } from "./mod.ts";

Deno.test("small numbers", () => {
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

Deno.test("small millions", () => {
  assertEquals(ntoa(String(1 * 1000000)), "1 million");
  assertEquals(ntoa(String(12 * 1000000)), "12 million");
  assertEquals(ntoa(String(32 * 1000000)), "32 million");
  assertEquals(ntoa(String(723 * 1000000)), "723 million");

  assertEquals(ntoa(String(BigInt(1000 ** 3))), "1 billion");
  assertEquals(ntoa(String(BigInt(1000 ** 4))), "1 trillion");
  assertEquals(ntoa(String(BigInt(1000 ** 5))), "1 quadrillion");
  assertEquals(ntoa(String(BigInt(1000 ** 6))), "1 quintillion");
  // from this point on converting from number to String/BigInt isn't safe 😔
});

Deno.test("large names", () => {
  const ntoaM = (n: number) => ntoa(123 + "000".repeat(n + 1));

  assertEquals(ntoaM(8), "123 octillion");
  assertEquals(ntoaM(9), "123 nonillion");
  assertEquals(ntoaM(10), "123 decillion");
  assertEquals(ntoaM(11), "123 undecillion");
  assertEquals(ntoaM(12), "123 duodecillion");
  assertEquals(ntoaM(13), "123 tredecillion");
  assertEquals(ntoaM(14), "123 quattuordecillion");
  assertEquals(ntoaM(15), "123 quindecillion");
  assertEquals(ntoaM(16), "123 sexdecillion");
  assertEquals(ntoaM(17), "123 septendecillion");
  assertEquals(ntoaM(18), "123 octodecillion");
  assertEquals(ntoaM(19), "123 novendecillion");
  assertEquals(ntoaM(20), "123 vigintillion");

  assertEquals(ntoaM(100), "123 centillion");
  assertEquals(ntoaM(200), "123 ducentillion");
  assertEquals(ntoaM(300), "123 trecentillion");
  assertEquals(ntoaM(400), "123 quadringentillion");
  assertEquals(ntoaM(500), "123 quingentillion");
  assertEquals(ntoaM(600), "123 sescentillion");
  assertEquals(ntoaM(700), "123 septingentillion");
  assertEquals(ntoaM(800), "123 octingentillion");
  assertEquals(ntoaM(900), "123 nongentillion");
  // assertEquals(ntoaM(1000), "123 Millinillion");
});

Deno.test("long scale", () => {
  const ntoaL = (n: string) => ntoa(n, { scale: "long" });
  assertEquals(ntoaL("123"), "123");
  assertEquals(ntoaL("1234"), "1 thousand 234");
  assertEquals(ntoaL("12345"), "12 thousand 345");
  assertEquals(ntoaL("123456"), "123 thousand 456");
  assertEquals(ntoaL("1234567"), "1 million 234 thousand 567");
  assertEquals(ntoaL("12345678"), "12 million 345 thousand 678");
  assertEquals(ntoaL("123456789"), "123 million 456 thousand 789");
  assertEquals(ntoaL("1234567890"), "1234 million 567 thousand 890");
});

Deno.test("long scale large numbers", () => {
  const ntoaM = (n: number) =>
    ntoa(123 + "000".repeat(n * 2), { scale: "long" });

  assertEquals(ntoaM(2), "123 billion");
  assertEquals(ntoaM(3), "123 trillion");
  assertEquals(ntoaM(5), "123 quintillion");
  assertEquals(ntoaM(8), "123 octillion");
  assertEquals(ntoaM(9), "123 nonillion");
  assertEquals(ntoaM(10), "123 decillion");
  assertEquals(ntoaM(11), "123 undecillion");
  assertEquals(ntoaM(12), "123 duodecillion");
  assertEquals(ntoaM(13), "123 tredecillion");
  assertEquals(ntoaM(14), "123 quattuordecillion");
  assertEquals(ntoaM(15), "123 quindecillion");
  assertEquals(ntoaM(16), "123 sexdecillion");
  assertEquals(ntoaM(17), "123 septendecillion");
  assertEquals(ntoaM(18), "123 octodecillion");
  assertEquals(ntoaM(19), "123 novendecillion");
  assertEquals(ntoaM(20), "123 vigintillion");

  assertEquals(ntoaM(100), "123 centillion");
  assertEquals(ntoaM(200), "123 ducentillion");
  assertEquals(ntoaM(300), "123 trecentillion");
  assertEquals(ntoaM(400), "123 quadringentillion");
  assertEquals(ntoaM(500), "123 quingentillion");
  assertEquals(ntoaM(600), "123 sescentillion");
  assertEquals(ntoaM(700), "123 septingentillion");
  assertEquals(ntoaM(800), "123 octingentillion");
  assertEquals(ntoaM(900), "123 nongentillion");
  // assertEquals(ntoaM(1000), "123 Millinillion");
});

Deno.test("large compound numbers", () => {
  assertEquals(
    ntoa("100".repeat(12) + "0"),
    "1 undecillion 1 decillion 1 nonillion 1 octillion 1 septillion 1 sextillion 1 quintillion 1 quadrillion 1 trillion 1 billion 1 million 1 thousand",
  );
  assertEquals(
    ntoa("123".repeat(12)),
    "123 decillion 123 nonillion 123 octillion 123 septillion 123 sextillion 123 quintillion 123 quadrillion 123 trillion 123 billion 123 million 123 thousand 123",
  );
  assertEquals(
    ntoa("123".repeat(12), { scale: "long" }),
    "123123 quintillion 123123 quadrillion 123123 trillion 123123 billion 123123 million 123 thousand 123",
  );
});

Deno.test("large verbose numbers", () => {
  assertEquals(
    ntoa("123456789000", { verbose: true }),
    "one hundred twenty-three billion four hundred fifty-six million seven hundred eighty-nine thousand",
  );
  assertEquals(
    ntoa("123456789000", { scale: "long", verbose: true }),
    "one hundred twenty-three thousand four hundred fifty-six million seven hundred eighty-nine thousand",
  );
});

Deno.test("centillions", () => {
  assertEquals(
    ntoa(123 + "000".repeat(199) + 123 + "000".repeat(101)),
    "123 trecentillion 123 centillion",
  );
});

Deno.test("millizillions", () => {
  assertEquals(
    ntoa(123123123123 + "000".repeat(1001)),
    "123 millitrillion 123 millibillion 123 millimillion 123 millinillion",
  );
});

Deno.test("intl", async (t) => {
  await t.step("pt", () => {
    assertEquals(
      ntoa("123456789000", { lang: "pt" }),
      "123 biliões 456 milhões 789 mil",
    );

    assertEquals(
      ntoa("123456789000", { lang: "pt", scale: "long" }),
      "123456 milhões 789 mil",
    );

    assertEquals(
      ntoa("123456789000", { lang: "pt", scale: "long", verbose: true }),
      "cento e vinte e três mil quatrocentos e cinquenta e seis milhões setecentos e oitenta e nove mil",
    );
  });

  await t.step("fr", () => {
    assertEquals(
      ntoa("123456789000", { lang: "fr" }),
      "123 billions 456 millions 789 mille",
    );

    assertEquals(
      ntoa("123456789000", { lang: "fr", scale: "long" }),
      "123456 millions 789 mille",
    );

    assertEquals(
      ntoa("123456789000", { lang: "fr", scale: "long", verbose: true }),
      "cent vingt-trois mille quatre cent cinquante-six millions sept cent quatre-vingt-neuf mille",
    );
  });

  await t.step("it", () => {
    assertEquals(
      ntoa("123456789000", { lang: "it" }),
      "123 bilione 456 milione 789 mila",
    );

    assertEquals(
      ntoa("123456789000", { lang: "it", scale: "long" }),
      "123456 milione 789 mila",
    );

    assertEquals(
      ntoa("123456789000", { lang: "it", scale: "long", verbose: true }),
      "centoventitremilaquattrocentocinquantasei milione settecentoottantanove mila",
    );
  });

  await t.step("es", () => {
    assertEquals(
      ntoa("123456789000", { lang: "es" }),
      "123 billónes 456 millónes 789 mil",
    );

    assertEquals(
      ntoa("123456789000", { lang: "es", scale: "long" }),
      "123456 millónes 789 mil",
    );

    assertEquals(
      ntoa("123456789000", { lang: "es", scale: "long", verbose: true }),
      "ciento veinte y tres mil cuatrocientos cincuenta y seis millónes setecientos ochenta y nueve mil",
    );
  });
});
