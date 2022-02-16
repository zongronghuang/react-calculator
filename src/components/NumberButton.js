import styled from "@emotion/styled";
import Button from "../general/Button";

const NumberButtonJSX = ({ className, value }) => {
  return (
    <Button
      className={`${className} ${value === 0 && "double-width"}`}
      value={value}
    />
  );
};

const NumberButton = styled(NumberButtonJSX)`
  /* width: 33.33%; */
  width: 100%;
  height: 100%;
  background-color: red;

  &.double-width {
    grid-column: 1 / 3;
  }
`;
export default NumberButton;
