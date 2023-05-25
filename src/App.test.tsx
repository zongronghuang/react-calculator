import React from "react";
import "@testing-library/jest-dom/extend-expect"; // 重要!!
import userEvent from "@testing-library/user-event"; // 重要!!
import { getByTestId, render, screen } from "@testing-library/react";
import App from "./App";

describe("[App] Should have required components", () => {
  beforeEach(() => {
    render(<App />);
  });

  test("Calculator should be mounted", () => {
    const app = document.querySelector(".calculator");
    expect(app).toBeInTheDocument();
  });

  test("Backdrop should be mounted", () => {
    const backdrop = screen.getByTestId(/backdrop/i);
    expect(backdrop).toBeInTheDocument();
  });

  test("Should have a math expression display", () => {
    const mathExpDisplay = document.querySelector(".mathExp");
    expect(mathExpDisplay).toBeInTheDocument();
  });

  test("Should have a result display", () => {
    const resultDisplay = document.querySelector(".result");
    expect(resultDisplay).toBeInTheDocument();
  });

  test("Should have 19 buttons", () => {
    const buttons = document.querySelectorAll("button");
    expect(buttons).toHaveLength(19);
  });

  test("Should have 10 number buttons and a decimal dot button", () => {
    const numberButtons = screen.getAllByText(
      (content, element) =>
        /[0-9.]/.test(content) && element?.tagName === "BUTTON"
    );

    expect(numberButtons).toHaveLength(11);
  });

  test("Should have 5 math operator buttons", () => {
    const mathOperatorButtons = screen.getAllByText(
      (content, element) =>
        /[\+\-\x\÷\=]/.test(content) &&
        content !== "+/-" &&
        element?.tagName === "BUTTON"
    );

    expect(mathOperatorButtons).toHaveLength(5);
  });

  test("Should have 3 special buttons", () => {
    const specialButtonTexts = ["C", "AC", "+/-"];
    const specialButtons = screen.getAllByText(
      (content, element) =>
        specialButtonTexts.includes(content) && element?.tagName === "BUTTON"
    );

    expect(specialButtons).toHaveLength(3);
  });
});

describe("[App] Should have default settings", () => {
  beforeEach(() => {
    render(<App />);
  });

  test("Calculator should be draggable", () => {
    const calculator = document.querySelector(".calculator-container");
    expect(calculator).toHaveAttribute("draggable", "true");
  });

  test("Backdrop should not be draggable", () => {
    const backdrop = screen.getByTestId("backdrop");
    expect(backdrop).not.toHaveAttribute("draggable", "true");
  });

  test("Math expression display should default to '0'", () => {
    const mathExpDisplay = document.querySelector(".mathExp");
    expect(mathExpDisplay?.textContent).toBe("0");
  });

  test("Result display should default to '0'", () => {
    const resultDisplay = document.querySelector(".result");
    expect(resultDisplay?.textContent).toBe("0");
  });
});

