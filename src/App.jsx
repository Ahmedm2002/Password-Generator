import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [password, setpassword] = useState("");
  const [numbersAllowed, setNumbersAllowed] = useState(false);
  const [characterAllowed, setCharactersAllowed] = useState(false);
  const [length, setLength] = useState(8);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (numbersAllowed) {
      str += "1234567890";
    }
    if (characterAllowed) {
      str += "~!@#$%^&*()_+|\"}{?><.,/'][=-";
    }

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setpassword(pass);
  }, [numbersAllowed, characterAllowed, length, setpassword]);
  useEffect(() => {
    passwordGenerator();
  }, [length, numbersAllowed, characterAllowed, passwordGenerator]);

  const passwordRef = useRef(null);

  let copyPass = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-2xl rounded-lg px-4 py-3 bg-teal-600 mt-32">
        <h1 className="text-black text-xl font-bold  text-center my-3 ">
          Password Generator
        </h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            placeholder="Generate Random Password"
            className="outline-none w-full py-1 px-3 rounded-lg"
            value={password}
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPass}
            className="outline-none bg-blue-800 text-white px-3 py-0.5 shrink-0 "
          >
            Copy
          </button>
        </div>
        <input
          type="range"
          max={20}
          value={length}
          onChange={(event) => setLength(event.target.value)}
          min={8}
        />
        <br />
        <label>Length: {length} </label>

        <div>
          <input
            type="checkbox"
            onChange={() => {
              setCharactersAllowed((prev) => !prev);
            }}
          />
          <label> Characters</label>
          <br />
          <input
            type="checkbox"
            onChange={() => {
              setNumbersAllowed((prev) => !prev);
            }}
          />
          <label> Numbers</label>
        </div>
      </div>
    </>
  );
}
export default App;
