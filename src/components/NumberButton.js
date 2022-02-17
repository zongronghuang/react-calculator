import { useContext } from "react";
import styled from "@emotion/styled";

import Button from "../general/Button";
import KeyinContext from "../contexts/KeyinContext";

const NumberButtonJSX = ({ className, value }) => {
  const { keyinHandler } = useContext(KeyinContext);

  return (
    <Button
      className={`${className} ${value === 0 && "double-width"}`}
      value={value}
      onClick={() => console.log("hahahah")}
    />
  );
};

const NumberButton = styled(NumberButtonJSX)`
  width: 100%;
  height: 100%;
  background-color: red;

  &.double-width {
    grid-column: 1 / 3;
  }
`;
export default NumberButton;
