import { Universe } from "wasm-game-of-life";
import { Renderer } from "./renderer.js"; 
import { Play_Pause_Control } from "./play_pause_control.js";
import { Canvas } from "./canvas.js";

// construct the universe 
const universe = Universe.new();

const canvas = new Canvas(universe);


const context = canvas.context;

// 构造负责绘制的渲染器
const renderer = new Renderer(context, universe);

let animationId = -1;

const renderLoop = () => {
    //debugger;
    renderer.drawGrid();
    renderer.drawCells();

    universe.tick();
    animationId = requestAnimationFrame(renderLoop);
};


// 获取播放按钮
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

renderer.drawGrid();
renderer.drawCells();

start();

