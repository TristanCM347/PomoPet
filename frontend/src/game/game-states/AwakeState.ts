import { AWAKECOUNT, AWAKETIMEOUT, CANVASHEIGHT, CANVASWIDTH, getRandomInt } from "../../common";
import { GameController } from "../GameController";
import { GrassBackground } from "../renderables/GrassBackground";
import { Spike } from "../renderables/Spike";
import { TomatoSide } from "../renderables/TomatoSide";
import { GameState } from "./GameState";
import * as PIXI from 'pixi.js';
import { GROUND_LEVEL } from "./constants";
import { GenericText } from "../renderables/GenericText";
import { Timer } from "../renderables/Timer";
import { IdleState } from "./IdleState";

export class AwakeState extends GameState {
  gameController: GameController
  app: PIXI.Application<PIXI.ICanvas>

  constructor(gameController: GameController) {
    super();
    this.gameController = gameController;
    this.app = gameController.app;
    this.enterState();
  }

  callbacks: any[] = []
  intervalId: number = -1;
  userInputCallback: any;
  grassBackground1: GrassBackground = new GrassBackground({x: 0, y: CANVASHEIGHT - 150});
  grassBackground2: GrassBackground = new GrassBackground({x: CANVASWIDTH, y: CANVASHEIGHT - 150})
  speed = 10;

  tomato: TomatoSide = new TomatoSide({x: 100, y: CANVASHEIGHT - 150})
  spikes: Spike[] = [];
  t = 0;
  LOW = 80;
  HIGH = 100;
  interval = getRandomInt(this.LOW, this.HIGH);
  mode = 'waiting'
  timer: Timer = new Timer({x: 250, y: 70}, AWAKECOUNT, 'Your Pomo Pet is awake\n and you\'ve earned a break!\n TIME REMAINING: ')
  instructions: GenericText[] = [new GenericText({x: CANVASWIDTH / 2, y: CANVASHEIGHT / 2 - 100}, '"Can you play this awesome game with me?"'), new GenericText({x: CANVASWIDTH / 2, y: CANVASHEIGHT / 2 - 70}, 'press [space] to jump')];


  enterState() {
    this.app.ticker.maxFPS = 30;
    const audio = new Audio('../../public/PomoPetTheme.mp3');
    audio.loop = true;
    audio.play();
    this.userInputCallback = (event: KeyboardEvent) => {
      const key = event.key;
      if (this.mode == 'waiting') {
        if (key == ' ') {
          this.mode = 'playing';
          this.tomato.jump();
        }
      } else if (this.mode == 'playing') {
        if (key == ' ') {
          if (this.tomato.position.y == GROUND_LEVEL) {
            this.tomato.jump();
          }
        }
      } else if (this.mode == 'game-over') {
        if (key == ' ') {
          this.tomato.sprite = this.tomato.normalSprite;
          this.spikes = [];
          this.grassBackground1 = new GrassBackground({x: 0, y: CANVASHEIGHT - 150});
          this.grassBackground2 = new GrassBackground({x: CANVASWIDTH, y: CANVASHEIGHT - 150});
          this.tomato.dead = false;
          this.tomato.position.x = 100;
          this.mode = 'playing'
        }
      }
    }

    document.addEventListener('keydown', this.userInputCallback);
    
    const callback = (d: number) => {
      this.app.stage.removeChildren()

      if (this.mode == 'waiting') {
        for (let text of this.instructions) {
          text.render(this.app.stage)
        }

      } else if (this.mode == 'playing') {
        this.grassBackground1.position.x -= this.speed * d;
        this.grassBackground2.position.x -= this.speed * d;
  
        if (this.grassBackground1.position.x < -CANVASWIDTH) {
          this.grassBackground1.position.x = 0;
          this.grassBackground2.position.x = CANVASWIDTH;
        }
        
        this.t += d;
        if (this.t > this.interval) {
          this.t = 0;
          this.interval = getRandomInt(this.LOW, this.HIGH);
          this.spikes.push(new Spike({x: CANVASWIDTH + 100, y: GROUND_LEVEL}));
        }
  
        for (let spike of this.spikes) {
          spike.position.x -= this.speed * d;
  
          if (spike.position.x < -20) {
            this.spikes = this.spikes.filter(s => s != spike);
          }
        }
  
        this.tomato.updateY(d)
  
        for (let spike of this.spikes) {
          if (this.tomato.collidesWith(spike)) {
            this.mode = 'game-over'
            this.tomato.position.x -= 50;
            this.tomato.dead = true;
          }
        }
      } else if (this.mode == 'game-over') {
        this.instructions = [new GenericText({x: CANVASWIDTH / 2, y: CANVASHEIGHT / 2 - 70}, 'press [space] to try again'), new GenericText({x: CANVASWIDTH / 2, y: CANVASHEIGHT / 2 - 100}, '"Oh no the spikes got me! Game over!"')]
        
        for (let text of this.instructions) {
          text.render(this.app.stage)
        }
      }

      this.timer.render(this.app.stage)

      this.grassBackground1.render(this.app.stage);
      this.grassBackground2.render(this.app.stage);
      this.tomato.render(this.app.stage)
      for (let spike of this.spikes) {
        spike.render(this.app.stage)
      }

    };

    this.intervalId = setInterval(() => {
      this.timer.decrement()
    }, 1000)

    setTimeout(() => {
      this.gameController.changeGameState(new IdleState(this.gameController));
      audio.pause();
    }, AWAKETIMEOUT)


    this.callbacks.push(callback)
    this.app.ticker.add(callback)
  }
  

  /**
   * remove all callbacks added to the ticker
   */
  leaveState() {
    this.callbacks.forEach(callback => {this.app.ticker.remove(callback)});
    document.removeEventListener('keydown', this.userInputCallback);
    clearInterval(this.intervalId);
    this.app.stage.removeChildren();
  }


}