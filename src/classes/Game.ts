import Player from "./Player";
import { clearCanvas } from "../utils/Canvas";

export default class Game {
    player: Player;
    gravity = 0.5;
    dashDistance = 100;
    isDashing = false;
    isGrounded = true;
    isJumping = false;

    constructor(player: Player) {
        this.player = player;
    }

    gameLoop(ctx: CanvasRenderingContext2D) {
        clearCanvas(ctx);
        this.player.updatePosition(this.gravity, this.isDashing, this.isGrounded, this.isJumping);
        this.player.draw(ctx);
        this.logCurrentPlayerProperties();
        requestAnimationFrame(() => this.gameLoop(ctx));
    }

    logCurrentPlayerProperties() {
        document.getElementById('x-position')!.textContent = this.player.x.toString();
        document.getElementById('y-position')!.textContent = this.player.y.toString();
        document.getElementById('dx-position')!.textContent = this.player.dx.toString();
        document.getElementById('dy-position')!.textContent = this.player.dy.toString();
        document.getElementById('facingDirection')!.textContent = this.player.facingDirection;
        document.getElementById('isJumping')!.textContent = this.isJumping.toString();
        document.getElementById('isGrounded')!.textContent = this.isGrounded.toString();
        document.getElementById('isDashing')!.textContent = this.isDashing.toString();
    }
}