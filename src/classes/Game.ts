import Player from "./Player";
import Canvas from "../utils/Canvas";

export default class Game {
    player: Player;
    canvas: Canvas;
    private _gravity: number = 0.5;
    private _dashDistance: number = 100;
    private _isDashing: boolean = false;
    private _isGrounded: boolean = true;
    private _isJumping: boolean = false;

    constructor(player: Player, canvas: Canvas) {
        this.player = player;
        this.canvas = canvas;
    }

    getGravity() {
        return this._gravity;
    }

    getDashDistance() {
        return this._dashDistance;
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
        this.canvas.clear();

        this.player.updatePosition(
            () => this.getIsDashing(),
            (value: boolean) => this.setIsDashing(value),
            () => this.getIsGrounded(),
            (value: boolean) => this.setIsGrounded(value),
            () => this.getIsJumping(),
            (value: boolean) => this.setIsJumping(value),
            () => this.getGravity());
        this.player.draw(ctx);

        this.maintainCanvasBounds();

        this.logCurrentPlayerProperties();

        requestAnimationFrame(() => this.gameLoop(ctx));
    }

    maintainCanvasBounds() {
        // Prevent out of bounds (left)
        if (this.player.x < 0 ) {
            this.player.x = 0;
        }

        // Prevent out of bounds (right)
        if (this.player.x + this.player.width > this.canvas.width) {
            this.player.x = this.canvas.width - this.player.width
        }

        // Prevent out of bound (down)
        if (this.player.y + this.player.height >= this.canvas.height) {
            this.player.y = this.canvas.height - this.player.height;
            this.setIsGrounded(true);
            this.setIsJumping(false);
        }
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