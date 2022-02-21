import { useEffect } from "react";
import { normalizeOperatorsHelper } from "../utils/input.helpers";

const useKeyboardInput = ({
  keyinHandler,
  clearCurrentInput,
  getComputedValue,
  formula,
}) => {
  console.log("use custom hook");

  const keydownHandler = (e) => {
    console.log("[GET Key]", e.key);
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

    switch (keyText) {
      case "Clear":
      case "Backspace":
        clearCurrentInput();
        break;
      case "=":
      case "Enter":
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
        console.log("[Custom] digits & operators");
        keyinHandler(normalizeOperatorsHelper(keyText));
        // if (keyText.trim() === "=") {
        //   if (!formula.endsWith(" ") && !formula.endsWith(".")) {
        //     getComputedValue(formula);
        //   } // 結尾不是 operator 也不是小數點，才可以計算值
        // }
        break;
      default:
        console.log("[Error] Unwanted key");
        break;
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", keydownHandler);

    return () => {
      window.removeEventListener("keydown", keydownHandler);
    };
  }, [formula]);
};

export default useKeyboardInput;
