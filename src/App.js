import "./assets/css/main.css";
import Keypad from "./components/Keypad";
import Output from "./components/Output";
import Panel from "./components/Panel";
import { useState } from "react";
import evaluate from "./lib/evaluate";

function App() {
  let [text, setText] = useState("");

  function keypress(key) {
    if (text === "NaN" || text === "Infinity" || text === "-Infinity") {
      setText("");
    }
    switch (key) {
      case "C":
        setText("");
        break;
      case "/":
      case "*":
      case "-":
      case "+":
        if (text.slice(-1) >= "0" && text.slice(-1) <= "9") setText(text + key);
        break;
      case ".":
        if (text.slice(-1) !== ".") setText(text + key);
        break;
      case "=":
        if (text.slice(-1) >= "0" && text.slice(-1) <= "9") {
          setText(evaluate(text).toPrecision(7).replace(/\.\d*0+$/, "").replace(/\.?0+e/, "e"));
        }
        break;
      default:
        setText(text + key);
    }
  }
  return (
    <div className="app ice">
      <Panel>
        <Output text={text}></Output>
        <Keypad keypress={keypress}></Keypad>
      </Panel>
    </div>
  );
}

export default App;
