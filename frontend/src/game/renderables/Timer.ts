
import * as PIXI from 'pixi.js';
import { Vector2, foreground_zIndex } from "../../common";
import { Sprite } from './Sprite';


export class Timer extends Sprite {
  position: Vector2;
  value: number;
  othertext: string

  constructor(position: Vector2, initialValue: number, othertext: string) {
    super();
    this.position = position;
    this.value = initialValue;
    this.othertext = othertext
  }

  render(parentContainer: PIXI.Container<PIXI.DisplayObject>) {
    let message = new PIXI.Text(`${this.othertext} ${this.value}`, {
      fontFamily: 'Arial', // Font family
      fontSize: 36,        // Font size
      fill: 0xff10f0,      // Fill color
      align: 'center',     // Text alignment
      stroke: '#ffffff',   // Stroke color
      strokeThickness: 4   // Stroke thickness
  });

    message.anchor.set(0.5);
    message.x = this.position.x
    message.y = this.position.y
    message.zIndex = foreground_zIndex;
    parentContainer.addChild(message)
  }

  decrement() {
    this.value--;
  }
}