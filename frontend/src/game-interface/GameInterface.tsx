import React, { useState } from "react";
import { rootStyles } from "../common";

export async function LeaderBoard({ setShowLeaderboard }: { setShowLeaderboard: any }) {

  const leaderBoardStyles: React.CSSProperties = {
    backgroundColor: "white",
    border: "2px solid black",
    padding: "1em",
    marginTop: '100px',
    margin: 'auto',
    maxWidth: '500px',
    textAlign: 'left'
  };

  const leaderboard = fetch("http://localhost:3000/leaderboard", {
    method: "GET"
  });

  console.log(leaderboard);


  return (
    <div style={leaderBoardStyles}>
      <button onClick={() => setShowLeaderboard(false)}>close leaderboard</button>
      <h1>leaderboard</h1>
      <div>#1</div>
      <div>#2</div>
      <div>#3</div>

    </div>
  )
}

export function GameInterface() {
  const [showLeaderBoard, setShowLeaderboard] = useState(false);

  const flexBoxStyles: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'right',
    padding: '1em'
  }

  return (
    <div style={rootStyles}>
      <div style={flexBoxStyles}><button onClick={() => setShowLeaderboard(true)}>show leaderboard</button></div>
      {showLeaderBoard && <LeaderBoard setShowLeaderboard={setShowLeaderboard} />}

    </div>
  );
}
