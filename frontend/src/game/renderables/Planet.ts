import * as PIXI from 'pixi.js';
import { Vector2, background_zIndex} from "../../common";
import { Sprite } from './Sprite';
import { CANVASHEIGHT, CANVASWIDTH, CHANGE_PLANET_Y_THRESHOLD, CHANGE_PLANET_X_THRESHOLD } from "../../common";


export class Planet extends Sprite {
  position: Vector2;
  readonly saved_x;
  readonly saved_y;
  is_going_down = false;
  state = 0;
  
  readonly   planetStates: Array<PIXI.Sprite> = [PIXI.Sprite.from('pngs/sun.png'),
  PIXI.Sprite.from('pngs/moon2.png')];

  constructor(position: Vector2) {
    super();
    this.position = position;
    this.saved_x = position.x;
    this.saved_y = position.y;
  }

  render(parentContainer: PIXI.Container<PIXI.DisplayObject>) {
    const planet = this.planetStates[this.state];
    planet.x = this.position.x;
    planet.y = this.position.y
    planet.height = 150;
    planet.width = 150;
    planet.zIndex = background_zIndex;
    parentContainer.addChild(planet)
  }


    move(d: number): number {
        this.position.x += 25 * (d / 100);

        if (!this.is_going_down) {
            this.position.y -= 25 * (d / 100);
        } else {
            this.position.y += 45 * (d / 100);
        }

        if (this.position.x >= CHANGE_PLANET_X_THRESHOLD && this.position.y >= CHANGE_PLANET_Y_THRESHOLD) {
          this.position.x = this.saved_x;
          this.position.y = this.saved_y;
          
          return this.changeState()
        } else if (this.position.y <= 50) {
            this.is_going_down = true;
        }

        return -1;
    }

    changeState() : number{
      if (this.state == 0) {
        this.state = 1;
      } else {
        this.state = 0;
      }

      this.is_going_down = false;
      return this.state;
    }
}