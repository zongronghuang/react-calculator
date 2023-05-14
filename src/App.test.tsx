import React from "react";
import "@testing-library/jest-dom/extend-expect"; // 重要!!
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  test("Calculator is mounted", () => {
    render(<App />);
    const app = document.querySelector(".calculator");
    expect(app).toBeInTheDocument();
  });

  test("Backdrop is mounted", () => {
    render(<App />);
    const backdrop = screen.getByTestId(/backdrop/i);
    expect(backdrop).toBeInTheDocument();
  });
});
