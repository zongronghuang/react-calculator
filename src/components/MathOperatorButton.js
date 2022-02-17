import { useContext } from "react";
import styled from "@emotion/styled";

import Button from "../general/Button";

import KeyinContext from "../contexts/KeyinContext";

const MathOperatorButtonJSX = ({ className, value }) => {
  const { keyinHandler } = useContext(KeyinContext);
  const textValue = value;
  return (
    <Button
      className={className}
      value={value}
      onClick={() => keyinHandler(textValue)}
    />
  );
};

const MathOperatorButton = styled(MathOperatorButtonJSX)`
  flex-grow: 1;
  width: 100%;
  background-color: orange;
`;

export default MathOperatorButton;
