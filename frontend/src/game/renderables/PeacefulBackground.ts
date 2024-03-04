import * as PIXI from 'pixi.js';
import { Vector2, background_zIndex} from "../../common";
import { Sprite } from './Sprite';
import { CANVASHEIGHT, CANVASWIDTH } from "../../common";


export class PeacefulBackground extends Sprite {
  position: Vector2;

  constructor(position: Vector2) {
    super();
    this.position = position;
  }

  render(parentContainer: PIXI.Container<PIXI.DisplayObject>) {
    const texture = PIXI.Texture.from('./pngs/background-peaceful.png')
    const background = PIXI.Sprite.from(texture)
    background.x = this.position.x;
    background.y = this.position.y
    background.height = CANVASHEIGHT;
    background.width = CANVASWIDTH;
    background.zIndex = background_zIndex;
    parentContainer.addChild(background)
  }

}