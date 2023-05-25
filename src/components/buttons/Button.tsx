import { useContext } from "react";
import styled from "@emotion/styled";
import { CalculatorContext } from "../../context/CalculatorContext";

type Props = {
  className?: string;
  value: string;
};

const BaseButton = ({ className, value }: Props) => {
  const { combineMathExp, setMathExp } = useContext(CalculatorContext);

  return (
    <button
      className={className}
      value={value}
      onClick={() => {
        setMathExp((prevExp) => combineMathExp(prevExp, value));
      }}
    >
      {value}
    </button>
  );
};

const Button = styled(BaseButton)`
  width: 25%;
  height: 25%;
  border: none;

  color: #f4f6f7;
  font-size: 3.6rem;

  outline: 1px solid black;
`;

export default Button;
