import { Universe } from "wasm-game-of-life";
import { Play_Pause_Control } from "./play_pause_control.js";
import { Canvas } from "./canvas.js";

// construct the universe 
let universe = Universe.new();

const canvas = new Canvas(universe);


// 构造负责绘制的渲染器
const renderer = canvas.renderer;

let animationId = -1;

const renderLoop = () => {
    //debugger;
    renderer.drawGrid();
    renderer.drawCells();

    const tickControl = document.querySelector("#tick-control");
    for (let i = 0; i < tickControl.value; i++) {
        universe.tick();
    }

    animationId = requestAnimationFrame(renderLoop);
};


// 获取播放按钮
const play_control = new Play_Pause_Control();

// 开始
const start = () => {
    renderer.drawGrid();
    renderer.drawCells();
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

// 获取刷新按钮
const fresh_button = document.getElementById('refresh');
fresh_button.addEventListener('click', _ => {
    universe.refresh();
    fresh_button.textContent = "✅";
    cancelAnimationFrame(animationId);
    animationId = -1;
    start();

    setTimeout(() => {
        fresh_button.textContent = "🔁";
    }, 1000);
})

// 获取清空按钮
const clear_button = document.getElementById('clear');
clear_button.addEventListener('click', _ =>{
    universe.clear();
    clear_button.textContent = "✅";
    cancelAnimationFrame(animationId);
    renderer.drawGrid();
    renderer.drawCells();   animationId = -1;

    setTimeout(() => {
        clear_button.textContent = "🧹";
    }, 1000);
})



start();

