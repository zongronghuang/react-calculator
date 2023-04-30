import { useRef, useContext } from "react";
import "./App.css";
import {
  CalculatorContextProvider,
  CalculatorContext,
} from "./context/CalculatorContext";
import Calculator from "./views/Calculator";
import Backdrop from "./components/Backdrop";
import useDragAndDrop from "./hooks/useDragAndDrop";

function App() {
  const backdropRef = useRef(null);
  const calculatorRef = useRef(null);
  const { setMathExp, combineMathExp, keyToText } =
    useContext(CalculatorContext);

  useDragAndDrop({
    dragItemRef: calculatorRef,
    dropZoneRef: backdropRef,
  });

  return (
    <CalculatorContextProvider>
      <div className="App">
        <Backdrop ref={backdropRef}>
          <Calculator ref={calculatorRef} />
        </Backdrop>
      </div>
    </CalculatorContextProvider>
  );
}

export default App;
