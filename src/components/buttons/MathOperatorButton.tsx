import styled from "@emotion/styled";
import BaseButton from "./BaseButton";

type Props = {
  className?: string;
  value: string;
};

const BaseMathOperatorButton = ({ className, value }: Props) => (
  <BaseButton className={className} value={value} />
);

const MathOperatorButton = styled(BaseMathOperatorButton)`
  flex-grow: 1;
  width: 100%;
  background-color: orange;

  &:active {
    background-color: #e67e22;
  }
`;

export default MathOperatorButton;
