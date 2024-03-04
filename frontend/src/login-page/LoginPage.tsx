import React, { Dispatch, SetStateAction } from "react";
import { gameController } from "../game/GameSetup";
import { rootStyles } from "../common";

export function LoginPage({
  setPlaying,
}: {
  setPlaying: any
}) {

  const loginPageStyles: React.CSSProperties = {
    backgroundColor: "white",
    border: "2px solid black",
    padding: "1em",
    margin: 'auto',
    maxWidth: '500px',
    marginTop: '200px'
  };

  return (
    <div style={rootStyles}>
      <div style={loginPageStyles}>
        <h2>Login Page</h2>
        <div>enter your username</div>
        <input></input>
        <div>enter your password</div>
        <input></input>
        
        <div>

          <button
            onClick={() => {
              setPlaying(true);
              gameController.loadGame();
            }}
          >
            start game
          </button>
        </div>
      </div>
    </div>
  );
}
