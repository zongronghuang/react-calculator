function turnLastNumOpposite(baseExp: string) {
  if (!baseExp || baseExp.includes("=")) {
    return baseExp;
  }

  const operators = ["+", "-", "x", "÷"];
  const segments = baseExp.trim().split(" ");
  const lastSegment = segments.at(-1) as string;
  if (operators.includes(lastSegment)) {
    return baseExp + "-";
  }

  // 最後一項數字以小數點結尾 vs 結尾非小數點
  segments[segments.length - 1] = lastSegment.endsWith(".")
    ? `${-parseFloat(lastSegment)}.`
    : `${-parseFloat(lastSegment)}`;
  return segments.join(" ");
}

function addDecimalDot(baseExp: string) {
  if (!baseExp) {
    return baseExp;
  }

  const segments = baseExp.trim().split(" ");
  const lastSegment = segments.at(-1) as string;
  const operators = ["+", "-", "x", "÷", "="];

  if (operators.includes(lastSegment) || lastSegment.includes(".")) {
    return baseExp;
  }

  segments[segments.length - 1] = lastSegment + ".";
  return segments.join(" ");
}

function addOperator(baseExp: string, operator: string) {
  if (!baseExp || baseExp.includes("=")) {
    return baseExp;
  }

  const segments = baseExp.trim().split(" ");
  const lastSegment = segments.at(-1) as string;
  const operators = ["+", "-", "x", "÷", "="];

  if (operators.includes(lastSegment)) {
    segments[segments.length - 1] = operator;
    return [...segments, ""].join(" ");
  }

  if (lastSegment.endsWith(".")) {
    const dotlessSegment = lastSegment.slice(0, -1);
    segments[segments.length - 1] = dotlessSegment;
  }

  return [...segments, operator, ""].join(" ");
}

function addNumber(baseExp: string, input: string) {
  if (!baseExp) {
    return input;
  }

  const segments = baseExp.trim().split(" ");
  const lastSegment = segments.at(-1) as string;

  if (lastSegment === "=") {
    return baseExp;
  }

  if (lastSegment === "0" && input === "0") {
    return baseExp;
  }

  if (lastSegment === "0" && /[1-9]/.test(input)) {
    segments[segments.length - 1] = input;
    return segments.join(" ");
  }

  return baseExp + input;
}

function clearAllMathExp(baseExp: string) {
  return "0";
}

function clearLastInput(baseExp: string) {
  if (baseExp.includes("=")) {
    return "0";
  }

  if (baseExp.length === 1) {
    return "0";
  }

  const endsWithOperator =
    baseExp.endsWith(" + ") ||
    baseExp.endsWith(" - ") ||
    baseExp.endsWith(" x ") ||
    baseExp.endsWith(" ÷ ");

  return endsWithOperator ? baseExp.slice(0, -3) : baseExp.slice(0, -1);
}

export {
  turnLastNumOpposite,
  addDecimalDot,
  addOperator,
  addNumber,
  clearAllMathExp,
  clearLastInput,
};

export default function combineMathExp(baseExp: string, input: string) {
  switch (input) {
    case "AC":
      return clearAllMathExp(baseExp);
    case "C":
      return clearLastInput(baseExp);
    case "+":
    case "-":
    case "x":
    case "÷":
    case "=":
      return addOperator(baseExp, input);
    case "+/-":
      return turnLastNumOpposite(baseExp);
    case ".":
      return addDecimalDot(baseExp);
    default:
      return addNumber(baseExp, input);
  }
}
