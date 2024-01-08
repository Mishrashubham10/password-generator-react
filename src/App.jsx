/* eslint-disable no-unused-vars */
import { useCallback, useEffect, useRef, useState } from 'react';

const App = () => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const passwordRef = useRef(null);

  const generatePassword = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    if (numberAllowed) str += '0123456789';
    if (charAllowed) str += '!@#$%^&*()_+';

    for (let i = 1; i < length; i++) {
      const char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  useEffect(() => {
    generatePassword();
  }, [length, numberAllowed, charAllowed]);

  const copyPassword = () => {
    // CHECKING OUT CLIPBOARD
    window.navigator.clipboard.writeText(password);
    passwordRef.current?.select();
  };

  return (
    <div className="container">
      <h1 className="heading">Password Generator</h1>
      <div className="content">
        <input
          type="text"
          value={password}
          className="input"
          placeholder="Password"
          readOnly
          ref={passwordRef}
        />
        <button className="btn" onClick={copyPassword}>
          copy
        </button>
      </div>
      <div className="range">
        <div className="rangeContent">
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            className="rangeInput"
            onChange={(e) => setLength(e.target.value)}
          />
          <label htmlFor="length">Length: {length}</label>
        </div>
        <div className="rangeContent">
          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            onChange={() => {
              setNumberAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="number">Numbers</label>
        </div>
        <div className="rangeContent">
          <input
            type="checkbox"
            defaultChecked={charAllowed}
            onChange={() => {
              setCharAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="charInput">Character</label>
        </div>
      </div>
    </div>
  );
};

export default App;