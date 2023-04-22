import styled from "@emotion/styled";
import BaseButton from "./BaseButton";

type Props = {
  className?: string;
  value: string;
};

const NumberButtonJSX = ({ className, value }: Props) => (
  <BaseButton
    className={`${className} ${value === "0" && "double-width"}`}
    value={value}
  />
);

const NumberButton = styled(NumberButtonJSX)`
  width: 100%;
  height: 100%;
  background-color: #7f8c8d;

  &:active {
    background-color: #99a3a4;
  }

  &.double-width {
    grid-column: 1 / 3;
  }
`;
export default NumberButton;
