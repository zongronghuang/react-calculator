import logo from "./logo.svg";
import "./App.css";
import Calculator from "./views/Calculator";
import Backdrop from "./views/Backdrop";
import Button from "./components/Button";

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
