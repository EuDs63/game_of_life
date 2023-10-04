import { Universe } from "wasm-game-of-life-euds63"; 

const universe = Universe.new();

export function getWidth() {
  return universe.width();
}

export function getHeight() {
  return universe.height();  
}

export function tick() {
  universe.tick();
}
