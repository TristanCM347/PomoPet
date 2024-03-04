import * as PIXI from "pixi.js";
import { GameController } from "./GameController";
import { CANVASHEIGHT, CANVASWIDTH } from "../common";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const app = new PIXI.Application({
  view: canvas,
  width: CANVASWIDTH,
  height: CANVASHEIGHT,
  backgroundColor: "lightblue",
});

export const gameController = new GameController(app, canvas);
gameController.hideCanvas();

// REMOVE THIS LINE TO SHOW LOGIN PAGE UPON ENTERING
// gameController.loadGame()