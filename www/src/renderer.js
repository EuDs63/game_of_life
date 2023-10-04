import { memory } from "wasm-game-of-life-euds63/wasm_game_of_life_euds63_bg";
import { Cell } from "wasm-game-of-life-euds63";
export const CELL_SIZE = 5;
export const GRID_COLOR = "#CCCCCC";
export const DEAD_COLOR = "#FFFFFF";
export const ALIVE_COLOR = "#000000";

export class Renderer {
    constructor(context, universe) {
        this.width = universe.width();
        this.height = universe.height();
        this.context = context;
        this.universe = universe;
    }

    // 由行号、列号得到index
    getIndex(row, column) {
        return row * this.width + column;
    };

    // 绘制网格逻辑
    drawGrid() {
        let context = this.context;

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
    drawCells() {
        let width = this.width;
        let height = this.height;
        let context = this.context;
        let universe = this.universe;

        const cellPtr = universe.cells();
        const cells = new Uint8Array(memory.buffer, cellPtr, width * height);
        //  starts a new path by emptying the list of sub-paths
        context.beginPath();

        // 每次循环都要设置一次fillstyle会影响性能
        // for (let row = 0; row < height; row++) {
        //     for (let col = 0; col < width; col++) {
        //         const idx = this.getIndex(row, col, width, height);

        //         context.fillStyle = cells[idx] === Cell.Dead ? DEAD_COLOR : ALIVE_COLOR; // 根据细胞状态上色
        //         context.fillRect(col * (CELL_SIZE + 1) + 1,
        //             row * (CELL_SIZE + 1) + 1,
        //             CELL_SIZE,
        //             CELL_SIZE
        //         );
        //     }
        //     context.stroke();
        // }
        // 使用两次循环，可以只要设置两次
        context.fillStyle = ALIVE_COLOR;
        for (let row = 0; row < height; row++) {
            for (let col = 0; col < width; col++) {
                const idx = this.getIndex(row, col, width, height);
                if (cells[idx] !== Cell.Alive)
                    continue;

                context.fillRect(col * (CELL_SIZE + 1) + 1,
                    row * (CELL_SIZE + 1) + 1,
                    CELL_SIZE,
                    CELL_SIZE
                );
            }
        }

        context.fillStyle = DEAD_COLOR;
        for (let row = 0; row < height; row++) {
            for (let col = 0; col < width; col++) {
                const idx = this.getIndex(row, col, width, height);
                if (cells[idx] !== Cell.Dead)
                    continue;

                context.fillRect(col * (CELL_SIZE + 1) + 1,
                    row * (CELL_SIZE + 1) + 1,
                    CELL_SIZE,
                    CELL_SIZE
                );
            }
        }
        context.stroke;
    }
}


