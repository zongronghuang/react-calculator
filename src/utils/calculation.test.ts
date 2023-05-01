import calculator, {
  getLocalProduct,
  getLocalSum,
  isWithinBounds,
  miniCalculator,
  mathExpParser,
  isCalculatable,
  roundResult,
} from "./calculation";

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

  test("Parse math exps correctly", () => {
    const mockData = {
      "1": ["1"],
      "0": ["0"],
      "-1": ["-1"],
      "1000": ["1000"],
      "-1000": ["-1000"],
      "0.2": ["0.2"],
      "-0.2": ["-0.2"],
      "0.20002": ["0.20002"],
      "-0.20002": ["-0.20002"],
      "7589.012301": ["7589.012301"],
      "-7589.012301": ["-7589.012301"],

      "1 + 2": ["1", "+", "2"],
      "1 - 2": ["1", "-", "2"],
      "1 x 2": ["1", "x", "2"],
      "1 ÷ 2": ["1", "÷", "2"],

      "1 + -2": ["1", "+", "-2"],
      "1 - -2": ["1", "-", "-2"],
      "1 x -2": ["1", "x", "-2"],
      "1 ÷ -2": ["1", "÷", "-2"],

      "-1 + 2": ["-1", "+", "2"],
      "-1 - 2": ["-1", "-", "2"],
      "-1 x 2": ["-1", "x", "2"],
      "-1 ÷ 2": ["-1", "÷", "2"],

      "-1 + -2": ["-1", "+", "-2"],
      "-1 - -2": ["-1", "-", "-2"],
      "-1 x -2": ["-1", "x", "-2"],
      "-1 ÷ -2": ["-1", "÷", "-2"],

      "1 + 2 + 3": ["1", "+", "2", "+", "3"],
      "1 - 2 - 3": ["1", "-", "2", "-", "3"],
      "1 x 2 x 3": ["1", "x", "2", "x", "3"],
      "1 ÷ 2 ÷ 3": ["1", "÷", "2", "÷", "3"],
    };

    const exps = Object.keys(mockData);
    const expsWithEquals = exps.map((exp) => exp + " = ");
    const expected = Object.values(mockData);

    expect(exps.map((exp) => mathExpParser(exp))).toEqual(expected);
    expect(expsWithEquals.map((exp) => mathExpParser(exp))).toEqual(expected);
  });

  test("Get local product", () => {
    const exps = [
      "0 x 0",
      "0 x 1",
      "0 x -1",
      "-1 x -1",
      "100 * 0.02",
      "100 x -0.02",
      "999 x 999",
      "9.87 x 6.54",
      "-9.87 x 6.54",
      "9.87 x -6.54",
      "-9.87 x -6.54",
      "0 ÷ 0",
      "0 ÷ 1",
      "0 ÷ -1",
      "-1 ÷ -1",
      "100 ÷ 0.02",
      "100 ÷ -0.02",
      "999 ÷ 999",
      "9.87 ÷ 6.54",
      "-9.87 ÷ 6.54",
      "9.87 ÷ -6.54",
      "-9.87 ÷ -6.54",
    ].map((exp) => getLocalProduct(mathExpParser(exp)));

    const hasDesiredValues = (arr: (string | number | null)[]) =>
      arr.every(
        (item) =>
          typeof item === "string" || typeof item === "number" || item === null
      );

    exps.forEach((exp) => expect(hasDesiredValues(exp)).toBeTruthy);
  });

  test("Get local sum", () => {
    const exps = [
      "0",
      "1",
      "0.2",
      "-0.2",
      "-1",
      "999",
      "-999",
      "0 + 0",
      "0 + 1",
      "0 + -1",
      "-1 + -1",
      "100 + 0.02",
      "100 + -0.02",
      "999 + 999",
      "9.87 + 6.54",
      "-9.87 + 6.54",
      "9.87 + -6.54",
      "-9.87 + -6.54",
      "0 - 0",
      "0 - 1",
      "0 - -1",
      "-1 - -1",
      "100 - 0.02",
      "100 - -0.02",
      "999 - 999",
      "9.87 - 6.54",
      "-9.87 - 6.54",
      "9.87 - -6.54",
      "-9.87 - -6.54",
    ].map((exp) => getLocalSum(mathExpParser(exp)));

    expect(exps.map((exp) => typeof exp === "number")).toContain(true);
  });

  test("Get correct results from mini calculator", () => {
    const exps = Array.from({ length: 30 }, () => ({
      num1: (Math.random() * 10).toFixed(2),
      num2: (Math.random() * 10).toFixed(2),
    }));

    const additions = exps.map(({ num1, num2 }) => +num1 + +num2);
    const substractions = exps.map(({ num1, num2 }) => +num1 - +num2);
    const multiplications = exps.map(({ num1, num2 }) => +num1 * +num2);
    const divisions = exps.map(({ num1, num2 }) => +num1 / +num2);

    expect(
      exps.map(({ num1, num2 }) => miniCalculator(num1, "+", num2))
    ).toEqual(additions);

    expect(
      exps.map(({ num1, num2 }) => miniCalculator(num1, "-", num2))
    ).toEqual(substractions);

    expect(
      exps.map(({ num1, num2 }) => miniCalculator(num1, "x", num2))
    ).toEqual(multiplications);

    expect(
      exps.map(({ num1, num2 }) => miniCalculator(num1, "÷", num2))
    ).toEqual(divisions);
  });

  test("Check math expressions can be calculated", () => {
    const mockData = [
      "1",
      "-1",
      "0",
      "0.222",
      "0.003",
      "-0.222",
      "-0.003",
      "999",
      "-999",
      "1 + 2",
      "1 - 2",
      "1 x 2",
      "1 ÷ 2",
    ];
    const mockDataWithEquals = mockData.map((data) => data + " = ");
    const totalMockData = [...mockData, ...mockDataWithEquals];

    expect(totalMockData.map((data) => isCalculatable(data))).toEqual(
      totalMockData.map((data) => data.indexOf("=") > -1)
    );
  });

  test("Round to the specified decimal position", () => {
    const goodDecimalPlaces = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    const positiveNum = Math.random() * 100;
    const positiveNumToCompare = (n: number) =>
      Math.round(positiveNum * Math.pow(10, n)) / Math.pow(10, n);
    goodDecimalPlaces.forEach((n) => {
      expect(+roundResult(positiveNum, n)).toBeCloseTo(positiveNumToCompare(n));
    });

    const negativeNum = Math.random() * -100;
    const negativeNumToCompare = (n: number) =>
      Math.round(negativeNum * Math.pow(10, n)) / Math.pow(10, n);
    goodDecimalPlaces.forEach((n) => {
      expect(+roundResult(negativeNum, n)).toBeCloseTo(negativeNumToCompare(n));
    });

    const badDecimalPlaces = [
      -Infinity,
      -100,
      -10.5,
      -1,
      -0.5,
      10.5,
      11,
      100,
      Infinity,
    ];

    badDecimalPlaces.forEach((n) =>
      expect(() => roundResult(positiveNum, n)).toThrow(
        "maxNumOfDecimals must be an integer between 0 and 10"
      )
    );

    badDecimalPlaces.forEach((n) =>
      expect(() => roundResult(negativeNum, n)).toThrow(
        "maxNumOfDecimals must be an integer between 0 and 10"
      )
    );
  });

  test("[All] Get correct results from calculator", () => {
    const badMathExps = [
      "0 ÷ 0",
      "1 ÷ 0",
      "-1 ÷ 0",
      "1.55 ÷ 0",
      "-1.55 ÷ 0",
      "10 + -1 ÷ 0",
      "10 - -1 ÷ 0",
      "-10 + -1 ÷ 0",
      "-10 - -1 ÷ 0",
      "10 x -1 ÷ 0",
      "-10 x -1 ÷ 0",
      "10 ÷ -1 ÷ 0",
      "-10 ÷ -1 ÷ 0",
      "1 ÷ 0 + 10",
      "1 ÷ 0 - 10",
      "1 ÷ 0 x 10",
      "1 ÷ 0 x -10",
      "1 ÷ 0 ÷ 10",
      "1 ÷ 0 ÷ -10",
      `${Math.pow(2, 32)}`,
      `${Math.pow(2, 32) + 1}`,
    ];
    badMathExps.forEach((exp) =>
      expect(calculator(exp + " = ")).toBe("NOT A NUMBER")
    );

    const numOfRandomNums = 30;
    const random1 = Array.from({ length: numOfRandomNums }, (_, i) =>
      Math.random() >= 0.5
        ? Math.random() * (i + 10)
        : Math.random() * -(i + 10)
    );
    const random2 = Array.from({ length: numOfRandomNums }, (_, i) =>
      Math.random() >= 0.5
        ? Math.random() * (i + 10)
        : Math.random() * -(i + 10)
    );
    const random3 = Array.from({ length: numOfRandomNums }, (_, i) =>
      Math.random() >= 0.5 ? Math.random() * (i + 1) : Math.random() * -(i + 1)
    );

    for (let i = 0; i < numOfRandomNums; i++) {
      expect(
        +calculator(`${random1[i]} + ${random2[i]} + ${random3[i]} = `)
      ).toBeCloseTo(random1[i] + random2[i] + random3[i]);

      expect(
        +calculator(`${random1[i]} - ${random2[i]} + ${random3[i]} = `)
      ).toBeCloseTo(random1[i] - random2[i] + random3[i]);

      expect(
        +calculator(`${random1[i]} + ${random2[i]} - ${random3[i]} = `)
      ).toBeCloseTo(random1[i] + random2[i] - random3[i]);

      expect(
        +calculator(`${random1[i]} - ${random2[i]} - ${random3[i]} = `)
      ).toBeCloseTo(random1[i] - random2[i] - random3[i]);

      expect(
        +calculator(`${random1[i]} + ${random2[i]} x ${random3[i]} = `)
      ).toBeCloseTo(random1[i] + random2[i] * random3[i]);

      expect(
        +calculator(`${random1[i]} x ${random2[i]} + ${random3[i]} = `)
      ).toBeCloseTo(random1[i] * random2[i] + random3[i]);

      expect(
        +calculator(`${random1[i]} - ${random2[i]} x ${random3[i]} = `)
      ).toBeCloseTo(random1[i] - random2[i] * random3[i]);

      expect(
        +calculator(`${random1[i]} x ${random2[i]} - ${random3[i]} = `)
      ).toBeCloseTo(random1[i] * random2[i] - random3[i]);

      expect(
        +calculator(`${random1[i]} + ${random2[i]} ÷ ${random3[i]} = `)
      ).toBeCloseTo(random1[i] + random2[i] / random3[i]);

      expect(
        +calculator(`${random1[i]} ÷ ${random2[i]} + ${random3[i]} = `)
      ).toBeCloseTo(random1[i] / random2[i] + random3[i]);

      expect(
        +calculator(`${random1[i]} - ${random2[i]} ÷ ${random3[i]} = `)
      ).toBeCloseTo(random1[i] - random2[i] / random3[i]);

      expect(
        +calculator(`${random1[i]} ÷ ${random2[i]} - ${random3[i]} = `)
      ).toBeCloseTo(random1[i] / random2[i] - random3[i]);

      expect(
        +calculator(`${random1[i]} x ${random2[i]} x ${random3[i]} = `)
      ).toBeCloseTo(random1[i] * random2[i] * random3[i]);

      expect(
        +calculator(`${random1[i]} x ${random2[i]} ÷ ${random3[i]} = `)
      ).toBeCloseTo((random1[i] * random2[i]) / random3[i]);

      expect(
        +calculator(`${random1[i]} ÷ ${random2[i]} ÷ ${random3[i]} = `)
      ).toBeCloseTo(random1[i] / random2[i] / random3[i]);

      expect(
        +calculator(`${random1[i]} ÷ ${random2[i]} x ${random3[i]} = `)
      ).toBeCloseTo((random1[i] / random2[i]) * random3[i]);
    }
  });
});
