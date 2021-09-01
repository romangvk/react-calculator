import "./assets/css/main.css";
import Keypad from "./components/Keypad";
import Output from "./components/Output";
import Panel from "./components/Panel";
import { useState } from "react";
import evaluate from "./lib/evaluate";

function App() {
  let [text, setText] = useState("");

  function keypress(key) {
    let prev = text;
    if (text === "NaN" || text === "Infinity" || text === "-Infinity") {
      prev = "";
    }
    switch (key) {
      case "C":
        setText("");
        break;
      case "/":
      case "*":
      case "+":
        if (/\d$/.test(prev)) setText(prev + key);
        break;
      case "-":
        // preceded by + change to minus
        if (/\+$/.test(prev)) setText(prev.replace(/.$/, "-"));
        // preceded by - change to plus
        else if (/\d-$/.test(prev)) setText(prev.replace(/.$/, "+"));
        // preceded by - but that is the whole string
        else if (/^-$/.test(prev)) setText(prev.replace(/.$/, ""));
        else setText(prev + "-");
        break;
      case ".":
        if (prev.slice(-1) !== ".") setText(prev + key);
        break;
      case "=":
        if (/^.*\d+$/.test(prev)) {
          setText(
            evaluate(prev)
              .toPrecision(7)
              .replace(/\.\d*0+$/, "")
              .replace(/\.?0+e/, "e")
          );
        }
        break;
      default:
        setText(prev + key);
    }
  }
  return (
    <div className="app">
      <Panel>
        <Output text={text}></Output>
        <Keypad keypress={keypress}></Keypad>
      </Panel>
    </div>
  );
}

export default App;
