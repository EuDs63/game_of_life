import { Universe, Cell } from "wasm-game-of-life";
import * as logic from "./logic.js";
import { Renderer,CELL_SIZE } from "./renderer.js"; 
import { Play_Pause_Control } from "./play_pause_control.js";

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

let animationId = -1;

const renderLoop = () => {
    //debugger;
    renderer.drawGrid(context);
    renderer.drawCells(context,universe);

    universe.tick();
    animationId = requestAnimationFrame(renderLoop);
};


// 获取按钮
const play_control = new Play_Pause_Control(document.getElementById("play-pause"));

// 开始
const start = () => {
    play_control.play();
    renderLoop();
};

play_control.button.addEventListener("click", _event => {
    if (play_control.is_paused(animationId)) {
        start();
    } else {
        animationId = play_control.pause(animationId);
    }
});

renderer.drawGrid(context);
renderer.drawCells(context, universe);
start();

