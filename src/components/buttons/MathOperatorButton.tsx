import { useContext } from "react";
import styled from "@emotion/styled";
import { CalculatorContext } from "../../context/CalculatorContext";
import Button from "./Button";

type Props = {
  className?: string;
  value: string;
};

const BaseMathOperatorButton = ({ className, value }: Props) => {
  const { activeKey } = useContext(CalculatorContext);
  return (
    <Button
      className={`${className} ${activeKey === value ? "active" : ""}`}
      value={value}
    />
  );
};

const MathOperatorButton = styled(BaseMathOperatorButton)`
  flex-grow: 1;
  width: 100%;
  background-color: orange;

  &:active {
    background-color: #e67e22;
  }

  &.active {
    animation-name: active-operator;
    animation-duration: 0.1s;
  }

  @keyframes active-operator {
    50% {
      background-color: #e67e22;
    }
    80% {
      background-color: #e67e22;
    }
    100% {
      background-color: orange;
    }
  }
`;

export default MathOperatorButton;
