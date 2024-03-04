import React, { useEffect, useRef } from "react";
import * as PIXI from "pixi.js";
import { CANVASHEIGHT, CANVASWIDTH } from "../common";
import { GameController } from "./GameController";
import "./game.css";

export function Game() {
  const canvas = useRef() as any;
  let id = '';

  useEffect(() => {
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      const name = "id";
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === `${name}=`) {
          id = decodeURIComponent(cookie.substring(name.length + 1));
        }
      }
    }



    console.log(id);
  }, [])


  useEffect(() => {
    const app = new PIXI.Application({
      view: canvas.current,
      width: CANVASWIDTH,
      height: CANVASHEIGHT,
      backgroundColor: "lightblue",
    });
    const gameController = new GameController(app, canvas);
    gameController.loadGame();
  });

  const canvasStyles: React.CSSProperties = {
    border: "2px solid black",
  };

  return (
    <>
      <div
        style={{
          textAlign: "center",
          backgroundImage: "url(pngs/game-background2.jpg)",
          height: "100%",
          backgroundSize: "cover",
          margin: 0,
          padding: 0,
        }}
      >
        <div id="title2"> POMO PET </div>
        <canvas ref={canvas} style={canvasStyles}></canvas>
        <button id="main-menu-button" class="small-button" onClick={() => window.location.reload()}>Main Menu</button>
      </div>
    </>
  );
}
