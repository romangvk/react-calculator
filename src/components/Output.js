import { useEffect, useRef } from "react";

function Output({ text }) {
  let outputEl = useRef(null);

  // scroll to the right 
  useEffect(() => {
    outputEl.current.scrollLeft = outputEl.current.scrollWidth;
  }, [text]);

  return (
    <div ref={outputEl} className="output">
      {text}
    </div>
  );
}

export default Output;