describe("[App] Should work with clicks", () => {
  beforeEach(() => {
    render(<App />);
  });

  test("Should show addition expression correctly on the display", () => {
    userEvent.click(screen.getByText("1"));
    userEvent.click(screen.getByText("+"));
    userEvent.click(screen.getByText("2"));

    const mathExpDisplay = document.querySelector(".mathExp");
    expect(mathExpDisplay).toHaveTextContent("1 + 2");
  });

  test("Should show subtraction expression correctly on the display", () => {
    userEvent.click(screen.getByText("1"));
    userEvent.click(screen.getByText("-"));
    userEvent.click(screen.getByText("2"));

    const mathExpDisplay = document.querySelector(".mathExp");
    expect(mathExpDisplay).toHaveTextContent("1 - 2");
  });

  test("Should show multiplication expression correctly on the display", () => {
    userEvent.click(screen.getByText("1"));
    userEvent.click(screen.getByText("x"));
    userEvent.click(screen.getByText("2"));

    const mathExpDisplay = document.querySelector(".mathExp");
    expect(mathExpDisplay).toHaveTextContent("1 x 2");
  });

  test("Should show division expression correctly on the display", () => {
    userEvent.click(screen.getByText("1"));
    userEvent.click(screen.getByText("÷"));
    userEvent.click(screen.getByText("2"));

    const mathExpDisplay = document.querySelector(".mathExp");
    expect(mathExpDisplay).toHaveTextContent("1 ÷ 2");
  });

  test("Should show result when the input ends with the equal sign", () => {
    userEvent.click(screen.getByText("1"));
    userEvent.click(screen.getByText("x"));
    userEvent.click(screen.getByText("2"));
    userEvent.click(screen.getByText("="));

    const resultDisplay = document.querySelector(".result");
    expect(resultDisplay).toHaveTextContent("2");
  });

  test("Should show error when the result is out of bounds", () => {
    userEvent.click(screen.getByText("1"));
    userEvent.click(screen.getByText("÷"));
    userEvent.click(
      screen.getByText(
        (content, element) => content === "0" && element?.tagName === "BUTTON"
      )
    );
    userEvent.click(screen.getByText("="));

    const resultDisplay = document.querySelector(".result");
    expect(resultDisplay).toHaveTextContent("NOT A NUMBER");
  });

  test("Should correctly calculate a complex math expression made of positive numbers", () => {
    userEvent.click(screen.getByText("1"));
    userEvent.click(screen.getByText("x"));
    userEvent.click(screen.getByText("2"));
    userEvent.click(screen.getByText("+"));
    userEvent.click(screen.getByText("3"));
    userEvent.click(screen.getByText("="));

    const resultDisplay = document.querySelector(".result");
    expect(resultDisplay).toHaveTextContent("5");
  });

  test("Should correctly calculate a complex math expression made of negative numbers", () => {
    userEvent.click(screen.getByText("1"));
    userEvent.click(screen.getByText("x"));
    userEvent.click(screen.getByText("+/-"));
    userEvent.click(screen.getByText("2"));
    userEvent.click(screen.getByText("+"));
    userEvent.click(screen.getByText("3"));
    userEvent.click(screen.getByText("+/-"));
    userEvent.click(screen.getByText("="));

    const resultDisplay = document.querySelector(".result");
    expect(resultDisplay).toHaveTextContent("-5");
  });

  test("Should remove last input when 'C' is clicked", () => {
    userEvent.click(screen.getByText("1"));
    userEvent.click(screen.getByText("+"));
    userEvent.click(screen.getByText("2"));
    userEvent.click(screen.getByText((content) => content === "C"));

    const mathExpDisplay = document.querySelector(".mathExp");
    expect(mathExpDisplay).toHaveTextContent("1 +");
  });

  test("Should reset the math expression and the result to '0' when 'AC' is clcked", () => {
    userEvent.click(screen.getByText("1"));
    userEvent.click(screen.getByText("x"));
    userEvent.click(screen.getByText("2"));
    userEvent.click(screen.getByText("="));
    userEvent.click(screen.getByText("AC"));

    const resultDisplay = document.querySelector(".result");
    expect(resultDisplay).toHaveTextContent("0");

    const mathExpDisplay = document.querySelector(".mathExp");
    expect(mathExpDisplay).toHaveTextContent("0");
  });
});

describe("[App] Should work with key presses", () => {
  beforeEach(() => {
    render(<App />);
  });

  test("Should display a math expression, correctly and properly formatted", () => {
    userEvent.keyboard("1+1=");

    const mathExpDisplay = document.querySelector(".mathExp");
    expect(mathExpDisplay).toHaveTextContent("1 + 1 =");
  });

  test("Should calculate positve numbers correctly", () => {
    userEvent.keyboard("1+1=");

    const resultDisplay = document.querySelector(".result");
    expect(resultDisplay).toHaveTextContent("2");
  });

  test("Should calculate negative numbers correctly", () => {
    userEvent.keyboard("1*{alt}-2=");

    const resultDisplay = document.querySelector(".result");
    expect(resultDisplay).toHaveTextContent("-2");
  });

  test("A pressed key should have an active class", () => {
    userEvent.keyboard("1");

    const targetButton = screen.getByText(
      (content, element) => content === "1" && element?.tagName === "BUTTON"
    );
    expect(targetButton.classList).toContain("active");
  });

  test("Should clear last input with 'C'", () => {
    userEvent.keyboard("1+1{backspace}");

    const mathExpDisplay = document.querySelector(".mathExp");
    expect(mathExpDisplay).toHaveTextContent("1 +");
  });

  test("Should clear both displays with 'C' when a math expression is calculated", () => {
    userEvent.keyboard("1+1={backspace}");

    const resultDisplay = document.querySelector(".result");
    const mathExpDisplay = document.querySelector(".mathExp");
    expect(resultDisplay).toHaveTextContent("0");
    expect(mathExpDisplay).toHaveTextContent("0");
  });

  test("Should clear both displays with 'AC'", () => {
    userEvent.keyboard("{alt}Ç");

    const resultDisplay = document.querySelector(".result");
    const mathExpDisplay = document.querySelector(".mathExp");
    expect(resultDisplay).toHaveTextContent("0");
    expect(mathExpDisplay).toHaveTextContent("0");
  });
});
