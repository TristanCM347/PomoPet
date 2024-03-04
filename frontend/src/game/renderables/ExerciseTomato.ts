import { Vector2, objects_zIndex } from "../../common";
import { Sprite } from "./Sprite";
import * as PIXI from 'pixi.js';

export class ExerciseTomato extends Sprite {

  position: Vector2;
  readonly tomatoStates: Array<PIXI.Sprite> = [PIXI.Sprite.from('pngs/ExerciseState2.png'),
  PIXI.Sprite.from('pngs/ExerciseState1.png')];
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

    if (this.state == 1) {
      const jumpCloud = PIXI.Sprite.from('pngs/jumpCloud.png')
      jumpCloud.anchor.set(0.5);
      jumpCloud.x = this.position.x - 10;
      jumpCloud.y = this.position.y + 100;
      jumpCloud.width = 125;
      jumpCloud.height = 75;
      jumpCloud.zIndex = objects_zIndex;
      parentContainer.addChild(jumpCloud)
    }
    parentContainer.addChild(tomato)
  }

  t = 0;
  idleAnimation(): void {
    if (this.state == 1) {
      this.position.y += 50;
      this.state = 0
    } else {
      this.position.y -= 50;
      this.state = 1;;
    }
  }
}