import * as PIXI from 'pixi.js';
import { Vector2, background_zIndex} from "../../common";
import { Sprite } from './Sprite';
import { CANVASHEIGHT, CANVASWIDTH } from "../../common";


export class Cloud extends Sprite {
  position: Vector2;
  t = 0;

  constructor(position: Vector2) {
    super();
    this.position = position;
  }

  render(parentContainer: PIXI.Container<PIXI.DisplayObject>) {
    const texture = PIXI.Texture.from('./pngs/cloud3.png')
    const cloud = PIXI.Sprite.from(texture)
    cloud.x = this.position.x;
    cloud.y = this.position.y
    cloud.height = 100;
    cloud.width = 200;
    cloud.zIndex = background_zIndex;
    parentContainer.addChild(cloud)
  }

  move(d: number) {
    this.position.x += (Math.random() * 50 + 5) * (d / 100);

    if (this.position.x > CANVASWIDTH) {
        this.position.x = -50;
    }
  }

}