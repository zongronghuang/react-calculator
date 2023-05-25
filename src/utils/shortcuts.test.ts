import userEvent from "@testing-library/user-event";
import Calculator from "../views/Calculator";
import keyToText from "./shortcuts";

describe("[Keyboard shortcuts]", () => {
  test("Should output numbers, not affected by alt keys", () => {
    const data: [string, boolean][] = Array.from({ length: 10 }, (_, i) => [
      `${i}`,
      Math.random() >= 0.5,
    ]);
    const expected = Array.from({ length: 10 }, (_, i) => `${i}`);
    expect(data.map(([key, altKey]) => keyToText(key, altKey))).toEqual(
      expected
    );
  });

  test("Should output math operators or clear outputs, according to alt keys", () => {
    const data: {
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

    const expected = data.map((data) => data.expected);
    expect(data.map(({ key, altKey }) => keyToText(key, altKey))).toEqual(
      expected
    );
  });

  test("Calculator ignore irrelevant keys", () => {
    const irrelevantKeys = [
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
    const expected = irrelevantKeys.map((item) => "");
    expect(irrelevantKeys.map((item) => keyToText(item, true))).toEqual(
      expected
    );
    expect(irrelevantKeys.map((item) => keyToText(item, false))).toEqual(
      expected
    );
  });
});
