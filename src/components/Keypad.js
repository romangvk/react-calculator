function Keypad({keypress}) {
  let keys = ['/', '*', '-', '7', '8', '9', '4', '5', '6', '1', '2', '3', '.'];
  return (
    <div className="container">
      <button type="button" className="key1" onClick={() => keypress('C')}>C</button>
      <button type="button" className="key2" onClick={() => keypress('+')}>+</button>
      <button type="button" className="key3" onClick={() => keypress('0')}>0</button>
      <button type="button" className="key4" onClick={() => keypress('=')}>=</button>
      {keys.map((k, i) => (
        <button type="button" onClick={() => keypress(k)} key={i}>
          {k}
        </button>
      ))}
    </div>
  );
}

export default Keypad;
