import Canvas from "../utils/Canvas";

interface PlayerProps {
    x?: number,
    y?: number,
    dx?: number,
    dy?: number,
    width?: number,
    height?: number,
    color?: string,
    facingDirection?: 'right' | 'left',
    speed?: number,
    dashSpeed?: number,
    dashTargetX?: number,
}

export default class {
    canvas: Canvas;
    x: number;
    y: number;
    dx: number;
    dy: number;
    width: number;
    height: number;
    color: string;
    facingDirection: 'right' | 'left';
    speed: number;
    dashSpeed: number;
    dashTargetX: number;

    constructor(props: PlayerProps, canvas: Canvas) {
        this.canvas = canvas;
        this.x = props.x ?? 50;
        this.y = props.y ?? this.canvas.height - 100;
        this.dx = props.dx ?? 0;
        this.dy = props.dy ?? 0;
        this.width = props.width ?? 50;
        this.height = props.height ?? 100;
        this.color = props.color ?? 'blue';
        this.facingDirection = props.facingDirection ?? 'right';
        this.speed = props.speed ?? 5;
        this.dashSpeed = props.dashSpeed ?? 20;
        this.dashTargetX = props.dashTargetX ?? 0;
    }

    updatePosition(
        isDashing: boolean,
        setIsDashing: (value: boolean) => void,
        isGrounded: boolean,
        setIsGrounded: (value: boolean) => void,
        isJumping: boolean,
        setIsJumping: (value: boolean) => void,
        gravity: number
    ) {
        if (isDashing) {
            if ((this.facingDirection === 'right' && this.x < this.dashTargetX) ||
                (this.facingDirection === 'left' && this.x > this.dashTargetX)) {
                this.x += (this.facingDirection === 'right' ? this.dashSpeed : -this.dashSpeed);
            } else {
                setIsDashing(false);
                this.dx = 0;
            }
        }

        if (!isDashing) {
            this.x += this.dx;
            this.y += this.dy;

            if (!isGrounded) {
                this.dy += gravity;
            }
        }
    }
}