import styled from "@emotion/styled";
import Button from "../general/Button";

const MathOperatorButtonJSX = ({ className, value }) => {
  return <Button className={className} value={value} />;
};

const MathOperatorButton = styled(MathOperatorButtonJSX)`
  flex-grow: 1;
  width: 100%;
  background-color: orange;
`;

export default MathOperatorButton;
