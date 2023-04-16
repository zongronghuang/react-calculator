import {
  makeOppositeNum,
  normalizeInput,
  ignoreExpWithEqualSign,
  addDecimalDot,
  addOperator,
  addNumber,
} from "./input";

describe("[Make valid math expressions]", () => {
  test("Normalize input", () => {
    const inputs = ["=", "+", "-", "x", "÷", ".", "1", "0"];
    const expected = [" = ", " + ", " - ", " x ", " ÷ ", ".", "1", "0"];
    expect(inputs.map((input) => normalizeInput(input))).toEqual(expected);
  });

  test("Add nothing after =", () => {
    const exps = [
      "0 = ",
      "-1 = ",
      "2.3 = ",
      "2 + 1 = ",
      "2 - 1 = ",
      "2 x 1 = ",
      "2 x -1 = ",
      "2 ÷ 1 = ",
      "2 ÷ -1 = ",
    ];

    expect(exps.map((exp) => ignoreExpWithEqualSign(exp))).toEqual(exps);
  });

  test("+/- makes opposite numbers", () => {
    const map = {
      "": "",
      "1": "-1",
      "-1": "1",
      "0": "0",
      "1.25": "-1.25",
      "-1.25": "1.25",

      "2 + 1": "2 + -1",
      "2 - 1": "2 - -1",
      "2 x 1": "2 x -1",
      "2 x -1": "2 x 1",
      "2 ÷ 1": "2 ÷ -1",
      "2 ÷ -1": "2 ÷ 1",

      "2 + 1.2": "2 + -1.2",
      "2 - 1.2": "2 - -1.2",
      "2 - -1.2": "2 - 1.2",
      "2 x 1.2": "2 x -1.2",
      "2 x -1.2": "2 x 1.2",
      "2 ÷ 1.2": "2 ÷ -1.2",
      "2 ÷ -1.2": "2 ÷ 1.2",

      // 最後為 operator，不做處理
      "2 + 1 = ": "2 + 1 = ",
      "2 + 1 + ": "2 + 1 + ",
      "2 + 1 - ": "2 + 1 - ",
      "2 + 1 x ": "2 + 1 x ",
      "2 + 1 ÷ ": "2 + 1 ÷ ",

      // 小數點結尾
      "2 + 1.": "2 + -1",
      "2 + -1.": "2 + 1",
    };

    const baseExps = Object.keys(map);
    const expected = Object.values(map);
    expect(baseExps.map((exp) => makeOppositeNum(exp))).toEqual(expected);
  });

  test("Add decimal dot", () => {
    const map = {
      "": "",
      "1": "1.",
      "-1": "-1.",
      "0": "0.",
      "1.25": "1.25",
      "-1.25": "-1.25",

      "2 + 1": "2 + 1.",
      "2 - 1": "2 - 1.",
      "2 x 1": "2 x 1.",
      "2 x -1": "2 x -1.",
      "2 ÷ 1": "2 ÷ 1.",
      "2 ÷ -1": "2 ÷ -1.",

      // 最後數字含小數點，不做處理
      "2 + 1.2": "2 + 1.2",
      "2 - 1.2": "2 - 1.2",
      "2 - -1.2": "2 - -1.2",
      "2 x 1.2": "2 x 1.2",
      "2 x -1.2": "2 x -1.2",
      "2 ÷ 1.2": "2 ÷ 1.2",
      "2 ÷ -1.2": "2 ÷ -1.2",

      // 最後為 operator，不做處理
      "2 + 1 = ": "2 + 1 = ",
      "2 + 1 + ": "2 + 1 + ",
      "2 + 1 - ": "2 + 1 - ",
      "2 + 1 x ": "2 + 1 x ",
      "2 + 1 ÷ ": "2 + 1 ÷ ",
    };

    const baseExps = Object.keys(map);
    const expected = Object.values(map);
    expect(baseExps.map((exp) => addDecimalDot(exp))).toEqual(expected);
  });

  test("Add operator +", () => {
    const operator = "+";
    const map = {
      "": "",
      "1": `1 ${operator} `,
      "-1": `-1 ${operator} `,
      "0": `0 ${operator} `,
      "1.2": `1.2 ${operator} `,
      "-1.2": `-1.2 ${operator} `,

      // 最後為 .，移除 . 並加上 operator
      "2 + 1.": `2 + 1 ${operator} `,
      "2 - 1.": `2 - 1 ${operator} `,
      "2 x 1.": `2 x 1 ${operator} `,
      "2 x -1.": `2 x -1 ${operator} `,
      "2 ÷ 1.": `2 ÷ 1 ${operator} `,
      "2 ÷ -1.": `2 ÷ -1 ${operator} `,

      // 最後為 =，不做處理
      "2 + 1 = ": "2 + 1 = ",

      // 最後為 operator，替換成新的 operator
      "2 + 1 + ": `2 + 1 ${operator} `,
      "2 + 1 - ": `2 + 1 ${operator} `,
      "2 + 1 x ": `2 + 1 ${operator} `,
      "2 + 1 ÷ ": `2 + 1 ${operator} `,
    };

    const baseExps = Object.keys(map);
    const expected = Object.values(map);

    expect(baseExps.map((exp) => addOperator(exp, operator))).toEqual(expected);
  });

  test("Add operator -", () => {
    const operator = "-";
    const map = {
      "": "",
      "1": `1 ${operator} `,
      "-1": `-1 ${operator} `,
      "0": `0 ${operator} `,
      "1.2": `1.2 ${operator} `,
      "-1.2": `-1.2 ${operator} `,

      // 最後為 .，移除 . 並加上 operator
      "2 + 1.": `2 + 1 ${operator} `,
      "2 - 1.": `2 - 1 ${operator} `,
      "2 x 1.": `2 x 1 ${operator} `,
      "2 x -1.": `2 x -1 ${operator} `,
      "2 ÷ 1.": `2 ÷ 1 ${operator} `,
      "2 ÷ -1.": `2 ÷ -1 ${operator} `,

      // 最後為 =，不做處理
      "2 + 1 = ": "2 + 1 = ",

      // 最後為 operator，替換成新的 operator
      "2 + 1 + ": `2 + 1 ${operator} `,
      "2 + 1 - ": `2 + 1 ${operator} `,
      "2 + 1 x ": `2 + 1 ${operator} `,
      "2 + 1 ÷ ": `2 + 1 ${operator} `,
    };

    const baseExps = Object.keys(map);
    const expected = Object.values(map);

    expect(baseExps.map((exp) => addOperator(exp, operator))).toEqual(expected);
  });

  test("Add operator x", () => {
    const operator = "x";
    const map = {
      "": "",
      "1": `1 ${operator} `,
      "-1": `-1 ${operator} `,
      "0": `0 ${operator} `,
      "1.2": `1.2 ${operator} `,
      "-1.2": `-1.2 ${operator} `,

      // 最後為 .，移除 . 並加上 operator
      "2 + 1.": `2 + 1 ${operator} `,
      "2 - 1.": `2 - 1 ${operator} `,
      "2 x 1.": `2 x 1 ${operator} `,
      "2 x -1.": `2 x -1 ${operator} `,
      "2 ÷ 1.": `2 ÷ 1 ${operator} `,
      "2 ÷ -1.": `2 ÷ -1 ${operator} `,

      // 最後為 =，不做處理
      "2 + 1 = ": "2 + 1 = ",

      // 最後為 operator，替換成新的 operator
      "2 + 1 + ": `2 + 1 ${operator} `,
      "2 + 1 - ": `2 + 1 ${operator} `,
      "2 + 1 x ": `2 + 1 ${operator} `,
      "2 + 1 ÷ ": `2 + 1 ${operator} `,
    };

    const baseExps = Object.keys(map);
    const expected = Object.values(map);

    expect(baseExps.map((exp) => addOperator(exp, operator))).toEqual(expected);
  });

  test("Add operator ÷", () => {
    const operator = "÷";
    const map = {
      "": "",
      "1": `1 ${operator} `,
      "-1": `-1 ${operator} `,
      "0": `0 ${operator} `,
      "1.2": `1.2 ${operator} `,
      "-1.2": `-1.2 ${operator} `,

      // 最後為 .，移除 . 並加上 operator
      "2 + 1.": `2 + 1 ${operator} `,
      "2 - 1.": `2 - 1 ${operator} `,
      "2 x 1.": `2 x 1 ${operator} `,
      "2 x -1.": `2 x -1 ${operator} `,
      "2 ÷ 1.": `2 ÷ 1 ${operator} `,
      "2 ÷ -1.": `2 ÷ -1 ${operator} `,

      // 最後為 =，不做處理
      "2 + 1 = ": "2 + 1 = ",

      // 最後為 operator，替換成新的 operator
      "2 + 1 + ": `2 + 1 ${operator} `,
      "2 + 1 - ": `2 + 1 ${operator} `,
      "2 + 1 x ": `2 + 1 ${operator} `,
      "2 + 1 ÷ ": `2 + 1 ${operator} `,
    };

    const baseExps = Object.keys(map);
    const expected = Object.values(map);

    expect(baseExps.map((exp) => addOperator(exp, operator))).toEqual(expected);
  });

  test("Add operator =", () => {
    const operator = "=";
    const map = {
      "": "",
      "1": `1 ${operator} `,
      "-1": `-1 ${operator} `,
      "0": `0 ${operator} `,
      "1.2": `1.2 ${operator} `,
      "-1.2": `-1.2 ${operator} `,

      // 最後為 .，移除 . 並加上 operator
      "2 + 1.": `2 + 1 ${operator} `,
      "2 - 1.": `2 - 1 ${operator} `,
      "2 x 1.": `2 x 1 ${operator} `,
      "2 x -1.": `2 x -1 ${operator} `,
      "2 ÷ 1.": `2 ÷ 1 ${operator} `,
      "2 ÷ -1.": `2 ÷ -1 ${operator} `,

      // 最後為 =，不做處理
      "2 + 1 = ": "2 + 1 = ",

      // 最後為 operator，替換成新的 operator
      "2 + 1 + ": `2 + 1 ${operator} `,
      "2 + 1 - ": `2 + 1 ${operator} `,
      "2 + 1 x ": `2 + 1 ${operator} `,
      "2 + 1 ÷ ": `2 + 1 ${operator} `,
    };

    const baseExps = Object.keys(map);
    const expected = Object.values(map);

    expect(baseExps.map((exp) => addOperator(exp, operator))).toEqual(expected);
  });

  test("Add number 0", () => {
    const num = "0";
    const map = {
      "": "0",
      "0": "0",
      "1": "10",
      "5": "50",
      "90": "900",
      "-1": "-10",
      "-5": "-50",
      "-90": "-900",
      "1.2": "1.20",
      "1.20": "1.200",
      "-1.2": "-1.20",
      "-1.20": "-1.200",

      "2 + 1": "2 + 10",
      "2 - 1": "2 - 10",
      "2 x 1": "2 x 10",
      "2 x -1": "2 x -10",
      "2 ÷ 1": "2 ÷ 10",
      "2 ÷ -1": "2 ÷ -10",

      "2 + 1.": "2 + 1.0",
      "2 - 1.": "2 - 1.0",
      "2 x 1.": "2 x 1.0",
      "2 x -1.": "2 x -1.0",
      "2 ÷ 1.": "2 ÷ 1.0",
      "2 ÷ -1.": "2 ÷ -1.0",

      // 最後為 =，不做處理
      "2 + 1 = ": "2 + 1 = ",

      "2 + 1 + ": "2 + 1 + 0",
      "2 + 1 - ": "2 + 1 - 0",
      "2 + 1 x ": "2 + 1 x 0",
      "2 + 1 ÷ ": "2 + 1 ÷ 0",

      // 數字開頭最多一個 0
      "2 + 1 + 0": "2 + 1 + 0",
      "2 + 1 - 0": "2 + 1 - 0",
      "2 + 1 x 0": "2 + 1 x 0",
      "2 + 1 ÷ 0": "2 + 1 ÷ 0",

      // 小數點後可加 0
      "2 + 1 + 0.": "2 + 1 + 0.0",
      "2 + 1 - 0.": "2 + 1 - 0.0",
      "2 + 1 x 0.": "2 + 1 x 0.0",
      "2 + 1 ÷ 0.": "2 + 1 ÷ 0.0",

      "2 + 1 + 0.1": "2 + 1 + 0.10",
      "2 + 1 - 0.1": "2 + 1 - 0.10",
      "2 + 1 x 0.1": "2 + 1 x 0.10",
      "2 + 1 ÷ 0.1": "2 + 1 ÷ 0.10",

      "2 + 1 + 0.0": "2 + 1 + 0.00",
      "2 + 1 - 0.0": "2 + 1 - 0.00",
      "2 + 1 x 0.0": "2 + 1 x 0.00",
      "2 + 1 ÷ 0.0": "2 + 1 ÷ 0.00",
    };

    const baseExps = Object.keys(map);
    const expected = Object.values(map);
    expect(baseExps.map((exp) => addNumber(exp, num))).toEqual(expected);
  });

  test("Add number 1-9", () => {
    const num = "2";
    const map = {
      "": "2",
      "0": "2",
      "1": "12",
      "5": "52",
      "90": "902",
      "-1": "-12",
      "-5": "-52",
      "-90": "-902",
      "1.2": "1.22",
      "1.20": "1.202",
      "-1.2": "-1.22",
      "-1.20": "-1.202",

      "2 + 1": "2 + 12",
      "2 - 1": "2 - 12",
      "2 x 1": "2 x 12",
      "2 x -1": "2 x -12",
      "2 ÷ 1": "2 ÷ 12",
      "2 ÷ -1": "2 ÷ -12",

      "2 + 1.": "2 + 1.2",
      "2 - 1.": "2 - 1.2",
      "2 x 1.": "2 x 1.2",
      "2 x -1.": "2 x -1.2",
      "2 ÷ 1.": "2 ÷ 1.2",
      "2 ÷ -1.": "2 ÷ -1.2",

      // 最後為 =，不做處理
      "2 + 1 = ": "2 + 1 = ",

      "2 + 1 + ": "2 + 1 + 2",
      "2 + 1 - ": "2 + 1 - 2",
      "2 + 1 x ": "2 + 1 x 2",
      "2 + 1 ÷ ": "2 + 1 ÷ 2",

      // 數字開頭最多一個 0
      "2 + 1 + 0": "2 + 1 + 2",
      "2 + 1 - 0": "2 + 1 - 2",
      "2 + 1 x 0": "2 + 1 x 2",
      "2 + 1 ÷ 0": "2 + 1 ÷ 2",

      // 小數點後可加 0
      "2 + 1 + 0.": "2 + 1 + 0.2",
      "2 + 1 - 0.": "2 + 1 - 0.2",
      "2 + 1 x 0.": "2 + 1 x 0.2",
      "2 + 1 ÷ 0.": "2 + 1 ÷ 0.2",

      "2 + 1 + 0.1": "2 + 1 + 0.12",
      "2 + 1 - 0.1": "2 + 1 - 0.12",
      "2 + 1 x 0.1": "2 + 1 x 0.12",
      "2 + 1 ÷ 0.1": "2 + 1 ÷ 0.12",

      "2 + 1 + 0.0": "2 + 1 + 0.02",
      "2 + 1 - 0.0": "2 + 1 - 0.02",
      "2 + 1 x 0.0": "2 + 1 x 0.02",
      "2 + 1 ÷ 0.0": "2 + 1 ÷ 0.02",
    };

    const baseExps = Object.keys(map);
    const expected = Object.values(map);
    expect(baseExps.map((exp) => addNumber(exp, num))).toEqual(expected);
  });
});
