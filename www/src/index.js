import { Universe } from "wasm_game_of_life_euds63";
import { Play_Pause_Control } from "./play_pause_control.js";
import { Canvas } from "./canvas.js";
import { Fps } from "./fps.js";
// construct the universe 
let universe = Universe.new();

const canvas = new Canvas(universe);


// 构造负责绘制的渲染器
const renderer = canvas.renderer;

// fps
const fps = new Fps();

let animationId = -1;

const renderLoop = () => {
    fps.render();
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

play_control.button.addEventListener("click", _ => {
    if (play_control.is_paused(animationId)) {
        start();
    } else {
        universe.execute_pause();
        animationId = play_control.pause(animationId);
    }
});

// 获取刷新按钮
const fresh_button = document.getElementById('refresh');
fresh_button.addEventListener('click', _ => {
    universe.refresh();
    fresh_button.textContent = "✅";
    start();
    setTimeout(() => {
        fresh_button.textContent = "🔁";
    }, 1000);
})

// 获取清空按
// bug: 如果当前状态为play时，清楚后无法点击，为pause时，正常
const clear_button = document.getElementById('clear');
clear_button.addEventListener('click', _ =>{
    animationId = play_control.pause(animationId);
    universe.clear();
    renderer.drawGrid();
    renderer.drawCells(); 
    
    clear_button.textContent = "✅";
    setTimeout(() => {
        clear_button.textContent = "🧹";
    }, 1000);
})



start();

