import styled from "@emotion/styled";
import MathOperatorButton from "../buttons/MathOperatorButton";

const mathOperators = [" ÷ ", " x ", " - ", " + ", " = "];

type Props = {
  className?: string;
  formula: string;
  keyinHandler: (btnText: string) => void;
  getComputedValue: (formula: string) => void;
};

const OperatorKeysJSX = ({
  className,
  formula,
  getComputedValue,
  keyinHandler,
}: Props) => {
  return (
    <div
      className={className}
      onClick={(e) => {
        const button = e.target as HTMLButtonElement;
        keyinHandler(button.value);
        if (button.value.trim() === "=") {
          if (!formula.endsWith(" ") && !formula.endsWith(".")) {
            getComputedValue(formula);
          } // 結尾不是 operator 也不是小數點，才可以計算值
        }
      }}
    >
      {mathOperators.map((operator, id) => (
        <MathOperatorButton key={`operator-${id}}`} value={`${operator}`} />
      ))}
    </div>
  );
};

const OperatorKeys = styled(OperatorKeysJSX)`
  grid-column: 4 / 5;
  grid-row: 1 / -1;

  display: flex;
  flex-direction: column;

  background-color: purple;
`;

export default OperatorKeys;
