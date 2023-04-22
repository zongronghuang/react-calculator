import styled from "@emotion/styled";
import MathOperatorButton from "../buttons/MathOperatorButton";

const mathOperators = ["÷", "x", "-", "+", "="];

type Props = {
  className?: string;
};

const OperatorKeysJSX = ({ className }: Props) => {
  return (
    <div className={className}>
      {mathOperators.map((operator) => (
        <MathOperatorButton value={operator} />
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
