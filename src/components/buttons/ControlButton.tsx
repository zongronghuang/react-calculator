import { useContext, useEffect } from "react";
import styled from "@emotion/styled";
import { CalculatorContext } from "../../context/CalculatorContext";
import Button from "./Button";

type Props = {
  className?: string;
  value: string;
};

const BaseControlButton = ({ className, value }: Props) => {
  const { activeKey } = useContext(CalculatorContext);

  return (
    <Button
      className={`${className} ${activeKey === value ? "active" : ""}`}
      value={value}
    />
  );
};

const ControlButton = styled(BaseControlButton)`
  width: 33.33%;
  height: 100%;
  background-color: #5d6d7e;

  &:active {
    background-color: #7f8c8d;
  }

  &.active {
    animation-name: active-control;
    animation-duration: 0.1s;
  }

  @keyframes active-control {
    50% {
      background-color: #7f8c8d;
    }
    80% {
      background-color: #7f8c8d;
    }
    100% {
      background-color: #5d6d7e;
    }
  }
`;

export default ControlButton;
