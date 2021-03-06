import { useRef } from "react";
import "./App.css";
import Calculator from "./views/Calculator";
import Backdrop from "./views/Backdrop";
import useDragAndDrop from "./hooks/useDragAndDrop";

function App() {
  const backdropRef = useRef();
  const calculatorRef = useRef();

  useDragAndDrop({
    dragItemRef: calculatorRef,
    dropZoneRef: backdropRef,
  });

  return (
    <div className="App">
      <Backdrop ref={backdropRef}>
        <Calculator ref={calculatorRef} />
      </Backdrop>
    </div>
  );
}

export default App;
