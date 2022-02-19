import { useState, forwardRef, useEffect } from "react";
import styled from "@emotion/styled";

import Display from "../components/Display";
import NumberButton from "../components/NumberButton";
import MathOperatorButton from "../components/MathOperatorButton";
import ControlButton from "../components/ControlButton";
import useKeyboardInput from "../hooks/useKeyboardInput";
import { computeValueFromFormula } from "../utils/output-helpers";
import {
  clearCurrentInputHelper,
  negateLastNumberHelper,
  keyinHelper,
} from "../utils/input.helpers";

const digits = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0, "."];
const mathOperators = [" ÷ ", " x ", " - ", " + ", " = "];
const controls = ["C", "AC", "+/-"];

const CalculatorJSX = ({ className }, ref) => {
  const [formula, setFormula] = useState("0");
  const [computedValue, setComputedValue] = useState("");

  const getComputedValue = (formula) => {
    const result = computeValueFromFormula(formula);
    setComputedValue(result);
  };

  const clearAll = () => {
    setFormula("0");
    setComputedValue("");
  };

  const clearCurrentInput = () => {
    setComputedValue("");
    setFormula((prevFormula) => clearCurrentInputHelper(prevFormula));
  };

  const negateLastNumber = () => {
    setFormula((prevFormula) => negateLastNumberHelper(prevFormula));
  };

  const keyinHandler = (btnText) => {
    setFormula((prevFormula) => keyinHelper(prevFormula, btnText));
  };

  useKeyboardInput({
    keyinHandler,
    clearCurrentInput,
    getComputedValue,
    formula,
  });

  useEffect(() => {
    // 如果 formula 上只有數字 => 未進行計算 => computedValue 不顯示
    // 用來處理計算完一個算式後，再進行其他計算時，上一個算式的 computedValue 應該移除
    if (!Number.isNaN(+formula)) {
      setComputedValue("");
    }
  }, [formula]);

  return (
    <div className={`${className} calculator`} ref={ref}>
      {console.log("[Calculator] render")}

      {/* 算式和算數結果顯示區域 */}
      <div className="calculator--displays">
        {console.log("[Display] render")}
        <Display content={formula} type="formula"></Display>
        <Display content={computedValue} type="result"></Display>
      </div>

      {/* 鍵盤區域 */}
      <div className="calculator--keypad">
        <div
          className="keypad--controls"
          onClick={(e) => {
            const btnText = e.target.value;
            if (btnText === "AC") clearAll();
            if (btnText === "C") clearCurrentInput();
            if (btnText === "+/-") negateLastNumber();
          }}
        >
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
            keyinHandler(e.target.value);
            if (e.target.value.trim() === "=") {
              if (!formula.endsWith(" ")) {
                getComputedValue(formula);
              } // 結尾是 operator
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

const Calculator = styled(forwardRef(CalculatorJSX))`
  display: flex;
  flex-direction: column;
  width: 50rem;
  height: 50rem;

  outline: 1px solid black;
  border-radius: 10px;

  overflow: hidden;
  background-color: pink;
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.3);

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
