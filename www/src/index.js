import { Universe, Cell } from "wasm-game-of-life";
import { memory } from "wasm-game-of-life/wasm_game_of_life_bg";
import * as logic from "./logic.js";
import * as rendering from "./rendering.js";

// some constants that we will use when rendering to the canvas
const CELL_SIZE = 5; // px
const GRID_COLOR = "#CCCCCC";
const DEAD_COLOR = "#FFFFFF";
const ALIVE_COLOR = "#000000";

// construct the universe 
const universe = Universe.new();
const width = universe.width();
const height = universe.height();

// give the canvas room for all of the cells and a 1px border around each of them
const canvas = document.getElementById("game-of-life-canvas");
canvas.height = (CELL_SIZE + 1) * height + 1;
canvas.width = (CELL_SIZE + 1) * width + 1;

const context = canvas.getContext('2d');

let animationId = null;

const renderLoop = () => {
    //debugger;
    rendering.drawGrid(context,width,height);
    rendering.drawCells(context,universe,width,height);

    universe.tick();
    animationId = requestAnimationFrame(renderLoop);
};

const isPaused = () => {
    return animationId === null;
}

// 获取按钮
const playPauseButton  = document.getElementById("play-pause");

// 开始
const play = () => {
    playPauseButton.textContent = "⏸";
    renderLoop();
};

// 暂停
// 将animationId置为null，以判断是否暂停
const pause = () => {
    playPauseButton.textContent = "▶";
    cancelAnimationFrame(animationId);
    animationId = null;
};

playPauseButton.addEventListener("click", _event => {
    if (isPaused()) {
        play();
    } else {
        pause();
    }
});

// drawGrid();
// drawCells();
rendering.drawGrid(context, width, height);
rendering.drawCells(context, universe, width, height);
//requestAnimationFrame(renderLoop);
play();

