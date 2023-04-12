import { useState, forwardRef, useEffect, useCallback, Ref } from "react";
import styled from "@emotion/styled";

import Display from "../components/calculator/Display";
import ControlKeys from "../components/calculator/ControlKeys";
import NumberKeys from "../components/calculator/NumberKeys";
import OperatorKeys from "../components/calculator/OperatorKeys";

import useKeyboardInput from "../hooks/useKeyboardInput";
import { compute } from "../utils/output";
import {
  clearCurrentInputHelper,
  negateLastNumberHelper,
  keyinHelper,
} from "../utils/input.helpers";

type Props = {
  className?: string;
};

const CalculatorJSX = ({ className }: Props, ref: Ref<HTMLDivElement>) => {
  const [formula, setFormula] = useState("0");
  const [computedValue, setComputedValue] = useState("");

  console.log("[APP RENDER]", { formula, computedValue });

  const getComputedValue = (formula: string) => {
    console.log("getComputedValue", { formula });
    let result = compute(formula);
    setComputedValue(result.toString());
  };

  const clearAll = () => {
    setFormula((prevFormula) => {
      return "0";
    });
    setComputedValue((prevValue) => {
      return "";
    });
  };

  const clearCurrentInput = () => {
    setComputedValue((prevValue) => {
      return "";
    });
    setFormula((prevFormula) => {
      return clearCurrentInputHelper(prevFormula);
    });
  };

  const negateLastNumber = () => {
    setFormula((prevFormula) => negateLastNumberHelper(prevFormula) as string);
  };

  const keyinHandler = (btnText: string) => {
    setFormula((prevFormula) => {
      console.log("KEYIN handler", { prevFormula, btnText });
      return keyinHelper(prevFormula, btnText);
    });
  };

  useKeyboardInput({
    keyinHandler,
    clearCurrentInput,
    formula,
  });

  useEffect(() => {
    if (formula.endsWith(" = ")) {
      getComputedValue(formula);
    }
  }, [formula]);

  useEffect(() => {
    // 如果 formula 上只有數字 => 未進行計算 => computedValue 不顯示
    // 用來處理計算完一個算式後，再進行其他計算時，上一個算式的 computedValue 應該移除
    if (!Number.isNaN(+formula)) {
      setComputedValue((prevValue) => "");
    }
  }, [formula]);

  return (
    <div className={`${className} calculator-container`} ref={ref}>
      <div className="calculator">
        {/* {console.log("[Calculator] render")} */}

        <div className="calculator--displays">
          {/* {console.log("[Display] render")} */}
          <Display content={formula} type="formula"></Display>
          <Display content={computedValue} type="result"></Display>
        </div>

        <div className="calculator--keypad">
          <ControlKeys
            clearAll={clearAll}
            clearCurrentInput={clearCurrentInput}
            negateLastNumber={negateLastNumber}
          />

          <NumberKeys keyinHandler={keyinHandler} />

          <OperatorKeys
            formula={formula}
            keyinHandler={keyinHandler}
            getComputedValue={getComputedValue}
          />
        </div>
      </div>
    </div>
  );
};

const Calculator = styled(forwardRef(CalculatorJSX))`
  width: 50rem;
  height: 50rem;
  overflow: hidden;
  background-color: pink;
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.3);
  outline: 1px solid black;
  border-radius: 10px;

  .calculator {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

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

  /* ------------------ */
  /* MEDIA QUERIES */
  /* TABLET 768px */
  @media (max-width: 48em) {
    width: 100%;
    height: 50%;
    overflow-y: auto;
  }
`;

export default Calculator;
