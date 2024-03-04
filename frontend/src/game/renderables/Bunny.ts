import { Vector2 } from "../../common";
import { Sprite } from "./Sprite";
import * as PIXI from 'pixi.js';

export class Bunny extends Sprite {

  position: Vector2
  constructor(position: Vector2) {
    super();
    this.position = position;
  }

  render(parentContainer: PIXI.Container<PIXI.DisplayObject>) {
    const bunny = PIXI.Sprite.from('https://pixijs.com/assets/bunny.png')
    bunny.anchor.set(0.5);
    bunny.x = this.position.x;
    bunny.y = this.position.y;
    parentContainer.addChild(bunny)
  }

  t = 0;
  idleAnimation(d: number): void {
    // console.log(d);
    this.t += d / 100;
    this.position.x = 250 + 100 * Math.sin(this.t)
  }

  awakeAnimation(d: number) {
    this.t += d / 100;
    this.position.y = 250 + 100 * Math.sin(this.t)
  }
}