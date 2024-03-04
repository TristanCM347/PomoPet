import * as PIXI from 'pixi.js';
import { Vector2 } from '../common';
import { Sprite } from './renderables/Sprite';
import { Bunny } from './renderables/Bunny';
import { GameState, IdleState } from './game-states/IdleState';
import { TitleState } from './game-states/TitleState';
import { AwakeState } from './game-states/AwakeState';
import { ExerciseState } from './game-states/ExerciseState';

export const NODERADIUS = 50;
export const LINEWIDTH = 2;


export class GameController {
  app: PIXI.Application<PIXI.ICanvas>
  canvas: HTMLCanvasElement
  state: GameState;
  // used for game logic only!!!
  idleCycleCount: number;

  /**
   * initializes the app. Doesn't actually do anything
   * @param app
   */
  constructor(app: PIXI.Application<PIXI.ICanvas>, canvas: HTMLCanvasElement) {
    this.app = app;
    this.state = new TitleState();
    this.canvas = canvas;
    this.idleCycleCount = 0;
  }

  hideCanvas() {
    this.canvas.style.display = 'none'
  }

  showCanvas() {
    this.canvas.style.display = 'block'
  }

  /**
   * called when the user logs in
   */
  loadGame() {
    // this.changeGameState(new AwakeState(this))
    this.changeGameState(new IdleState(this))
    //this.changeGameState(new ExerciseState(this))
  }

  changeGameState(newState: GameState) {
    this.state.leaveState();
    this.state = newState;
  }

  printMsg() {
    console.log('hello from gamecontroller');
    
  }
}