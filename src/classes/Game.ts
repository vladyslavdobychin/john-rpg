import Player from "./Player";
import Canvas from "../utils/Canvas";
import Animation from "./Animation";

export default class Game {
    player: Player;
    canvas: Canvas;
    animation: Animation;
    private _gravity: number = 0.5;
    private _dashDistance: number = 100;
    private _isDashing: boolean = false;
    private _isGrounded: boolean = true;
    private _isJumping: boolean = false;

    constructor(player: Player, canvas: Canvas) {
        this.player = player;
        this.canvas = canvas;
        this.animation = new Animation();
    }

    get gravity() {
        return this._gravity;
    }

    get dashDistance() {
        return this._dashDistance;
    }

    get isDashing(): boolean {
        return this._isDashing;
    }

    set isDashing(value: boolean) {
        this._isDashing = value;
    }

    get isGrounded(): boolean {
        return this._isGrounded;
    }

    set isGrounded(value: boolean) {
        this._isGrounded = value;
    }

    get isJumping(): boolean {
        return this._isJumping
    }

    set isJumping(value: boolean) {
        this._isJumping = value;
    }

    gameLoop() {
        this.canvas.clear();

        this.player.updatePosition(
            this.isDashing,
            (value: boolean) => (this.isDashing = value),
            this.isGrounded,
            (value: boolean) => (this.isGrounded = value),
            this.isJumping,
            (value: boolean) => (this.isJumping = value),
            this.gravity
        );

        this.canvas.drawCharacter(
            this.animation,
            this.player
        );

        this.maintainCanvasBounds();

        this.logCurrentPlayerProperties();

        requestAnimationFrame(() => this.gameLoop());
    }

    maintainCanvasBounds() {
        // Prevent out of bounds (left)
        if (this.player.x <= 0) {
            this.player.x = 0;
            this.player.dx = 0;
        }

        // Prevent out of bounds (right)
        if (this.player.x + this.player.width >= this.canvas.width) {
            this.player.x = this.canvas.width - this.player.width
            this.player.dx = 0;
        }

        // Prevent out of bound (down)
        if (this.player.y + this.player.height >= this.canvas.height) {
            this.player.y = this.canvas.height - this.player.height;
            this.player.dy = 0
            this.isGrounded = true;
            this.isJumping = false;
        }
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