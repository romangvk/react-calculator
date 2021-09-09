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
      case "(":
        // don't put an open paren after a decimal point
        if (!/\.$/.test(prev)) setText(prev + "(");
        break;
      case ")":
        // only put a close paren if there is an open paren that has not been closed
        if (
          /(\d|\))$/.test(prev) &&
          (prev.match(/\(/g) || []).length > (prev.match(/\)/g) || []).length
        )
          setText(prev + ")");
        break;
      case "↩":
        setText(prev.replace(/.$/, ""));
        break;
      case "^":
      case "/":
      case "*":
      case "+":
        // only add an operator after a number or close paren
        if (/(\d|\))$/.test(prev)) setText(prev + key);
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
        if (!/\.\d*$/.test(prev)) setText(prev + ".");
        break;
      case "=":
        // evaluate if the expression ends in a number or a close paren
        // and also that the number of close parens matches the number of open parens
        if (
          /(\d|\))$/.test(prev) &&
          (prev.match(/\(/g) || []).length ===
            (prev.match(/\)/g) || []).length
        )
          setText(String(evaluate(prev)).replace(/e\+?/, "*10^"));
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
