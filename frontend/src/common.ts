
export interface Vector2 {
  x: number,
  y: number
}

export const rootStyles: React.CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  width: '100vh',
  height: '100vh',
};

export const CANVASWIDTH = 500
export const CANVASHEIGHT = 500

export function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
export const IDLECOUNT = 5
export const IDLETIMEOUT = IDLECOUNT * 1000;

export const AWAKECOUNT = 10;
export const AWAKETIMEOUT = AWAKECOUNT * 1000;

export const EXERCISECOUNT = 10;
export const EXERCISETIMEOUT = EXERCISECOUNT * 1000;

// Rendering Priorities
export const background_zIndex = 0;
export const objects_zIndex = 2;
export const foreground_zIndex = 4;

// Change Sun/Moon theshold
export const CHANGE_PLANET_Y_THRESHOLD = 350;
export const CHANGE_PLANET_X_THRESHOLD = 350;

// Sky color

export const DAY_SKY_COLOR = 0x08f4e2;
export const NIGHT_SKY_COLOR = 0x5a35d4;
export const EXERCISE_SKY_COLOR = 0x0ea7f2;