import styled from "@emotion/styled";
import MathOperatorButton from "../buttons/MathOperatorButton";

const mathOperators = ["÷", "x", "-", "+", "="];

type Props = {
  className?: string;
};

const BaseOperatorKeys = ({ className }: Props) => {
  return (
    <div className={className}>
      {mathOperators.map((operator, id) => (
        <MathOperatorButton key={id} value={operator} />
      ))}
    </div>
  );
};

const OperatorKeys = styled(BaseOperatorKeys)`
  grid-column: 4 / 5;
  grid-row: 1 / -1;

  display: flex;
  flex-direction: column;

  background-color: purple;
`;

export default OperatorKeys;
