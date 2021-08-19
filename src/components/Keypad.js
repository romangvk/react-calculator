function Keypad() {
  return (
    <div className="container">
      {[
        "C",
        "%",
        "()",
        "↩",
        "e",
        "^",
        "√",
        "/",
        7,
        8,
        9,
        "*",
        4,
        5,
        6,
        "-",
        1,
        2,
        3,
        "+",
        "±",
        0,
        ".",
        "=",
      ].map((n, i) => (
        <button type="button" className={`key-${i}`} key={i}>
          {n}
        </button>
      ))}
    </div>
  );
}

export default Keypad;
