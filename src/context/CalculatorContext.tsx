import { createContext, useState } from "react";
import combineMathExp from "../utils/mathExps";
import calculator from "../utils/calculation";
import keyToText from "../utils/shortcuts";

type Context = {
  mathExp: string;
  calculatedValue: string;
  activeKey: string;
  setMathExp: React.Dispatch<React.SetStateAction<string>>;
  setCalculatedValue: React.Dispatch<React.SetStateAction<string>>;
  setActiveKey: React.Dispatch<React.SetStateAction<string>>;
  combineMathExp: (baseExp: string, input: string) => string;
  calculator: (exp: string) => string | undefined;
  keyToText: (key: string, altKey: boolean) => string;
};

const CalculatorContext = createContext<Context>({
  mathExp: "",
  calculatedValue: "",
  activeKey: "",
  setMathExp: () => {},
  setCalculatedValue: () => {},
  setActiveKey: () => {},
  combineMathExp,
  calculator,
  keyToText,
});

type Props = {
  children: React.ReactNode;
};

const CalculatorContextProvider = (props: Props) => {
  const [mathExp, setMathExp] = useState("0");
  const [calculatedValue, setCalculatedValue] = useState("0");
  const [activeKey, setActiveKey] = useState("");

  return (
    <CalculatorContext.Provider
      value={{
        mathExp,
        calculatedValue,
        activeKey,
        setMathExp,
        setCalculatedValue,
        combineMathExp,
        calculator,
        keyToText,
        setActiveKey,
      }}
    >
      {props.children}
    </CalculatorContext.Provider>
  );
};

export { CalculatorContext, CalculatorContextProvider };
