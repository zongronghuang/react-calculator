// 基本運算
function miniCalculator(
  num1: string | number,
  operator: "+" | "-" | "x" | "÷",
  num2: string | number
) {
  const operand1 = +num1;
  const operand2 = +num2;
  const operations = {
    "+": () => operand1 + operand2,
    "-": () => operand1 - operand2,
    "x": () => operand1 * operand2,
    "÷": () => operand1 / operand2,
  };

  return operations[operator]();
}

function getLocalProduct(arr: (string | number | null)[]) {
  if (!arr.includes("x") && !arr.includes("÷")) {
    return [...arr];
  }

  const tempArr = [...arr];
  for (let i = 0; i < tempArr.length; i++) {
    const hasOperators = tempArr[i + 1] === "x" || tempArr[i + 1] === "÷";
    const isValidExp =
      tempArr[i] !== null && hasOperators && tempArr[i + 2] !== null;

    if (isValidExp) {
      tempArr[i + 2] = miniCalculator(
        tempArr[i] as string | number,
        tempArr[i + 1] as "x" | "÷",
        tempArr[i + 2] as string | number
      );
      tempArr[i] = null;
      tempArr[i + 1] = null;
    }
  }

  return tempArr.filter((n) => n !== null);
}

function getLocalSum(arr: (string | number | null)[]) {
  if (arr.length === 1) {
    return +arr[0]!;
  }

  const tempArr = [...arr];
  for (let i = 0; i < tempArr.length; i++) {
    const hasOperators = tempArr[i + 1] === "+" || tempArr[i + 1] === "-";
    const isValidExp =
      tempArr[i] !== null && hasOperators && tempArr[i + 2] !== null;

    if (isValidExp) {
      tempArr[i + 2] = miniCalculator(
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
function mathExpParser(exp: string) {
  return exp
    .trim()
    .split(" ")
    .filter((segment) => segment !== "=");
}

function isWithinBounds(value: number) {
  const upperBound = Math.pow(2, 32);
  const lowerBound = -Infinity;
  return value < upperBound && value > lowerBound;
}

function isCalculatable(exp: string) {
  return exp.includes("=");
}

function roundResult(number: number, maxNumOfDecimals: number) {
  const validNumOfDecimals =
    maxNumOfDecimals >= 0 &&
    maxNumOfDecimals <= 10 &&
    Number.isInteger(maxNumOfDecimals);

  if (!validNumOfDecimals) {
    throw new Error("maxNumOfDecimals must be an integer between 0 and 10");
  }

  let rounded = number.toFixed(maxNumOfDecimals);

  while (rounded.endsWith("0") || rounded.endsWith(".")) {
    rounded = rounded.slice(0, -1);
  }

  return rounded;
}

function calculator(exp: string) {
  if (!isCalculatable(exp)) {
    return "";
  }

  const parsed = mathExpParser(exp);
  const result = getLocalSum(getLocalProduct(parsed)) as number; // 先乘除，後加減

  // console.log({ parsed, result });

  return isWithinBounds(result) ? roundResult(result, 10) : "NOT A NUMBER";
}

export {
  miniCalculator,
  mathExpParser,
  getLocalProduct,
  getLocalSum,
  isWithinBounds,
  calculator,
  isCalculatable,
  roundResult,
};
