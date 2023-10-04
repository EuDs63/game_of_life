import { Renderer,CELL_SIZE } from './renderer.js';
export class Canvas {

    constructor(universe) {
        this.universe = universe;
        this.width = universe.width();
        this.height = universe.height();
        this.canvas = document.getElementById("game-of-life-canvas");
        this.context = this.canvas.getContext('2d');
        this.renderer = new Renderer(this.context, universe);
        this.isMouseDown = false;
        this.lastGrid = { row: -1, col: -1 };

        this.init();
           
    }

    init(){
        this.canvas.height = (CELL_SIZE + 1) * this.height + 1;
        this.canvas.width = (CELL_SIZE + 1) * this.width + 1;
        
        // bind -> 绑定事件回调函数的 this 指向
        this.canvas.addEventListener('click', this.handleClick.bind(this));
        this.canvas.addEventListener('mousedown', this.handleMouseDown.bind(this));
        this.canvas.addEventListener('mouseup', this.handleMouseUp.bind(this));
        this.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));

    }

    // 根据点击位置得到对应row和col
    // 比例应该是固定的，不需要重复计算。
    getGridRowAndCol(e){
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

        return {row,col};
    }

    // 发现bug: 暂停后修改cell状态后，会使得进行下一次tick
    handleClick(e) {
        const {row,col} = this.getGridRowAndCol(e);
        // 切换单元格状态
        this.universe.toggle_cell(row, col);

        // this.renderer.drawGrid();
        this.renderer.drawCells();
    }

    handleMouseDown() {
        this.isMouseDown = true;
    }

    handleMouseUp() {
        this.isMouseDown = false;
    }

    handleMouseMove(e) {
        if (!this.isMouseDown) return;

        const { row, col } = this.getGridRowAndCol(e);

        if (this.lastGrid.row !== row || this.lastGrid.col !== col) {
            this.universe.toggle_cell(row, col);
            // this.render();
            this.lastGrid = { row, col };
        }
    }
}
