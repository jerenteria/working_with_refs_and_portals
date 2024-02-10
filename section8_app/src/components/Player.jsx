import { useState, useRef } from 'react';

export default function Player() {
  const playerName = useRef();

  const [enteredPlayerName, setEnteredPlayerName] = useState('');

  // playerName stores entered value during input in ref allowing you to render it later making it easier than useState
  function handleClick() {
    setEnteredPlayerName(playerName.current.value);
  };


  return (
    <section id="player">
      {/* if enteredPlayerName is valid(not an empty string) then render it if not then render 'unkown entity' */}
      <h2>Welcome {enteredPlayerName ? enteredPlayerName : 'unknown entity'}</h2>
      <p>
        <input ref={playerName} type="text"/>
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
