
import * as PIXI from 'pixi.js';
import { Vector2 } from "../../common";
import { Sprite } from './Sprite';


export class Spike extends Sprite {
  position: Vector2;
  sprite: PIXI.Sprite;
  hitbox: PIXI.Rectangle = new PIXI.Rectangle(0, 0, 0, 0);

  constructor(position: Vector2) {
    super();
    this.position = position;
    this.sprite = PIXI.Sprite.from('pngs/spike.png');
    this.sprite.width = 70;
    this.sprite.height = 70;
  }

  render(parentContainer: PIXI.Container<PIXI.DisplayObject>) {
    // const texture = PIXI.Texture.from('pngs/pure-grass.png')
    // console.log(texture)
    this.sprite.x = this.position.x - this.sprite.width / 2;
    this.sprite.y = this.position.y - this.sprite.height / 2;

    const hitboxWidth = this.sprite.width * 0.8; // Adjust the factor as needed
    const hitboxHeight = this.sprite.height * 0.8; // Adjust the factor as needed

    // Calculate hitbox position (centered at sprite's center)
    const hitboxX = this.sprite.x - hitboxWidth / 2;
    const hitboxY = this.sprite.y - hitboxHeight / 2;

    // Create hitbox rectangle
    this.hitbox = new PIXI.Rectangle(hitboxX, hitboxY, hitboxWidth, hitboxHeight);

    parentContainer.addChild(this.sprite)
  }

}