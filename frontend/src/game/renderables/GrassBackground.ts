
import * as PIXI from 'pixi.js';
import { Vector2 } from "../../common";
import { Sprite } from './Sprite';


export class GrassBackground extends Sprite {
  position: Vector2;

  constructor(position: Vector2) {
    super();
    this.position = position;
  }

  render(parentContainer: PIXI.Container<PIXI.DisplayObject>) {
    // const texture = PIXI.Texture.from('pngs/pure-grass.png')
    // console.log(texture)
    const background = PIXI.Sprite.from('pngs/pure-grass.png')
    background.x = this.position.x;
    background.y = this.position.y;
    parentContainer.addChild(background)
  }

}