import styled from "@emotion/styled";
import Display from "../components/Display";

const CalculatorJSX = ({ className }) => {
  return (
    <div className={`${className} calculator`}>
      <div className="calculator--display">
        <Display></Display>
        <Display></Display>
      </div>
      <div className="calculator--keypad">
        <div className="keypad--controls"></div>
        <div className="keypad--numbers"></div>
        <div className="keypad--operators"></div>
      </div>
    </div>
  );
};

const Calculator = styled(CalculatorJSX)`
  width: 50rem;
  height: 50rem;

  background-color: pink;

  .calculator--display {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    padding: 8px;
    background-color: black;
  }
`;

export default Calculator;
