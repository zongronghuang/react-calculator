import { useState } from "react";
import styled from "@emotion/styled";

import Display from "../components/Display";
import NumberButton from "../components/NumberButton";
import MathOperatorButton from "../components/MathOperatorButton";
import ControlButton from "../components/ControlButton";
import { computeValueFromFormula } from "../utils/output-helpers";

const digits = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0, "."];
const mathOperators = [" ÷ ", " x ", " - ", " + ", " = "];
const controls = ["C", "AC", "\u00b1"];

const CalculatorJSX = ({ className }) => {
  const [formula, setFormula] = useState("0");
  const [computedValue, setComputedValue] = useState("");

  const getComputedValue = () => {
    const result = computeValueFromFormula(formula);
    setComputedValue(result);
  };

  const clearAll = () => {
    setFormula("0");
    setComputedValue("");
  };

  const clearCurrentInput = () => {};

  const eraseKeyin = () => {
    console.log("erase keyin");
    setFormula("0");
  };

  const keyinHandler = (btnText) => {
    setFormula((prevFormula) => {
      console.log({ btnText, prevFormula });
      const afterDecimalRegex = new RegExp(/\.\d+$/);
      const afterDecimalDot = prevFormula.endsWith(".");
      const afterOperator = prevFormula.endsWith(" ");
      const endsWithSpaceZero = prevFormula.endsWith(" 0");
      const hasOnlyOneZero = prevFormula.length === 1 && prevFormula[0] === "0";

      switch (btnText) {
        case ".":
          console.log("flow to dot");
          const cannotAddDecimalDot =
            afterDecimalRegex.test(prevFormula) ||
            afterDecimalDot ||
            afterOperator;
          return cannotAddDecimalDot ? prevFormula : `${prevFormula}${btnText}`;
        case " ÷ ":
        case " - ":
        case " + ":
        case " x ":
        case " = ":
          console.log("flow to operator");
          const cannotAddOperator = afterDecimalDot || afterOperator;
          return cannotAddOperator ? prevFormula : `${prevFormula}${btnText}`;
        case "0":
          console.log("flow to zero");
          const cannotAddZero = hasOnlyOneZero || endsWithSpaceZero;
          return cannotAddZero ? prevFormula : `${prevFormula}${btnText}`;
        default:
          // 輸入 1-9 字元
          console.log("flow to default");
          return hasOnlyOneZero ? btnText : `${prevFormula}${btnText}`;
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
        <Display content={computedValue} type="result"></Display>
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
          onClick={(e) => {
            const btn = e.target.value;

            keyinHandler(e.target.value);
            if (btn === " = ") {
              getComputedValue();
            }
          }}
        >
          {mathOperators.map((operator, id) => (
            <MathOperatorButton key={`operator-${id}}`} value={`${operator}`} />
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
