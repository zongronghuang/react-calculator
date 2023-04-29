import styled from "@emotion/styled";
import BaseButton from "./BaseButton";

type Props = {
  className?: string;
  value: string;
};

const BaseControlButton = ({ className, value }: Props) => (
  <BaseButton className={className} value={value} />
);

const ControlButton = styled(BaseControlButton)`
  width: 33.33%;
  height: 100%;
  background-color: #5d6d7e;

  &:active {
    background-color: #7f8c8d;
  }
`;

export default ControlButton;
