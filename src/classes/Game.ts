import Player from "./Player";
import { clearCanvas } from "../utils/Canvas";

export default class Game {
    player: Player;
    gravity: number = 0.5;
    dashDistance: number = 100;
    private _isDashing: boolean = false;
    private _isGrounded: boolean = true;
    private _isJumping: boolean = false;

    constructor(player: Player) {
        this.player = player;
    }

    getIsDashing(): boolean {
        return this._isDashing;
    }

    setIsDashing(value: boolean) {
        this._isDashing = value;
    }

    getIsGrounded(): boolean {
        return this._isGrounded;
    }

    setIsGrounded(value: boolean) {
        this._isGrounded = value;
    }

    getIsJumping(): boolean {
        return this._isJumping
    }

    setIsJumping(value: boolean) {
        this._isJumping = value;
    }

    gameLoop(ctx: CanvasRenderingContext2D) {
        clearCanvas(ctx);
        this.player.updatePosition(
            () => this.getIsDashing(),
            (value: boolean) => this.setIsDashing(value),
            () => this.getIsGrounded(),
            (value: boolean) => this.setIsGrounded(value),
            () => this.getIsJumping(),
            (value: boolean) => this.setIsJumping(value),
            this.gravity);
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
        document.getElementById('isJumping')!.textContent = this.getIsJumping().toString();
        document.getElementById('isGrounded')!.textContent = this.getIsGrounded().toString();
        document.getElementById('isDashing')!.textContent = this.getIsDashing().toString();
    }
}