import Player from "./classes/Player";
import Game from "./classes/Game";
import handleInput from "./utils/InputHandler";


const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = <CanvasRenderingContext2D>canvas.getContext('2d');

canvas.width = window.innerWidth - 20;
canvas.height = window.innerHeight - 20;

const player = new Player({});
const game = new Game(player);

handleInput(player, game);
game.gameLoop(ctx);