import styled from "@emotion/styled";
import BaseButton from "./BaseButton";

type Props = {
  className?: string;
  value: string;
};

const MathOperatorButtonJSX = ({ className, value }: Props) => (
  <BaseButton className={className} value={value} />
);

const MathOperatorButton = styled(MathOperatorButtonJSX)`
  flex-grow: 1;
  width: 100%;
  background-color: orange;

  &:active {
    background-color: #e67e22;
  }
`;

export default MathOperatorButton;
