import {
  turnLastNumOpposite,
  addDecimalDot,
  addOperator,
  addNumber,
  clearAllMathExp,
  clearLastInput,
  combineMathExp,
} from "./mathExps";

describe("[Make valid math expressions]", () => {
  test("+/- turns last number opposite", () => {
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

      // 最後為 operator
      "2 + 1 = ": "2 + 1 = ",
      "2 + 1 + ": "2 + 1 + -",
      "2 + 1 - ": "2 + 1 - -",
      "2 + 1 x ": "2 + 1 x -",
      "2 + 1 ÷ ": "2 + 1 ÷ -",

      // 小數點結尾
      "2 + 1.": "2 + -1.",
      "2 + -1.": "2 + 1.",
    };

    const baseExps = Object.keys(map);
    const expected = Object.values(map);
    expect(baseExps.map((exp) => turnLastNumOpposite(exp))).toEqual(expected);
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

  test("Clear all input", () => {
    const baseExps = [
      "0",
      "1",
      "5",
      "90",
      "-1",
      "-5",
      "-90",
      "1.2",
      "1.20",
      "-1.2",
      "-1.20",
      "2 + 1",
      "2 - 1",
      "2 x 1",
      "2 x -1",
      "2 ÷ 1",
      "2 ÷ -1",
      "2 + 1.",
      "2 - 1.",
      "2 x 1.",
      "2 x -1.",
      "2 ÷ 1.",
      "2 ÷ -1.",
      "2 + 1 = ",
      "2 + 1 + ",
      "2 + 1 - ",
      "2 + 1 x ",
      "2 + 1 ÷ ",
      "2 + 1 + 0",
      "2 + 1 - 0",
      "2 + 1 x 0",
      "2 + 1 ÷ 0",
      "2 + 1 + 0.",
      "2 + 1 - 0.",
      "2 + 1 x 0.",
      "2 + 1 ÷ 0.",
      "2 + 1 + 0.1",
      "2 + 1 - 0.1",
      "2 + 1 x 0.1",
      "2 + 1 ÷ 0.1",
      "2 + 1 + 0.0",
      "2 + 1 - 0.0",
      "2 + 1 x 0.0",
      "2 + 1 ÷ 0.0",
    ];

    const expected = Array(baseExps.length).fill("0");
    expect(baseExps.map((exp) => clearAllMathExp(exp))).toEqual(expected);
  });

  test("Clear last input", () => {
    const map = {
      "0": "0",
      "1": "0",
      "-": "0",
      "-1": "-",
      "789": "78",
      "78": "7",
      "7": "0",

      "0.2": "0.",
      "0.22": "0.2",
      "-0.2": "-0.",
      "-0.": "-0",
      "-0": "-",
      "-0.22": "-0.2",
      "1.2": "1.",
      "1.22": "1.2",
      "1.222": "1.22",
      "-1.2": "-1.",
      "-1.22": "-1.2",
      "-1.222": "-1.22",

      "0.": "0",
      "1.": "1",
      "-1.": "-1",

      // operators
      "2 + 1 = ": "0",
      "2 = ": "0",

      "2 + 1 + ": "2 + 1",
      "2 + 1 - ": "2 + 1",
      "2 + 1 x ": "2 + 1",
      "2 + 1 ÷ ": "2 + 1",

      "2 + 1": "2 + ",
      "2 - 1": "2 - ",
      "2 x 1": "2 x ",
      "2 ÷ 1": "2 ÷ ",

      "2 + -1": "2 + -",
      "2 - -1": "2 - -",
      "2 x -1": "2 x -",
      "2 ÷ -1": "2 ÷ -",
    };

    const baseExps = Object.keys(map);
    const expected = Object.values(map);
    expect(baseExps.map((exp) => clearLastInput(exp))).toEqual(expected);
  });

  test("[ALL] Combine math expressions with any input", () => {
    let input = "";
    let map = {};
    let baseExps = [];
    let expected = [];

    input = "+";
    map = {
      "": "",
      "1": `1 ${input} `,
      "-1": `-1 ${input} `,
      "0": `0 ${input} `,
      "1.2": `1.2 ${input} `,
      "-1.2": `-1.2 ${input} `,

      // 最後為 .，移除 . 並加上 input
      "2 + 1.": `2 + 1 ${input} `,
      "2 - 1.": `2 - 1 ${input} `,
      "2 x 1.": `2 x 1 ${input} `,
      "2 x -1.": `2 x -1 ${input} `,
      "2 ÷ 1.": `2 ÷ 1 ${input} `,
      "2 ÷ -1.": `2 ÷ -1 ${input} `,

      // 最後為 =，不做處理
      "2 + 1 = ": "2 + 1 = ",

      // 最後為 operator，替換成新的 operator
      "2 + 1 + ": `2 + 1 ${input} `,
      "2 + 1 - ": `2 + 1 ${input} `,
      "2 + 1 x ": `2 + 1 ${input} `,
      "2 + 1 ÷ ": `2 + 1 ${input} `,
    };
    baseExps = Object.keys(map);
    expected = Object.values(map);
    expect(baseExps.map((exp) => combineMathExp(exp, input))).toEqual(expected);

    input = "-";
    map = {
      "": "",
      "1": `1 ${input} `,
      "-1": `-1 ${input} `,
      "0": `0 ${input} `,
      "1.2": `1.2 ${input} `,
      "-1.2": `-1.2 ${input} `,

      // 最後為 .，移除 . 並加上 operator
      "2 + 1.": `2 + 1 ${input} `,
      "2 - 1.": `2 - 1 ${input} `,
      "2 x 1.": `2 x 1 ${input} `,
      "2 x -1.": `2 x -1 ${input} `,
      "2 ÷ 1.": `2 ÷ 1 ${input} `,
      "2 ÷ -1.": `2 ÷ -1 ${input} `,

      // 最後為 =，不做處理
      "2 + 1 = ": "2 + 1 = ",

      // 最後為 operator，替換成新的 operator
      "2 + 1 + ": `2 + 1 ${input} `,
      "2 + 1 - ": `2 + 1 ${input} `,
      "2 + 1 x ": `2 + 1 ${input} `,
      "2 + 1 ÷ ": `2 + 1 ${input} `,
    };
    baseExps = Object.keys(map);
    expected = Object.values(map);
    expect(baseExps.map((exp) => combineMathExp(exp, input))).toEqual(expected);

    input = "x";
    map = {
      "": "",
      "1": `1 ${input} `,
      "-1": `-1 ${input} `,
      "0": `0 ${input} `,
      "1.2": `1.2 ${input} `,
      "-1.2": `-1.2 ${input} `,

      // 最後為 .，移除 . 並加上 input
      "2 + 1.": `2 + 1 ${input} `,
      "2 - 1.": `2 - 1 ${input} `,
      "2 x 1.": `2 x 1 ${input} `,
      "2 x -1.": `2 x -1 ${input} `,
      "2 ÷ 1.": `2 ÷ 1 ${input} `,
      "2 ÷ -1.": `2 ÷ -1 ${input} `,

      // 最後為 =，不做處理
      "2 + 1 = ": "2 + 1 = ",

      // 最後為 operator，替換成新的 operator
      "2 + 1 + ": `2 + 1 ${input} `,
      "2 + 1 - ": `2 + 1 ${input} `,
      "2 + 1 x ": `2 + 1 ${input} `,
      "2 + 1 ÷ ": `2 + 1 ${input} `,
    };
    baseExps = Object.keys(map);
    expected = Object.values(map);
    expect(baseExps.map((exp) => combineMathExp(exp, input))).toEqual(expected);

    input = "÷";
    map = {
      "": "",
      "1": `1 ${input} `,
      "-1": `-1 ${input} `,
      "0": `0 ${input} `,
      "1.2": `1.2 ${input} `,
      "-1.2": `-1.2 ${input} `,

      // 最後為 .，移除 . 並加上 operator
      "2 + 1.": `2 + 1 ${input} `,
      "2 - 1.": `2 - 1 ${input} `,
      "2 x 1.": `2 x 1 ${input} `,
      "2 x -1.": `2 x -1 ${input} `,
      "2 ÷ 1.": `2 ÷ 1 ${input} `,
      "2 ÷ -1.": `2 ÷ -1 ${input} `,

      // 最後為 =，不做處理
      "2 + 1 = ": "2 + 1 = ",

      // 最後為 operator，替換成新的 operator
      "2 + 1 + ": `2 + 1 ${input} `,
      "2 + 1 - ": `2 + 1 ${input} `,
      "2 + 1 x ": `2 + 1 ${input} `,
      "2 + 1 ÷ ": `2 + 1 ${input} `,
    };
    baseExps = Object.keys(map);
    expected = Object.values(map);
    expect(baseExps.map((exp) => combineMathExp(exp, input))).toEqual(expected);

    input = "=";
    map = {
      "": "",
      "1": `1 ${input} `,
      "-1": `-1 ${input} `,
      "0": `0 ${input} `,
      "1.2": `1.2 ${input} `,
      "-1.2": `-1.2 ${input} `,

      // 最後為 .，移除 . 並加上 operator
      "2 + 1.": `2 + 1 ${input} `,
      "2 - 1.": `2 - 1 ${input} `,
      "2 x 1.": `2 x 1 ${input} `,
      "2 x -1.": `2 x -1 ${input} `,
      "2 ÷ 1.": `2 ÷ 1 ${input} `,
      "2 ÷ -1.": `2 ÷ -1 ${input} `,

      // 最後為 =，不做處理
      "2 + 1 = ": "2 + 1 = ",

      // 最後為 operator，替換成新的 operator
      "2 + 1 + ": `2 + 1 ${input} `,
      "2 + 1 - ": `2 + 1 ${input} `,
      "2 + 1 x ": `2 + 1 ${input} `,
      "2 + 1 ÷ ": `2 + 1 ${input} `,
    };
    baseExps = Object.keys(map);
    expected = Object.values(map);
    expect(baseExps.map((exp) => combineMathExp(exp, input))).toEqual(expected);

    input = "+/-";
    map = {
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

      // 最後為 operator
      "2 + 1 = ": "2 + 1 = ",
      "2 + 1 + ": "2 + 1 + -",
      "2 + 1 - ": "2 + 1 - -",
      "2 + 1 x ": "2 + 1 x -",
      "2 + 1 ÷ ": "2 + 1 ÷ -",

      // 小數點結尾
      "2 + 1.": "2 + -1.",
      "2 + -1.": "2 + 1.",
    };
    baseExps = Object.keys(map);
    expected = Object.values(map);
    expect(baseExps.map((exp) => combineMathExp(exp, input))).toEqual(expected);

    input = ".";
    map = {
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
    baseExps = Object.keys(map);
    expected = Object.values(map);
    expect(baseExps.map((exp) => combineMathExp(exp, input))).toEqual(expected);

    input = "0";
    map = {
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
    baseExps = Object.keys(map);
    expected = Object.values(map);
    expect(baseExps.map((exp) => combineMathExp(exp, input))).toEqual(expected);

    input = "2";
    map = {
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
    baseExps = Object.keys(map);
    expected = Object.values(map);
    expect(baseExps.map((exp) => combineMathExp(exp, input))).toEqual(expected);

    input = "AC";
    baseExps = [
      "0",
      "1",
      "5",
      "90",
      "-1",
      "-5",
      "-90",
      "1.2",
      "1.20",
      "-1.2",
      "-1.20",
      "2 + 1",
      "2 - 1",
      "2 x 1",
      "2 x -1",
      "2 ÷ 1",
      "2 ÷ -1",
      "2 + 1.",
      "2 - 1.",
      "2 x 1.",
      "2 x -1.",
      "2 ÷ 1.",
      "2 ÷ -1.",
      "2 + 1 = ",
      "2 + 1 + ",
      "2 + 1 - ",
      "2 + 1 x ",
      "2 + 1 ÷ ",
      "2 + 1 + 0",
      "2 + 1 - 0",
      "2 + 1 x 0",
      "2 + 1 ÷ 0",
      "2 + 1 + 0.",
      "2 + 1 - 0.",
      "2 + 1 x 0.",
      "2 + 1 ÷ 0.",
      "2 + 1 + 0.1",
      "2 + 1 - 0.1",
      "2 + 1 x 0.1",
      "2 + 1 ÷ 0.1",
      "2 + 1 + 0.0",
      "2 + 1 - 0.0",
      "2 + 1 x 0.0",
      "2 + 1 ÷ 0.0",
    ];
    expected = Array(baseExps.length).fill("0");
    expect(baseExps.map((exp) => combineMathExp(exp, input))).toEqual(expected);

    input = "C";
    map = {
      "0": "0",
      "1": "0",
      "-": "0",
      "-1": "-",
      "789": "78",
      "78": "7",
      "7": "0",

      "0.2": "0.",
      "0.22": "0.2",
      "-0.2": "-0.",
      "-0.": "-0",
      "-0": "-",
      "-0.22": "-0.2",
      "1.2": "1.",
      "1.22": "1.2",
      "1.222": "1.22",
      "-1.2": "-1.",
      "-1.22": "-1.2",
      "-1.222": "-1.22",

      "0.": "0",
      "1.": "1",
      "-1.": "-1",

      // operators
      "2 + 1 = ": "0",
      "2 = ": "0",

      "2 + 1 + ": "2 + 1",
      "2 + 1 - ": "2 + 1",
      "2 + 1 x ": "2 + 1",
      "2 + 1 ÷ ": "2 + 1",

      "2 + 1": "2 + ",
      "2 - 1": "2 - ",
      "2 x 1": "2 x ",
      "2 ÷ 1": "2 ÷ ",

      "2 + -1": "2 + -",
      "2 - -1": "2 - -",
      "2 x -1": "2 x -",
      "2 ÷ -1": "2 ÷ -",
    };
    baseExps = Object.keys(map);
    expected = Object.values(map);
    expect(baseExps.map((exp) => combineMathExp(exp, input))).toEqual(expected);
  });
});
