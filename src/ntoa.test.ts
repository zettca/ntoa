import { assertEquals } from "https://deno.land/std@0.151.0/testing/asserts.ts";

import ntoa from "./mod.ts";

Deno.test("ntoa short scale", async (t) => {
  await t.step("small numbers", () => {
    // units
    assertEquals(ntoa("1").join(" "), "1");
    assertEquals(ntoa("3").join(" "), "3");

    // dozens
    assertEquals(ntoa("30").join(" "), "30");
    assertEquals(ntoa("42").join(" "), "42");
    assertEquals(ntoa("69").join(" "), "69");

    // hundreds
    assertEquals(ntoa("123").join(" "), "123");
    assertEquals(ntoa("567").join(" "), "567");
  });

  await t.step("small millions", () => {
    assertEquals(ntoa(String(1 * 1000000)).join(" "), "1 Million");
    assertEquals(ntoa(String(12 * 1000000)).join(" "), "12 Million");
    assertEquals(ntoa(String(32 * 1000000)).join(" "), "32 Million");
    assertEquals(ntoa(String(723 * 1000000)).join(" "), "723 Million");

    assertEquals(ntoa(String(BigInt(1000 ** 3))).join(" "), "1 Billion");
    assertEquals(ntoa(String(BigInt(1000 ** 4))).join(" "), "1 Trillion");
    assertEquals(ntoa(String(BigInt(1000 ** 5))).join(" "), "1 Quadrillion");
    assertEquals(ntoa(String(BigInt(1000 ** 6))).join(" "), "1 Quintillion");
    // from this way on converting from number to String/BigInt isn't safe 😔
  });
});
