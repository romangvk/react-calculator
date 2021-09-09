function Keypad({ keypress }) {
  let keys = [
    "(",
    ")",
    "^",
    "/",
    "*",
    "-",
    "7",
    "8",
    "9",
    "4",
    "5",
    "6",
    "1",
    "2",
    "3",
    ".",
  ];
  return (
    <div className="container">
      <button type="button" class="key-clear" onClick={() => keypress("C")}>
        C
      </button>
      <button type="button" class="key-back" onClick={() => keypress("↩")}>
        ↩
      </button>
      <button type="button" class="key-plus" onClick={() => keypress("+")}>
        +
      </button>
      <button type="button" class="key-0" onClick={() => keypress("0")}>
        0
      </button>
      <button type="button" class="key-equal" onClick={() => keypress("=")}>
        =
      </button>
      {keys.map((k, i) => (
        <button type="button" onClick={() => keypress(k)} key={i}>
          {k}
        </button>
      ))}
    </div>
  );
}

export default Keypad;
