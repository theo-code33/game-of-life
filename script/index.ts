import Grid from "./modules/Grid.js";
declare const p5: any;

const gameGrid = new Grid(20, 20, 30);

new p5(gameGrid.draw.bind(gameGrid));
