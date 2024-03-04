import { GameController } from "../GameController";
import * as PIXI from 'pixi.js';
import { Bunny } from "../renderables/Bunny";
import { ExerciseTomato } from "../renderables/ExerciseTomato";
import { GrassBackground } from "../renderables/GrassBackground";
import { Sky } from "../renderables/Sky";
import { AwakeState } from "./AwakeState";
import { GameState } from "./GameState";
import { Timer } from "../renderables/Timer";
import { CANVASHEIGHT, EXERCISECOUNT, EXERCISETIMEOUT, EXERCISE_SKY_COLOR } from "../../common";
import { PeacefulBackground } from "../renderables/PeacefulBackground";
import { SmallItem } from "../renderables/SmallItem";
import { Planet } from "../renderables/Planet";
import { Game } from "../Game";
import { IdleState } from "./IdleState";


export class ExerciseState extends GameState {
  gameController: GameController
  app: PIXI.Application<PIXI.ICanvas>
  bunny: Bunny = new Bunny({x: 250, y:250});
  item1: SmallItem = new SmallItem({x: 50, y:50}, './pngs/dumbbell.png');
  item2: SmallItem = new SmallItem({x: 250, y:200}, './pngs/shoe.png');
  item3: SmallItem = new SmallItem({x: 250, y:120}, './pngs/bicycle.png');
  sky: Sky;
  peacefulBackground: PeacefulBackground = new PeacefulBackground({x: 0, y: 0});
  timer: Timer = new Timer({x: 250, y: 70}, EXERCISECOUNT, 'Enough time studying.\n Go outside and exercise!\n TIME REMAINING:')
  exerciseTomato: ExerciseTomato = new ExerciseTomato({x: 150, y:400});

  constructor(gameController: GameController) {
    super();
    this.gameController = gameController;
    this.app = gameController.app;

    this.sky = new Sky({x: 0, y:0}, this.app)
    this.sky.changeColor(EXERCISE_SKY_COLOR)
    this.enterState();
  }

  callbacks: any[] = []
  intervalId: number = -1;
  enterState() {
    this.app.ticker.maxFPS = 30;
    const audio = new Audio('../../public/PomoPetTheme.mp3');
    audio.loop = true;
    audio.play();
    (this.app.renderer as any).backgroundColor = 0x08f4e2;

    const callback = (d: number) => {
      this.app.stage.removeChildren()
      this.item1.move(d);
      this.item2.move(d);
      this.item3.move(d);

      // render
      this.sky.render(this.app.stage)
      this.item1.render(this.app.stage)
      this.item2.render(this.app.stage)
      this.item3.render(this.app.stage)
      this.peacefulBackground.render(this.app.stage);
      this.exerciseTomato.render(this.app.stage);

      this.timer.render(this.app.stage)
    };

    this.callbacks.push(callback)
    this.app.ticker.add(callback)

    this.intervalId = setInterval(() => {
      // update
      this.exerciseTomato.idleAnimation();
      this.timer.decrement();
    }, 1000)

    setTimeout(() => {
        this.gameController.changeGameState(new IdleState(this.gameController));
        audio.pause();
    }, EXERCISETIMEOUT )
  }

  /**
   * remove all callbacks added to the ticker
   */
  leaveState() {
    this.callbacks.forEach(callback => this.app.ticker.remove(callback));
    clearInterval(this.intervalId)
    this.app.stage.removeChildren();
  }
}

export { GameState };
