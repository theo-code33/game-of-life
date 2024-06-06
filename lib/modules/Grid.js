import { Cell } from "./Cell.js";
export default class Grid {
    constructor(rows, cols, cellSize) {
        this.rows = rows;
        this.cols = cols;
        this.cellSize = cellSize;
        this.grid = this.prepareGrid();
    }
    prepareGrid() {
        const columns = [];
        for (let i = 0; i < this.rows; i++) {
            const row = [];
            for (let j = 0; j < this.cols; j++) {
                row.push(Math.random() < 0.2 ? true : false);
            }
            columns.push(row);
        }
        return columns;
    }
    draw(p) {
        const lenght = this.cols * this.cellSize;
        const height = this.rows * this.cellSize;
        p.setup = () => {
            p.createCanvas(lenght, height);
            p.frameRate(1000);
            p.noLoop();
        };
        p.draw = () => {
            p.background(0);
            for (let y = 0; y < height; y += this.cellSize) {
                for (let x = 0; x < lenght; x += this.cellSize) {
                    new Cell(this, x, y, this.cellSize).draw(p);
                }
            }
        };
    }
}
