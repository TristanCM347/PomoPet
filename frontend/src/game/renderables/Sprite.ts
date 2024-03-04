import * as PIXI from 'pixi.js';
import { Vector2 } from "../../common";


export abstract class Sprite {
  abstract position: Vector2;
  abstract render(parentContainer: PIXI.Container<PIXI.DisplayObject>): void;
  // abstract update(d: number): void
}

