import * as PIXI from 'pixi.js';
import { Vector2, background_zIndex} from "../../common";
import { Sprite } from './Sprite';
import { CANVASHEIGHT, CANVASWIDTH } from "../../common";


export class SmallItem extends Sprite {
  position: Vector2;
  t = 0;
  path : string;
  item : PIXI.Sprite

  constructor(position: Vector2, path : string) {
    super();
    this.position = position;
    this.path = path;
    this.item = PIXI.Sprite.from(this.path)
    this.item.anchor.set(0.5);
  }

  render(parentContainer: PIXI.Container<PIXI.DisplayObject>) {
    this.item.x = this.position.x;
    this.item.y = this.position.y
    this.item.height = 100;
    this.item.width = 200;
    this.item.zIndex = background_zIndex;
    parentContainer.addChild(this.item)
  }

  move(d: number) {
    this.position.x += (Math.random() * 300 + 5) * (d / 100);
    this.item.rotation += 3 * d/100;

    if (this.position.x > CANVASWIDTH) {
        this.position.x = -50;
    }
  }

}