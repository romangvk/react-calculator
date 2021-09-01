import { useEffect, useRef } from "react";

function Output({ text }) {
  let outputEl = useRef(null);

  // scroll to the bottom
  useEffect(() => {
    outputEl.current.scrollTop = outputEl.current.scrollHeight;
  }, [text]);

  return (
    <div
      ref={outputEl}
      // shrink font-size when amount of text increases
      className={`output ${text.length >= 10 ? " smaller" : ""} ${
        text.length >= 20 ? " smallest" : ""
      }`}
    >
      {text}
    </div>
  );
}

export default Output;
