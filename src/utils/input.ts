function combineMathExp(baseExp: string, input: string) {
  // 結尾為 = 時，不可再加任何東西
  if (baseExp.includes("=")) {
    return baseExp;
  }

  switch (input) {
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

function turnLastNumOpposite(baseExp: string) {
  if (!baseExp) {
    return baseExp;
  }

  const operators = ["+", "-", "x", "÷", "="];
  const segments = baseExp.trim().split(" ");
  const lastSegment = segments.at(-1) as string;
  if (operators.includes(lastSegment)) {
    return baseExp;
  }

  segments[segments.length - 1] = `${-parseFloat(lastSegment)}`;
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
  if (!baseExp) {
    return baseExp;
  }

  const segments = baseExp.trim().split(" ");
  const lastSegment = segments.at(-1) as string;
  const operators = ["+", "-", "x", "÷", "="];

  if (lastSegment === "=") {
    return baseExp;
  }

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

export {
  turnLastNumOpposite,
  addDecimalDot,
  addOperator,
  addNumber,
  combineMathExp,
};
