import { Renderer,CELL_SIZE } from './renderer.js';
export class Canvas {

    constructor(universe) {
        this.universe = universe;
        this.width = universe.width();
        this.height = universe.height();

        this.canvas = document.getElementById("game-of-life-canvas");
        this.canvas.height = (CELL_SIZE + 1) * this.height + 1;
        this.canvas.width = (CELL_SIZE + 1) * this.width + 1;

        this.context = this.canvas.getContext('2d');

        // bind -> 绑定事件回调函数的 this 指向
        this.canvas.addEventListener('click', this.handleClick.bind(this));

        this.renderer = new Renderer(this.context, universe);
    }

    handleClick(e) {
        // 获取 canvas 边界框信息
        const boundingRect = this.canvas.getBoundingClientRect();

        // 计算点击位置和 canvas 位置的比例
        const scaleX = this.canvas.width / boundingRect.width;
        const scaleY = this.canvas.height / boundingRect.height;

        // 计算点击位置对应的 canvas 内坐标
        const canvasLeft = (e.clientX - boundingRect.left) * scaleX;
        const canvasTop = (e.clientY - boundingRect.top) * scaleY;

        // 计算对应的行列号, 并约束在合法范围内
        const row = Math.max(Math.floor(canvasTop / (CELL_SIZE + 1)), 0);
        const col = Math.min(Math.floor(canvasLeft / (CELL_SIZE + 1)), this.width - 1);

        // 切换单元格状态
        this.universe.toggle_cell(row, col);

        this.renderer.drawGrid();
        this.renderer.drawCells();
    }

    // 其他canvas相关方法
}
