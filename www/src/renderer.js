import { memory } from "wasm-game-of-life/wasm_game_of_life_bg";
import { Cell } from "wasm-game-of-life";
export const CELL_SIZE = 5;
export const GRID_COLOR = "#CCCCCC";
export const DEAD_COLOR = "#FFFFFF";
export const ALIVE_COLOR = "#000000";

export class Renderer {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }

    // 由行号、列号得到index
    getIndex(row, column) {
        return row * this.width + column;
    };

    // 绘制网格逻辑
    drawGrid(context) {
        context.beginPath();
        context.strokeStyle = GRID_COLOR;

        // Vertical lines.
        for (let i = 0; i <= this.width; i++) {
            context.moveTo(i * (CELL_SIZE + 1) + 1, 0); // 起点
            context.lineTo(i * (CELL_SIZE + 1) + 1, (CELL_SIZE + 1) * this.height + 1); // 终点
        }

        // Horizontal lines.
        for (let j = 0; j <= this.height; j++) {
            context.moveTo(0, j * (CELL_SIZE + 1) + 1);
            context.lineTo((CELL_SIZE + 1) * this.width + 1, j * (CELL_SIZE + 1) + 1);
        }

        context.stroke();
    }

    // 绘制细胞逻辑  
    drawCells(context, universe) {
        let width = this.width;
        let height = this.height;
        const cellPtr = universe.cells();
        const cells = new Uint8Array(memory.buffer, cellPtr, width * height);
        //  starts a new path by emptying the list of sub-paths
        context.beginPath();

        for (let row = 0; row < height; row++) {
            for (let col = 0; col < width; col++) {
                const idx = this.getIndex(row, col, width, height);

                context.fillStyle = cells[idx] === Cell.Dead ? DEAD_COLOR : ALIVE_COLOR; // 根据细胞状态上色
                context.fillRect(col * (CELL_SIZE + 1) + 1,
                    row * (CELL_SIZE + 1) + 1,
                    CELL_SIZE,
                    CELL_SIZE
                );
            }
            context.stroke();
        }
    }
}


