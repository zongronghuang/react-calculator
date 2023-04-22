import { createContext, useState } from "react";
import { combineMathExp } from "../utils/input";

type Context = {
  mathExp: string;
  calculatedValue: number;
  setMathExp: React.Dispatch<React.SetStateAction<string>>;
  setCalculatedValue: React.Dispatch<React.SetStateAction<number>>;
  combineMathExp: (baseExp: string, input: string) => string;
};

const HandlerContext = createContext<Context>({
  mathExp: "",
  calculatedValue: 0,
  setMathExp: () => {},
  setCalculatedValue: () => {},
  combineMathExp,
});

type Props = {
  children: React.ReactNode;
};

const HandlerContextProvider = (props: Props) => {
  const [mathExp, setMathExp] = useState("0");
  const [calculatedValue, setCalculatedValue] = useState(0);

  return (
    <HandlerContext.Provider
      value={{
        mathExp,
        calculatedValue,
        setMathExp,
        setCalculatedValue,
        combineMathExp,
      }}
    >
      {props.children}
    </HandlerContext.Provider>
  );
};

export { HandlerContext, HandlerContextProvider };
