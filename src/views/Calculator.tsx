import { useContext, forwardRef, useEffect, Ref } from "react";
import styled from "@emotion/styled";
import { CalculatorContext } from "../context/CalculatorContext";

import Display from "../components/calculator/Display";
import ControlKeys from "../components/calculator/ControlKeys";
import NumberKeys from "../components/calculator/NumberKeys";
import OperatorKeys from "../components/calculator/OperatorKeys";

type Props = {
  className?: string;
};

const BaseCalculator = ({ className }: Props, ref: Ref<HTMLDivElement>) => {
  const { mathExp, calculatedValue, setCalculatedValue, calculator } =
    useContext(CalculatorContext);

  useEffect(() => {
    // 按下 AC 時，算式為 "0"，值同時設為 "0"
    if (mathExp === "0") {
      setCalculatedValue("0");
      return;
    }

    const result = calculator(mathExp);
    if (result) {
      setCalculatedValue(result);
    }
  }, [mathExp]);

  return (
    <div className={`${className} calculator-container`} ref={ref}>
      <div className="calculator">
        <div className="calculator--displays">
          <Display content={mathExp} type="mathExp" />
          <Display content={calculatedValue} type="result" />
        </div>

        <div className="calculator--keypad">
          <ControlKeys />
          <NumberKeys />
          <OperatorKeys />
        </div>
      </div>
    </div>
  );
};

const Calculator = styled(forwardRef(BaseCalculator))`
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
