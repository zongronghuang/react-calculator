import styled from "@emotion/styled";
import Button from "../general/Button";

const ControlButtonJSX = ({ className, value }) => (
  <Button className={className} value={value} />
);

const ControlButton = styled(ControlButtonJSX)`
  width: 33.33%;
  height: 100%;
  background-color: #5d6d7e;

  &:active {
    background-color: #7f8c8d;
  }
`;

export default ControlButton;
