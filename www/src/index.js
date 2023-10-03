import { Universe, Cell } from "wasm-game-of-life";
import * as logic from "./logic.js";
import { Renderer,CELL_SIZE } from "./renderer.js"; 

// construct the universe 
const universe = Universe.new();
const width = universe.width();
const height = universe.height();

// 构造负责绘制的渲染器
const renderer = new Renderer(width,height);


// give the canvas room for all of the cells and a 1px border around each of them
const canvas = document.getElementById("game-of-life-canvas");

// 设置canvas大小
canvas.height = (CELL_SIZE + 1) * height + 1;
canvas.width = (CELL_SIZE + 1) * width + 1;

const context = canvas.getContext('2d');

let animationId = null;

const renderLoop = () => {
    //debugger;
    renderer.drawGrid(context);
    renderer.drawCells(context,universe);

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

renderer.drawGrid(context);
renderer.drawCells(context, universe);
play();

