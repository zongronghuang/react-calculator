import { useContext, useEffect } from "react";
import { act } from "react-dom/test-utils";
import "@testing-library/jest-dom/extend-expect"; // 重要!!
import {
  render,
  screen,
  fireEvent,
  getByText,
  getByRole,
  getAllByRole,
} from "@testing-library/react";
import {
  CalculatorContextProvider,
  CalculatorContext,
} from "../../context/CalculatorContext";
import Button from "./Button";

describe("[Button]", () => {
  test("Should display received value", () => {
    const mockValue = "t";
    render(<Button value={mockValue} />);
    expect(screen.getByText(mockValue)).toBeInTheDocument();
  });
});
