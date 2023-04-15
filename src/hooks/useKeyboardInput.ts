import { useEffect } from "react";
import { normalizeOperatorsHelper } from "../utils/input";

type Params = {
  keyinHandler: (btnText: string) => void;
  clearCurrentInput: () => void;
  mathExp: string;
};

const useKeyboardInput = ({
  keyinHandler,
  clearCurrentInput,
  mathExp,
}: Params) => {
  console.log("use custom hook");

  const keydownHandler = (e: KeyboardEvent) => {
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
        //   if (!mathExp.endsWith(" ") && !mathExp.endsWith(".")) {
        //     getComputedValue(mathExp);
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
  }, [mathExp]);
};

export default useKeyboardInput;
