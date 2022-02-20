import { useEffect } from "react";
import { normalizeOperatorsHelper } from "../utils/input.helpers";

const useKeyboardInput = ({
  keyinHandler,
  clearCurrentInput,
  getComputedValue,
  formula,
}) => {
  console.log("use custom hook", { formula });

  const keydownHandler = (e) => {
    const keyText = e.key;
    const acceptedKeys = [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "0",
      ".",
      "+",
      "-",
      "*",
      "/",
      "=",
      "Enter",
      "Clear",
      "Backspace",
    ];
    if (!acceptedKeys.includes(keyText)) {
      return;
    }
    console.log("-----", { keyText });
    switch (keyText) {
      case "Clear":
      case "Backspace":
        console.log("[Custom] Clear");
        clearCurrentInput();
        break;
      case "=":
      case "Enter":
        console.log("[Custom] Equal", { formula });
        keyinHandler(normalizeOperatorsHelper(keyText));
        getComputedValue(formula);
        break;
      case "+":
      case "-":
      case "*":
      case "/":
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
      case ".":
        console.log("[Custom] Equal");
        keyinHandler(normalizeOperatorsHelper(keyText));
        break;
      default:
        console.log("[Error] Unwanted key");
        break;
    }
  };

  useEffect(() => {
    console.log("[Custom] Add", { formula });
    window.addEventListener("keydown", keydownHandler);

    return () => {
      console.log("[Custom] Remove", { formula });
      window.removeEventListener("keydown", keydownHandler);
    };
  }, []);
};

export default useKeyboardInput;
