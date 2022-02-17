const computeValueFromFormula = (formula) => {
  // 清除 formula 中不需要的字元
  // 去除最後的 =
  // 把 x 換成 *
  // 把 ÷ 換成 /

  const processedFormula = formula
    .replace(" = ", "")
    .replace("×", "*")
    .replace("÷", "/");

  const a = processedFormula.valueOf();

  console.log({ a }, eval(a));
  //
};

const isLargerThanMaximum = (value) => {
  const maximumValue = Math.pow(2, 32);

  return value > maximumValue ? true : false;
};

export { computeValueFromFormula, isLargerThanMaximum };
