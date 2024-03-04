import { Vector2, objects_zIndex } from "../../common";
import { Sprite } from "./Sprite";
import * as PIXI from 'pixi.js';

export class SleepingTomato extends Sprite {

  position: Vector2;
  readonly tomatoStates: Array<PIXI.Sprite> = [PIXI.Sprite.from('pngs/sleepState1.png'),
  PIXI.Sprite.from('pngs/sleepState2.png'), PIXI.Sprite.from('pngs/sleepState3.png')];
  state: number;
  constructor(position: Vector2) {
    super();
    this.position = position;
    this.state = 0;
  }

  render(parentContainer: PIXI.Container<PIXI.DisplayObject>) {
    const tomato = this.tomatoStates[this.state]
    tomato.anchor.set(0.5);
    tomato.x = this.position.x;
    tomato.y = this.position.y;
    tomato.width = 200;
    tomato.height = 150;
    tomato.zIndex = objects_zIndex;
    parentContainer.addChild(tomato)
  }

  t = 0;
  idleAnimation(): void {
    if (this.state == 2) {
      this.state = 0
    } else {
      this.state++;
    }
  }
}