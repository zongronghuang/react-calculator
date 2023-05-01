// keyboardEvent.key : 對應字串
const shortcutMap: { [key: string]: string } = {
  "0": "0",
  "1": "1",
  "2": "2",
  "3": "3",
  "4": "4",
  "5": "5",
  "6": "6",
  "7": "7",
  "8": "8",
  "9": "9",
  ".": ".",
  "+": "+",
  "-": "-",
  "*": "x",
  "/": "÷",
  "=": "=",
  "Enter": "=",
  "Backspace": "C",
  "Escape": "C",
  "Clear": "C",
};

export default function keyToText(key: string, altKey: boolean) {
  // console.log({ altKey, key });
  const isACPressed = altKey && key === "Ç";
  const isNegatorPressed = altKey && key === "-";

  switch (true) {
    case isACPressed:
      return "AC";
    case isNegatorPressed:
      return "+/-";
    default:
      return shortcutMap[key] ? shortcutMap[key] : "";
  }
}
