// 基本運算
function calculate(
  num1: string | number,
  operator: "+" | "-" | "*" | "/",
  num2: string | number
) {
  const operand1 = +num1;
  const operand2 = +num2;
  const operations = {
    "+": () => operand1 + operand2,
    "-": () => operand1 - operand2,
    "*": () => operand1 * operand2,
    "/": () => operand1 / operand2,
  };

  return operations[operator]();
}

function getLocalProduct(arr: (string | number | null)[]) {
  if (!arr.includes("*") && !arr.includes("/")) {
    return [...arr];
  }

  const tempArr = [...arr];
  for (let i = 0; i < tempArr.length; i++) {
    const hasOperators = tempArr[i + 1] === "*" || tempArr[i + 1] === "/";
    const isValidExp =
      tempArr[i] !== null && hasOperators && tempArr[i + 2] !== null;

    if (isValidExp) {
      tempArr[i + 2] = calculate(
        tempArr[i] as string | number,
        tempArr[i + 1] as "*" | "/",
        tempArr[i + 2] as string | number
      );
      tempArr[i] = null;
      tempArr[i + 1] = null;
    }
  }

  return arr.filter((n) => n !== null);
}

function getLocalSum(arr: (string | number | null)[]) {
  if (arr.length === 1) {
    return arr[0];
  }

  const tempArr = [...arr];
  for (let i = 0; i < tempArr.length; i++) {
    const hasOperators = tempArr[i + 1] === "+" || tempArr[i + 1] === "-";
    const isValidExp =
      tempArr[i] !== null && hasOperators && tempArr[i + 2] !== null;

    if (isValidExp) {
      tempArr[i + 2] = calculate(
        tempArr[i] as string | number,
        tempArr[i + 1] as "+" | "-",
        tempArr[i + 2] as string | number
      );
      tempArr[i] = null;
      tempArr[i + 1] = null;
    }
  }

  return tempArr.at(-1);
}

// 多項式運算
function parseExpressionToNumber(exp: string) {
  const arr = exp.split(" ");
  return getLocalSum(getLocalProduct(arr)); // 先乘除，後加減
}

function isLargerThanMaximum(value: number) {
  const max = Math.pow(2, 32);
  return value > max ? true : false;
}

function normalizeExpression(exp: string) {
  return exp.replaceAll("x", "*").replaceAll("÷", "/");
}

function compute(exp: string) {
  const mathExpression = normalizeExpression(exp);
  const result = parseExpressionToNumber(mathExpression) as number;

  return isLargerThanMaximum(result) ? "NUMBER TOO BIG" : result;
}

export {
  calculate,
  parseExpressionToNumber,
  getLocalProduct,
  getLocalSum,
  isLargerThanMaximum,
  normalizeExpression,
  compute,
};
