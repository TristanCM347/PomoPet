
import * as PIXI from 'pixi.js';
import { CANVASHEIGHT, Vector2 } from "../../common";
import { Sprite } from './Sprite';
import { Spike } from './Spike';
import { GROUND_LEVEL } from '../game-states/constants';



export class TomatoSide extends Sprite {
  position: Vector2;
  sprite: PIXI.Sprite;
  normalSprite:PIXI.Sprite = PIXI.Sprite.from('/pngs/tomato-sideview.png');
  jumpingSprite: PIXI.Sprite = PIXI.Sprite.from('/pngs/tomato-sideview2.png');
  deadSprite: PIXI.Sprite = PIXI.Sprite.from('pngs/tomato-dead.png')
  hitbox: PIXI.Rectangle = new PIXI.Rectangle(0, 0, 0, 0);;

  constructor(position: Vector2) {
    super();
    this.position = position;
    this.normalSprite.width = 70;
    this.normalSprite.height = 70;
    this.jumpingSprite.width = 70;
    this.jumpingSprite.height = 70;
    this.deadSprite.width = 70;
    this.deadSprite.height = 70;

    this.sprite = this.normalSprite;

  }

  ySpeed = 0;
  gravity = 8000;

  jump() {
    this.ySpeed = -1400;
  } 

  updateY(d: number) {
    this.ySpeed += this.gravity * (d / 100);
    this.position.y += this.ySpeed * (d / 100);
    if (this.position.y > CANVASHEIGHT - 150) {
      this.position.y = CANVASHEIGHT - 150;
    }
  }

  collidesWith(spike: Spike) {
    const rect1 = this.hitbox;
    const rect2 = spike.hitbox;
    const isIntersecting = rect1.x < rect2.x + rect2.width &&
                       rect1.x + rect1.width > rect2.x &&
                       rect1.y < rect2.y + rect2.height &&
                       rect1.y + rect1.height > rect2.y;
    return isIntersecting;

  }

  dead = false;

  render(parentContainer: PIXI.Container<PIXI.DisplayObject>) {
    // const texture = PIXI.Texture.from('pngs/pure-grass.png')
    // console.log(texture)
    if (this.dead) {
      this.sprite = this.deadSprite;
    } else {
      if (this.position.y < GROUND_LEVEL - 10) {
        this.sprite = this.jumpingSprite;
      } else {
        this.sprite = this.normalSprite;
      }
    }



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