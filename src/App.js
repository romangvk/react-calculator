import "./assets/css/main.css";
import Keypad from "./components/Keypad";
import Output from "./components/Output";
import Panel from "./components/Panel";

function App() {
  return (
    <div className="app purple">
      <Panel>
        <Output text="test"></Output>
        <Keypad></Keypad>
      </Panel>
    </div>
  );
}

export default App;
