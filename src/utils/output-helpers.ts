const isLargerThanMaximum = (value) => {
  const maximumValue = Math.pow(2, 32);
  return value > maximumValue ? true : false;
};

const removeTrailingDecimalZeros = (string) => {
  const splitString = string.split(".");
  const integer = splitString[0];
  const decimalArr = splitString[1].split("");

  while (decimalArr[decimalArr.length - 1] === "0") {
    decimalArr.pop();
    if (decimalArr.length === 0) {
      break;
    }
  }

  return decimalArr.length === 0
    ? integer
    : `${integer}.${decimalArr.join("")}`;
};

const computeValueFromFormula = (formula) => {
  // 清除 formula 中不需要的字元並轉換字元
  // replace 方法用 RegExp + flag g 才會全部取代，否則只取代一次
  const processedFormula = formula
    .replace(/\s=\s$/, "")
    .replace(/x/g, "*")
    .replace(/÷/g, "/");
  const convertedValue = eval(processedFormula);

  // too big
  if (isLargerThanMaximum(convertedValue)) {
    return "NUMBER TOO BIG";
  }
  // NaN
  if (Number.isNaN(convertedValue)) {
    return "NOT A NUMBER";
  }

  const preciseValueString = convertedValue.toPrecision(10);

  return preciseValueString.includes(".")
    ? removeTrailingDecimalZeros(preciseValueString)
    : preciseValueString;
};

export { computeValueFromFormula };
