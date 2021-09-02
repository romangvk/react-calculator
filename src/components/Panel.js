import Keypad from "./Keypad";
import Output from "./Output";
import { useState } from "react";
import evaluate from "./../lib/evaluate";

function Panel() {
  let [text, setText] = useState("");

  function keypress(key) {
    let prev = text;
    if (
      text === "NaN" ||
      text === "Infinity" ||
      text === "-Infinity" ||
      text === "Err: Division by 0"
    ) {
      prev = "";
    }
    switch (key) {
      case "C":
        setText("");
        break;
      case "/":
      case "*":
      case "+":
        // only add an operator after a number
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
        // don't put two decimal points in a row
        if (!/\.\d*$/.test(prev)) setText(prev + key);
        break;
      case "=":
        if (/^.*\d+$/.test(prev)) {
          setText(String(evaluate(prev)));
        }
        break;
      default:
        setText(prev + key);
    }
  }

  return (
    <span className="panel">
      <Output text={text}></Output>
      <Keypad keypress={keypress}></Keypad>
    </span>
  );
}

export default Panel;
