import { useContext } from "react";
import styled from "@emotion/styled";
import { CalculatorContext } from "../../context/CalculatorContext";
import Button from "./Button";

type Props = {
  className?: string;
  value: string;
};

const BaseNumberButton = ({ className, value }: Props) => {
  const { activeKey } = useContext(CalculatorContext);
  return (
    <Button
      className={`${className} ${value === "0" && "double-width"} ${
        activeKey === value ? "active" : ""
      }`}
      value={value}
    />
  );
};

const NumberButton = styled(BaseNumberButton)`
  width: 100%;
  height: 100%;
  background-color: #7f8c8d;

  &:active {
    background-color: #99a3a4;
  }

  &.double-width {
    grid-column: 1 / 3;
  }

  &.active {
    animation-name: active-number;
    animation-duration: 0.1s;
  }

  @keyframes active-number {
    30% {
      background-color: #99a3a4;
    }
    80% {
      background-color: #99a3a4;
    }
    100% {
      background-color: #7f8c8d;
    }
  }
`;
export default NumberButton;
