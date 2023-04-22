import {
  calculate,
  parseExpressionToNumber,
  getLocalProduct,
  getLocalSum,
  isWithinBounds,
  normalizeExpression,
  compute,
} from "./output";

describe("[Get result from math expressions]", () => {
  test("Result should be within bounds", () => {
    const numbers = [
      Infinity,
      -Infinity,
      Math.pow(2, 32) + 1,
      Math.pow(2, 32) + 0.1,
      Math.pow(2, 32) + 0.001,
      Math.pow(2, 32),
      Math.pow(2, 32) - 1,
      0,
      1,
      -1,
      100,
      -99999999,
      1000,
      99999999,
      10000000000,
      99999999999999.999999999,
    ];

    const expected = [
      false,
      false,
      false,
      false,
      false,
      false,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      false,
      false,
    ];

    expect(numbers.map((num) => isWithinBounds(num))).toEqual(expected);
  });
});
