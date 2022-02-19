import { useEffect } from "react";

const useKeyboardInput = ({
  keyinHandler,
  clearCurrentInput,
  getComputedValue,
  formula,
}) => {
  console.log("use custom hook");

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

    switch (keyText) {
      case "Clear":
      case "Backspace":
        clearCurrentInput();
        break;
      case "=":
      case "Enter":
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
        keyinHandler(keyText);
        break;
      default:
        console.log("[Error] Unwanted key");
        break;
    }
  };

  // 數字鍵盤 0-9 & 一般鍵盤 0-9
  // const keyinHandlerForKeyboard = (e) => {
  //   let keyText = e.key;
  //   const acceptedKeys = [
  //     "1",
  //     "2",
  //     "3",
  //     "4",
  //     "5",
  //     "6",
  //     "7",
  //     "8",
  //     "9",
  //     "0",
  //     ".",
  //     "+",
  //     "-",
  //     "*",
  //     "/",
  //     "=",
  //     "Enter",
  //     "Clear",
  //     "Backspace",
  //   ];

  //   if (keyText === "*")
  //     if (!acceptedKeys.includes(keyText)) {
  //       // convert keyText 變成 keyinHandler 可讀

  //       return;
  //     }
  //   keyinHandler(keyText);
  // };

  // // 數字鍵盤 Clear 和 一般鍵盤 backspace
  // const clearCurrentInputForKeyboard = (e) => {
  //   console.log("for keyboard =========");
  //   if (e.key !== "Clear" && e.key !== "Backspace") {
  //     return;
  //   }
  //   clearCurrentInput();
  // };

  // 數字鍵盤 =  & 一般鍵盤 = & 一般鍵盤 Enter
  // const getComputedValueForKeyboard = (e) => {
  //   if (e.key !== "Enter" && e.key !== "=") {
  //     return;
  //   }
  //   getComputedValue(formula);
  // };

  useEffect(() => {
    window.addEventListener("keydown", keydownHandler);

    return () => {
      window.removeEventListener("keydown", keydownHandler);
    };
  }, [formula]);
};

export default useKeyboardInput;
