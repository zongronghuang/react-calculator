import userEvent from "@testing-library/user-event";
import Calculator from "../views/Calculator";
import keyToText from "./shortcuts";

describe("[Transform keyboard inputs to text]", () => {
  test("Turn hit keys to text", () => {
    const data: [string, boolean][] = Array.from({ length: 10 }, (_, i) => [
      `${i}`,
      Math.random() >= 0.5,
    ]);
    const expected = Array.from({ length: 10 }, (_, i) => `${i}`);
    expect(data.map(([key, altKey]) => keyToText(key, altKey))).toEqual(
      expected
    );

    const data1: {
      key: string;
      altKey: boolean;
      expected: string;
    }[] = [
      {
        key: ".",
        altKey: true,
        expected: ".",
      },
      {
        key: "+",
        altKey: true,
        expected: "+",
      },
      {
        key: "-",
        altKey: false,
        expected: "-",
      },
      {
        key: "*",
        altKey: true,
        expected: "x",
      },
      {
        key: "/",
        altKey: true,
        expected: "÷",
      },
      {
        key: "=",
        altKey: true,
        expected: "=",
      },
      {
        key: "Enter",
        altKey: true,
        expected: "=",
      },
      {
        key: "Backspace",
        altKey: true,
        expected: "C",
      },
      {
        key: "Clear",
        altKey: true,
        expected: "C",
      },
      {
        key: "Escape",
        altKey: true,
        expected: "C",
      },
      {
        key: "Ç",
        altKey: true,
        expected: "AC",
      },
      {
        key: "Ç",
        altKey: false,
        expected: "",
      },
      {
        key: "-",
        altKey: true,
        expected: "+/-",
      },
    ];

    const expected1 = data1.map((data) => data.expected);
    expect(data1.map(({ key, altKey }) => keyToText(key, altKey))).toEqual(
      expected1
    );

    const data2 = [
      "a",
      "b",
      "c",
      "x",
      "y",
      "z",
      "&",
      "^",
      "%",
      "#",
      "@",
      "!",
      "?",
    ];
    const expected2 = data2.map((item) => "");
    expect(data2.map((item) => keyToText(item, true))).toEqual(expected2);
    expect(data2.map((item) => keyToText(item, false))).toEqual(expected2);
  });
});
