import {
  useState,
  useContext,
  forwardRef,
  useEffect,
  useCallback,
  Ref,
} from "react";
import styled from "@emotion/styled";
import { HandlerContext } from "../context/HandlerContext";

import Display from "../components/calculator/Display";
import ControlKeys from "../components/calculator/ControlKeys";
import NumberKeys from "../components/calculator/NumberKeys";
import OperatorKeys from "../components/calculator/OperatorKeys";

import useKeyboardInput from "../hooks/useKeyboardInput";
import { compute } from "../utils/output";
import { combineMathExp } from "../utils/input";

type Props = {
  className?: string;
};

const CalculatorJSX = ({ className }: Props, ref: Ref<HTMLDivElement>) => {
  const { mathExp, calculatedValue } = useContext(HandlerContext);

  // const getComputedValue = (mathExp: string) => {
  //   console.log("getComputedValue", { mathExp });
  //   let result = compute(mathExp);
  //   setComputedValue(result.toString());
  // };

  // const clearAll = () => {
  //   setMathExp((prevExp) => {
  //     return "0";
  //   });

  //   setMathExp(" ");
  //   setComputedValue((prevValue) => {
  //     return "";
  //   });
  // };

  // const clearCurrentInput = () => {
  //   setComputedValue((prevValue) => {
  //     return "";
  //   });
  //   setMathExp((prevmathExp) => {
  //     return clearCurrentInputHelper(prevmathExp);
  //   });
  // };

  // const keyinHandler = (btnText: string) => {
  //   setMathExp((prevmathExp) => {
  //     console.log("KEYIN handler", { prevmathExp, btnText });
  //     return keyinHelper(prevmathExp, btnText);
  //   });
  // };

  // useKeyboardInput({
  //   keyinHandler,
  //   clearCurrentInput,
  //   mathExp,
  // });

  // useEffect(() => {
  //   if (mathExp.endsWith(" = ")) {
  //     getComputedValue(mathExp);
  //   }
  // }, [mathExp]);

  // useEffect(() => {
  //   // 如果 mathExp 上只有數字 => 未進行計算 => computedValue 不顯示
  //   // 用來處理計算完一個算式後，再進行其他計算時，上一個算式的 computedValue 應該移除
  //   if (!Number.isNaN(+mathExp)) {
  //     setComputedValue((prevValue) => "");
  //   }
  // }, [mathExp]);

  return (
    <div className={`${className} calculator-container`} ref={ref}>
      <div className="calculator">
        {/* {console.log("[Calculator] render")} */}

        <div className="calculator--displays">
          {/* {console.log("[Display] render")} */}
          <Display content={mathExp} type="mathExp"></Display>
          <Display content={calculatedValue} type="result"></Display>
        </div>

        <div className="calculator--keypad">
          <ControlKeys
          // clearAll={clearAll}
          // clearCurrentInput={clearCurrentInput}
          />

          <NumberKeys />

          <OperatorKeys
          // getComputedValue={getComputedValue}
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
