import styled from "@emotion/styled";
import Button from "../general/Button";

const ControlButtonJSX = ({ className, value }) => {
  return <Button className={className} value={value} />;
};

const ControlButton = styled(ControlButtonJSX)`
  width: 33.33%;
  height: 100%;
  background-color: lightblue;
`;

export default ControlButton;
