import ntoa from "./ntoa";

/*
range(12)
  .map((i) => "1" + "123000000".repeat(i + 1))
  .forEach((v) => console.log(v.length - 1, ntoa(v).join(" ")));
*/

describe("nota short scale", () => {
  test("small numbers", () => {
    // units
    // expect(ntoa("0").join(" ")).toBe("0");
    expect(ntoa("1").join(" ")).toBe("1");
    expect(ntoa("3").join(" ")).toBe("3");

    // dozens
    expect(ntoa("30").join(" ")).toBe("30");
    expect(ntoa("42").join(" ")).toBe("42");
    expect(ntoa("69").join(" ")).toBe("69");

    // hundreds
    expect(ntoa("123").join(" ")).toBe("123");
    expect(ntoa("567").join(" ")).toBe("567");
  });

  test("thousands", () => {
    expect(ntoa("1234").join(" ")).toBe("1 Thousand 234");
    expect(ntoa("4567").join(" ")).toBe("4 Thousand 567");
    expect(ntoa("123487").join(" ")).toBe("123 Thousand 487");
    expect(ntoa("432890").join(" ")).toBe("432 Thousand 890");
  });

  test("small millions", () => {
    expect(ntoa(String(1 * 1000000)).join(" ")).toBe("1 Million");
    expect(ntoa(String(12 * 1000000)).join(" ")).toBe("12 Million");
    expect(ntoa(String(32 * 1000000)).join(" ")).toBe("32 Million");
    expect(ntoa(String(723 * 1000000)).join(" ")).toBe("723 Million");

    expect(ntoa(String(BigInt(1000 ** 3))).join(" ")).toBe("1 Billion");
    expect(ntoa(String(BigInt(1000 ** 4))).join(" ")).toBe("1 Trillion");
    expect(ntoa(String(BigInt(1000 ** 5))).join(" ")).toBe("1 Quadrillion");
    expect(ntoa(String(BigInt(1000 ** 6))).join(" ")).toBe("1 Quintillion");
    // from this way on converting from number to String/BigInt isn't safe 😔
  });
});
