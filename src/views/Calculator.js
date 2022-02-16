import styled from "@emotion/styled";
import Display from "../components/Display";
import NumberButton from "../components/NumberButton";
import MathOperatorButton from "../components/MathOperatorButton";
import ControlButton from "../components/ControlButton";

const digits = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0, "\u2219"];
const mathOperators = [
  ["division", "\u00f7"],
  ["multiplication", "\u00d7"],
  ["minus", "\u2212"],
  ["plus", "\u002b"],
  ["equal", "\u003d"],
];
const controls = ["C", "AC", "\u00b1"];

const CalculatorJSX = ({ className }) => {
  return (
    <div className={`${className} calculator`}>
      <div className="calculator--display">
        <Display></Display>
        <Display></Display>
      </div>

      <div className="calculator--keypad">
        <div className="keypad--controls">
          {controls.map((control) => (
            <ControlButton value={`${control}`} />
          ))}
        </div>

        <div className="keypad--numbers">
          {digits.map((digit) => (
            <NumberButton value={digit} />
          ))}
        </div>

        <div className="keypad--operators">
          {mathOperators.map((operator) => (
            <MathOperatorButton value={`${operator[1]}`} />
          ))}
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

  .calculator--display {
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
