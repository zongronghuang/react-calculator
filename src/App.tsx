import { useRef } from "react";
import "./App.css";
import Calculator from "./views/Calculator";
import Backdrop from "./components/Backdrop";
import useDragAndDrop from "./hooks/useDragAndDrop";

function App() {
  const backdropRef = useRef(null);
  const calculatorRef = useRef(null);

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
