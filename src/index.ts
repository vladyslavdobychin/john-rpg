import Player from "./classes/Player";
import Game from "./classes/Game";
import handleInput from "./utils/InputHandler";
import Canvas from "./utils/Canvas";

const canvas = new Canvas();

const player = new Player({});
const game = new Game(player, canvas);

handleInput(player, game);
game.gameLoop(canvas.ctx);