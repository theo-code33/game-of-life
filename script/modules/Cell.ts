import Grid from "./Grid.js";
import { DEFAULT_CELL_COLOR } from "./constants.js";

export class Cell {
  private alive: boolean = true;
  private neighbors = 0;
  private cellColor = DEFAULT_CELL_COLOR;
  private grid: Grid;
  private x: number;
  private y: number;
  private cellSize: number;

  constructor(grid: Grid, x: number, y: number, cellSize: number) {
    this.cellColor = DEFAULT_CELL_COLOR;
    this.grid = grid;
    this.x = x;
    this.y = y;
    this.cellSize = cellSize;
    this.alive =
      this.grid.grid[Math.floor(y / cellSize)][Math.floor(x / cellSize)];
  }

  isAlive(x: number, y: number): number {
    if (x < 0 || x >= this.grid.rows || y < 0 || y >= this.grid.cols) {
      return 0;
    }
    return this.grid.grid[x][y] ? 1 : 0;
  }

  neighboursCount(x: number, y: number): number {
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
  draw(p: any) {
    this.neighbors = this.neighboursCount(
      Math.floor(this.x / this.cellSize),
      Math.floor(this.y / this.cellSize)
    );
    if (this.alive) {
      if (this.neighbors < 2 || this.neighbors > 3) {
        this.alive = false;
      }
    } else {
      if (this.neighbors === 3) {
        this.alive = true;
      }
    }
    if (this.alive) {
      this.cellColor = DEFAULT_CELL_COLOR;
    } else {
      this.cellColor = "#000000";
    }
    p.fill(this.cellColor);
    p.rect(this.x, this.y, this.cellSize, this.cellSize);
  }
}
