import { createContext, useState } from "react";
import { combineMathExp } from "../utils/input";
import { calculator } from "../utils/output";

type Context = {
  mathExp: string;
  calculatedValue: string;
  setMathExp: React.Dispatch<React.SetStateAction<string>>;
  setCalculatedValue: React.Dispatch<React.SetStateAction<string>>;
  combineMathExp: (baseExp: string, input: string) => string;
  calculator: (exp: string) => string | undefined;
};

const HandlerContext = createContext<Context>({
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

const HandlerContextProvider = (props: Props) => {
  const [mathExp, setMathExp] = useState("0");
  const [calculatedValue, setCalculatedValue] = useState("0");

  return (
    <HandlerContext.Provider
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
    </HandlerContext.Provider>
  );
};

export { HandlerContext, HandlerContextProvider };
