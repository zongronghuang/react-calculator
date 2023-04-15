import { combineMathExp, normalizeInput } from "./input";

describe("[Make valid math expressions]", () => {
  test("Normalize input", () => {
    const inputs = ["=", "+", "-", "x", "÷", ".", "1", "+/-", "0"];
    const expectedValues = [
      " = ",
      " + ",
      " - ",
      " x ",
      " ÷ ",
      ".",
      "1",
      "+/-",
      "0",
    ];
    expect(inputs.map((input) => normalizeInput(input))).toEqual(
      expectedValues
    );
  });

  test("Add nothing after =", () => {
    const baseExp = "2 + 3 = ";
    const inputs = ["=", "+", "-", "x", "÷", ".", "1", "+/-", "0"];
    const expectedValue = Array(inputs.length).fill(baseExp);

    expect(inputs.map((input) => combineMathExp(baseExp, input))).toEqual(
      expectedValue
    );
  });
});
