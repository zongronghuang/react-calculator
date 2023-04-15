type Keys = {
  [key: string]: string;
};

const clearCurrentInputHelper = (formula: string) => {
  const splitFormula = formula.split(" ");
  const lastItemId = splitFormula.length - 1;
  const lastItem = splitFormula[lastItemId];
  let newFormula = "";

  // 最後一項是數字字串
  if (lastItem !== "") {
    newFormula = splitFormula.reduce((base, item, id) => {
      return id === lastItemId ? base : `${base}${item} `;
    }, "");
  }

  // 最後一項是 ''，代表 formula 是以 operator 結束
  if (lastItem === "") {
    newFormula = splitFormula
      .reduce((base, item, id) => {
        return id >= lastItemId - 1 ? base : `${base}${item} `;
      }, "")
      .trimEnd();
  }
  console.log("clearnCurrentInputHelper", { newFormula });
  return newFormula ? newFormula : "0";
};

const negateLastNumberHelper = (formula: string) => {
  const isOneZero = formula === "0";
  const endsWithSpaceZero = formula.endsWith(" 0");
  const endsWithNegator = formula.endsWith("-");
  const endsWithEqual = formula.endsWith(" = ");
  const endsWithZeroDecimal = new RegExp(/0\.0*$/).test(formula);
  const endsWithOperator = new RegExp(/\s[+x÷-]\s$/).test(formula);

  const cannotNegateLastItem =
    isOneZero ||
    endsWithSpaceZero ||
    endsWithZeroDecimal ||
    endsWithEqual ||
    endsWithNegator;

  if (cannotNegateLastItem) {
    return formula;
  }

  if (endsWithOperator) {
    return formula + "-";
  }

  // 結尾為非零的數字，非零的數字做成相反數
  if (!endsWithOperator) {
    const splitFormula = formula.split(" ");
    const lastItem = splitFormula[splitFormula.length - 1];
    const negatedNumberString = (-Number(lastItem)).toString();

    splitFormula.pop();
    splitFormula.push(negatedNumberString);
    return splitFormula.join(" ");
  }
};

const keyinHelper = (formula: string, btnText: string) => {
  console.log({ formula, btnText });

  const endsWithDecimalDot = formula.endsWith(".");
  const endsWithOperator = new RegExp(/\s[+x÷-]\s$/).test(formula);
  const endsWithNegator = formula.endsWith("-");
  const endsWithSpaceZero = formula.endsWith(" 0");
  const hasOnlyOneZero = formula.length === 1 && formula[0] === "0";
  const endsWithEqual = formula.endsWith(" = ");
  const endsWithDecimalNumber = new RegExp(/\.\d+$/).test(formula);

  switch (btnText) {
    case ".":
      const cannotAddDecimalDot =
        endsWithDecimalNumber ||
        endsWithDecimalDot ||
        endsWithOperator ||
        endsWithEqual;
      console.log("keyinHelper [.]", { formula });
      return cannotAddDecimalDot ? formula : `${formula}${btnText}`;
    case " ÷ ":
    case " - ":
    case " + ":
    case " x ":
    case " = ":
      const cannotAddOperator =
        endsWithDecimalDot ||
        endsWithOperator ||
        endsWithEqual ||
        endsWithNegator;
      return cannotAddOperator ? formula : `${formula}${btnText}`;
    case "0":
      if (endsWithEqual) {
        return btnText;
      }

      const cannotAddZero = hasOnlyOneZero || endsWithSpaceZero;
      console.log("keyinHelper [0]", { formula });
      return cannotAddZero ? formula : `${formula}${btnText}`;
    default:
      // 輸入 1-9 字元
      console.log("keyinHelper [default]", { formula });
      if (endsWithEqual) {
        return btnText;
      }

      if (endsWithSpaceZero) {
        const splitFormula = formula.split(" ");
        splitFormula[splitFormula.length - 1] = btnText;
        return splitFormula.join(" ");
      }
      return hasOnlyOneZero ? btnText : `${formula}${btnText}`;
  }
};

const normalizeOperatorsHelper = (keyText: string) => {
  const keyMappings: Keys = {
    "=": " = ",
    Enter: " = ",
    "+": " + ",
    "-": " - ",
    "*": " x ",
    "/": " ÷ ",
  };

  console.log("[Normalize]", { keyText, display: keyMappings[keyText] });
  return keyMappings[keyText] ? keyMappings[keyText] : keyText;
};

function combineMathExp(prevExp: string, input: string) {
  const operators = ["+", "-", "x", "÷", "="];
  const exp = prevExp.trim();
  const finalChar = exp.at(-1) as string;
  const lastNum = exp.split(" ").at(-1) as string;

  // 結尾為 = 時，不可再加任何東西
  if (finalChar === "=") {
    return prevExp;
  }

  // 負數
  if (input === "+/-") {
    if (operators.includes(finalChar)) {
      return prevExp;
    }
    return `${-parseFloat(lastNum)}`;
  }

  // 數字開頭不可為 00+
  const startsWithZero =
    input === "0" && !lastNum?.includes(".") && lastNum?.startsWith("0");
  if (startsWithZero) {
    return prevExp;
  }

  // 不可兩個 operator (除了 -)；要以新 operator 取代舊 operator
  const hasSerialOperators =
    input !== "-" && operators.includes(input) && operators.includes(finalChar);
  if (hasSerialOperators) {
    return exp.slice(0, -2) + normalizeInput(input);
  }

  // 不可 . operator
  const hasOperatorWithDot = finalChar === "." && operators.includes(input);
  if (hasOperatorWithDot) {
    return prevExp;
  }

  // 不可 operator + . || 不可 . .
  const cannotAddDecimalDot =
    (input === "." && operators.includes(finalChar)) ||
    (input === "." && finalChar === ".");
  if (cannotAddDecimalDot) {
    return prevExp;
  }

  return prevExp + normalizeInput(input);
}

function normalizeInput(input: string) {
  const operators = ["+", "-", "x", "÷", "="];
  return operators.includes(input) ? " " + input + " " : input;
}

export {
  clearCurrentInputHelper,
  negateLastNumberHelper,
  keyinHelper,
  normalizeOperatorsHelper,
  combineMathExp,
  normalizeInput,
};
