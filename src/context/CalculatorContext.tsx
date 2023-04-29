import { createContext, useState } from "react";
import { combineMathExp } from "../utils/mathExps";
import { calculator } from "../utils/calculation";

type Context = {
  mathExp: string;
  calculatedValue: string;
  setMathExp: React.Dispatch<React.SetStateAction<string>>;
  setCalculatedValue: React.Dispatch<React.SetStateAction<string>>;
  combineMathExp: (baseExp: string, input: string) => string;
  calculator: (exp: string) => string | undefined;
};

const CalculatorContext = createContext<Context>({
  mathExp: "",
  calculatedValue: "",
  setMathExp: () => {},
  setCalculatedValue: () => {},
  combineMathExp,
  calculator,
});

type Props = {
  children: React.ReactNode;
};

const CalculatorContextProvider = (props: Props) => {
  const [mathExp, setMathExp] = useState("0");
  const [calculatedValue, setCalculatedValue] = useState("0");

  return (
    <CalculatorContext.Provider
      value={{
        mathExp,
        calculatedValue,
        setMathExp,
        setCalculatedValue,
        combineMathExp,
        calculator,
      }}
    >
      {props.children}
    </CalculatorContext.Provider>
  );
};

export { CalculatorContext, CalculatorContextProvider };
