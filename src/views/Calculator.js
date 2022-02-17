import { useState } from "react";
import styled from "@emotion/styled";

import Display from "../components/Display";
import NumberButton from "../components/NumberButton";
import MathOperatorButton from "../components/MathOperatorButton";
import ControlButton from "../components/ControlButton";

const digits = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0, "."];
const mathOperators = [
  ["division", " \u00f7 "],
  ["multiplication", " \u00d7 "],
  ["minus", " \u2212 "],
  ["plus", " \u002b "],
  ["equal", "\u003d"],
];
const controls = ["C", "AC", "\u00b1"];

const CalculatorJSX = ({ className }) => {
  const [formula, setFormula] = useState("0");
  // 按下 C 或 AC 後，回到初始狀態 isFirstUse = true
  // 按下數字鍵和運算鍵，isFirstUse = false
  const [isFirstUse, setIsFirstUse] = useState(true);

  const eraseKeyin = () => {
    console.log("erase keyin");
    setFormula("0");
    setIsFirstUse(true);
  };

  const keyinHandler = (btnText) => {
    console.log({ btnText });
    if (btnText === "=") {
      return;
    }

    setFormula((prevFormula) => {
      switch (btnText) {
        case ".":
          // 處理使用者第一次就按 '.' 或第一次連續按 '.' 的狀況
          if (isFirstUse || prevFormula === "0.") {
            setIsFirstUse(false);
            return "0.";
          }
          // 處理正常輸入後，連續按 '.' 的狀況 (例如 1.23....)
          if (prevFormula.includes(".")) {
            return prevFormula;
          }
        case "0":
          // 處理使用者第一次就按 '0' 或第一次連續按 '0' 的狀況
          if (isFirstUse) {
            return "0";
          }
        default:
          // 符合預期的輸入行為
          setIsFirstUse(false);
          // if (btnText === '=') {console.log('calculate!')}
          return `${prevFormula}${btnText}`;
      }
    });
  };

  return (
    <div className={`${className} calculator`}>
      {console.log("[Calculator] render")}

      {/* 算式和算數結果顯示區域 */}
      <div className="calculator--displays">
        {console.log("[Display] render")}
        <Display content={formula} type="formula"></Display>
        <Display type="result"></Display>
      </div>

      {/* 鍵盤區域 */}
      <div className="calculator--keypad">
        <div className="keypad--controls" onClick={eraseKeyin}>
          {controls.map((control, id) => (
            <ControlButton key={`control-${id}`} value={`${control}`} />
          ))}
          {console.log("[Keypad Controls] render")}
        </div>

        <div
          className="keypad--numbers"
          onClick={(e) => keyinHandler(e.target.value)}
        >
          {digits.map((digit, id) => (
            <NumberButton key={`digit-${id}`} value={digit} />
          ))}
          {console.log("[Keypad Numbers] render")}
        </div>

        <div
          className="keypad--operators"
          onClick={(e) => keyinHandler(e.target.value)}
        >
          {mathOperators.map((operator, id) => (
            <MathOperatorButton
              key={`operator-${id}}`}
              value={`${operator[1]}`}
            />
          ))}
          {console.log("[Keypad Operators] render")}
        </div>
      </div>
    </div>
  );
};

const Calculator = styled(CalculatorJSX)`
  display: flex;
  flex-direction: column;
  width: 50rem;
  height: 50rem;

  border-radius: 10px;

  overflow: hidden;
  background-color: pink;

  .calculator--displays {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    padding: 8px;
    background-color: black;
  }

  .calculator--keypad {
    display: grid;
    grid-template-rows: repeat(5, 1fr);
    grid-template-columns: repeat(4, 1fr);

    flex-grow: 1;
  }
  .keypad--controls {
    grid-column: 1 / 4;
  }
  .keypad--numbers {
    grid-column: 1 / 4;
    grid-row: 2 / 6;

    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(4, 1fr);
    justify-items: stretch;
    align-items: stretch;
  }

  .keypad--operators {
    grid-column: 4 / 5;
    grid-row: 1 / -1;

    display: flex;
    flex-direction: column;

    background-color: purple;
  }
`;

export default Calculator;
