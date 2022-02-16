import "./App.css";
import Calculator from "./views/Calculator";
import Backdrop from "./views/Backdrop";

function App() {
  return (
    <div className="App">
      <Backdrop>
        <Calculator />
      </Backdrop>
    </div>
  );
}

export default App;
