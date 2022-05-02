import { parseCurrency } from "./currency";

test("parseCurrency", () => {
  expect(parseCurrency(0)).toBe(0);
  expect(parseCurrency(1)).toBe(100);
  expect(parseCurrency(1.25)).toBe(125);
  expect(parseCurrency(1.5)).toBe(150);
  expect(parseCurrency(1.75)).toBe(175);
  expect(parseCurrency(1.12345)).toBe(112);
  expect(parseCurrency(10000)).toBe(1000000);

  expect(parseCurrency(-1)).toBe(-100);
  expect(parseCurrency(-1.25)).toBe(-125);
  expect(parseCurrency(-1.5)).toBe(-150);
  expect(parseCurrency(-1.75)).toBe(-175);
  expect(parseCurrency(-1.12345)).toBe(-112);
  expect(parseCurrency(-10000)).toBe(-1000000);
});
