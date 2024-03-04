import * as PIXI from 'pixi.js';
import { Vector2, background_zIndex} from "../../common";
import { Sprite } from './Sprite';
import { CANVASHEIGHT, CANVASWIDTH , DAY_SKY_COLOR, NIGHT_SKY_COLOR} from "../../common";
import * as TWEEN from '@tweenjs/tween.js'

export class Sky extends Sprite {
  position: Vector2;
  color = DAY_SKY_COLOR;
  rec : PIXI.Graphics;
  app: PIXI.Application<PIXI.ICanvas>

  constructor(position: Vector2, app: PIXI.Application<PIXI.ICanvas>) {
    super();
    this.position = position;
    this.rec = new PIXI.Graphics();
    this.app = app;
  }

  render(parentContainer: PIXI.Container<PIXI.DisplayObject>) {
    this.rec.beginFill(this.color);
    this.rec.drawRect(0, 0, CANVASHEIGHT, CANVASWIDTH); // (x, y, width, height)
    this.rec.endFill();
    this.rec.zIndex = background_zIndex;
    parentContainer.addChild(this.rec)
  }

  checkTransition(planetOuput : number) {
    if (planetOuput == 0) {
        this.colorTransition(DAY_SKY_COLOR);
    } else if (planetOuput == 1) {
        this.colorTransition(NIGHT_SKY_COLOR);
    }
  }

  colorTransition(color : number) {
    new TWEEN.Tween(this.rec)
    .to({ tint: color }, 200) // 2000 milliseconds duration
    .start(); 

    this.app.ticker.add(() => {
        TWEEN.update();
    });
  }

  changeColor(color : number) {
    this.color = color;
  }
}