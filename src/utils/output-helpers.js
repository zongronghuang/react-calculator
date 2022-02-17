const isLargerThanMaximum = (value) => {
  const maximumValue = Math.pow(2, 32);
  return value > maximumValue ? true : false;
};

const computeValueFromFormula = (formula) => {
  // 清除 formula 中不需要的字元並轉換字元
  const processedFormula = formula
    .replace(" = ", "")
    .replace("x", "*")
    .replace("÷", "/");
  const convertedValue = eval(processedFormula);

  // too big
  if (isLargerThanMaximum(convertedValue)) {
    return "NUMBER TOO BIG";
  }
  // NaN
  if (Number.isNaN(convertedValue)) {
    return "NOT A NUMBER";
  }
  return convertedValue;
};

export { computeValueFromFormula };
