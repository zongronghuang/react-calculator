import { useState, useRef, forwardRef, useEffect } from "react";
import styled from "@emotion/styled";

import Display from "../components/Display";
import NumberButton from "../components/NumberButton";
import MathOperatorButton from "../components/MathOperatorButton";
import ControlButton from "../components/ControlButton";
import { computeValueFromFormula } from "../utils/output-helpers";

const digits = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0, "."];
const mathOperators = [" ÷ ", " x ", " - ", " + ", " = "];
const controls = ["C", "AC", "+/-"];

const CalculatorJSX = ({ className }, ref) => {
  const [formula, setFormula] = useState("0");
  const [computedValue, setComputedValue] = useState("");
  const formulaCacheRef = useRef("");

  const getComputedValue = () => {
    const result = computeValueFromFormula(formula);
    setComputedValue(result);
  };

  const clearAll = () => {
    setFormula("0");
    formulaCacheRef.current = "";
    setComputedValue("");
  };

  const clearCurrentInput = () => {
    setComputedValue("");
    setFormula((prevFormula) => {
      const splitFormula = prevFormula.split(" ");
      const lastItemId = splitFormula.length - 1;
      const lastItem = splitFormula[lastItemId];
      let newFormula = "";

      // 最後一項是數字字串
      if (lastItem !== "") {
        newFormula = splitFormula.reduce((base, item, id) => {
          return id === lastItemId ? base : `${base}${item} `;
        }, "");
      }

      // 最後一項是 ''，代表 formula 是以 operator 結束
      if (lastItem === "") {
        newFormula = splitFormula
          .reduce((base, item, id) => {
            return id >= lastItemId - 1 ? base : `${base}${item} `;
          }, "")
          .trimEnd();
      }

      // console.log({ newFormula });
      return newFormula ? newFormula : "0";
    });
  };

  const negateLastNumber = () => {
    setFormula((prevFormula) => {
      const isOneZero = prevFormula === "0";
      const endsWithSpaceZero = prevFormula.endsWith(" 0");
      const endsWithNegator = prevFormula.endsWith("-");
      const endsWithEqual = prevFormula.endsWith(" = ");
      const endsWithZeroDecimal = new RegExp(/0\.0*$/).test(prevFormula);
      const endsWithOperator = new RegExp(/\s[+x÷-]\s$/).test(prevFormula);

      const cannotNegateLastItem =
        isOneZero ||
        endsWithSpaceZero ||
        endsWithZeroDecimal ||
        endsWithEqual ||
        endsWithNegator;

      if (cannotNegateLastItem) {
        console.log("cannot negate last item");
        return prevFormula;
      }

      if (endsWithOperator) {
        console.log("]]]]]]]]]]]", endsWithOperator);
        return prevFormula + "-";
      }

      console.log("========");
      // 結尾為非零的數字，非零的數字做成相反數
      if (!endsWithOperator) {
        console.log("negate a number");
        const splitFormula = prevFormula.split(" ");
        const lastItem = splitFormula[splitFormula.length - 1];

        const negatedNumberString = (-Number(lastItem)).toString();
        console.log({ lastItem, negatedNumberString });
        splitFormula.pop();
        splitFormula.push(negatedNumberString);

        return splitFormula.join(" ");
      }
    });
  };

  const keyinHandler = (btnText) => {
    setFormula((prevFormula) => {
      console.log({ btnText, prevFormula });

      const endsWithDecimalDot = prevFormula.endsWith(".");
      const endsWithOperator = new RegExp(/\s[+x÷-]\s$/).test(prevFormula);
      const endsWithNegator = prevFormula.endsWith("-");
      const endsWithSpaceZero = prevFormula.endsWith(" 0");
      const hasOnlyOneZero = prevFormula.length === 1 && prevFormula[0] === "0";
      const endsWithEqual = prevFormula.endsWith(" = ");
      const endsWithDecimalNumber = new RegExp(/\.\d+$/).test(prevFormula);

      switch (btnText) {
        case ".":
          console.log("flow to dot");
          const cannotAddDecimalDot =
            endsWithDecimalNumber ||
            endsWithDecimalDot ||
            endsWithOperator ||
            endsWithEqual;
          return cannotAddDecimalDot ? prevFormula : `${prevFormula}${btnText}`;
        case " ÷ ":
        case " - ":
        case " + ":
        case " x ":
        case " = ":
          console.log("flow to operator");
          const cannotAddOperator =
            endsWithDecimalDot ||
            endsWithOperator ||
            endsWithEqual ||
            endsWithNegator;
          return cannotAddOperator ? prevFormula : `${prevFormula}${btnText}`;
        case "0":
          console.log("flow to zero");
          if (endsWithEqual) {
            return btnText;
          }

          const cannotAddZero = hasOnlyOneZero || endsWithSpaceZero;
          return cannotAddZero ? prevFormula : `${prevFormula}${btnText}`;
        default:
          // 輸入 1-9 字元
          console.log("flow to default");
          if (endsWithEqual) {
            return btnText;
          }
          return hasOnlyOneZero ? btnText : `${prevFormula}${btnText}`;
      }
    });
  };

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
                getComputedValue();
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
