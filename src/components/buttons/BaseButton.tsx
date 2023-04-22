import { useContext } from "react";
import styled from "@emotion/styled";
import { HandlerContext } from "../../context/HandlerContext";

type Props = {
  className?: string;
  value: string;
};

const BaseButtonJSX = ({ className, value }: Props) => {
  const { combineMathExp, setMathExp } = useContext(HandlerContext);

  return (
    <button
      className={className}
      value={value}
      onClick={() => setMathExp((prevExp) => combineMathExp(prevExp, value))}
    >
      {value}
    </button>
  );
};

const BaseButton = styled(BaseButtonJSX)`
  width: 25%;
  height: 25%;
  border: none;

  color: #f4f6f7;
  font-size: 3.6rem;

  outline: 1px solid black;
`;

export default BaseButton;
