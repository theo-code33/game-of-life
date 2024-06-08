import { DEFAULT_CELL_COLOR } from "./constants.js";
export class Cell {
    constructor(grid, x, y, cellSize, alive = false, interval = 1000, repetitions = 1) {
        this.alive = true;
        this.neighbors = 0;
        this.cellColor = DEFAULT_CELL_COLOR;
        this.cellColor = DEFAULT_CELL_COLOR;
        this.grid = grid;
        this.x = x;
        this.y = y;
        this.cellSize = cellSize;
        this.alive = alive;
        this.interval = interval;
        this.repetitions = repetitions;
    }
    isAlive(x, y) {
        if (x < 0 || x >= this.grid.rows || y < 0 || y >= this.grid.cols) {
            return 0;
        }
        return this.grid.grid[x][y].alive ? 1 : 0;
    }
    neighboursCount(x, y) {
        let count = 0;
        for (let i of [-1, 0, 1]) {
            for (let j of [-1, 0, 1]) {
                if (!(i === 0 && j === 0)) {
                    count += this.isAlive(x + i, y + j);
                }
            }
        }
        return count;
    }
    init(p) {
        this.draw(p);
        this.live(p);
    }
    live(p) {
        for (let i = 0; i < this.repetitions; i++) {
            setInterval(() => {
                this.neighbors = this.neighboursCount(Math.floor(this.x / this.cellSize), Math.floor(this.y / this.cellSize));
                if (this.alive) {
                    if (this.neighbors < 2 || this.neighbors > 3) {
                        this.alive = false;
                    }
                }
                else {
                    if (this.neighbors === 3) {
                        this.alive = true;
                    }
                }
                this.draw(p);
            }, this.interval);
        }
    }
    draw(p) {
        if (this.alive) {
            this.cellColor = DEFAULT_CELL_COLOR;
        }
        else {
            this.cellColor = "#000000";
        }
        p.fill(this.cellColor);
        p.rect(this.x, this.y, this.cellSize, this.cellSize);
    }
}
