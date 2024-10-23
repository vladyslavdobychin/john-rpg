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

interface SwordProps {
    pivotX: number;
    pivotY: number;
    length: number;
    angle: number;
    swingSpeed: number;
    isSwinging: boolean;
    color: string;
}

export default class {
    canvas: Canvas;
    sword: SwordProps;

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

        this.sword = {
            pivotX: this.x + this.width / 2,
            pivotY: this.y + this.height / 3,
            length: 100,
            angle: -Math.PI / 4,
            swingSpeed: 0.10,
            isSwinging: false,
            color: 'silver'
        };
    }

    draw() {
        // Draw player's position
        this.canvas.draw(this.x, this.y, this.width, this.height, this.color);

        // Draw sword is swinging
        if (this.sword.isSwinging) {
            // Calculate the tip of the sword using the pivot point and angle
            const swordTipX = this.sword.pivotX + this.sword.length * Math.cos(this.sword.angle);
            const swordTipY = this.sword.pivotY + this.sword.length * Math.sin(this.sword.angle);

            // Draw the sword as a line between the pivot and the tip
            this.canvas.drawLine(this.sword.pivotX, this.sword.pivotY, swordTipX, swordTipY, this.sword.color);
        }
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

    updateSword() {
        if (this.sword.isSwinging) {
            // Rotate the sword downwards
            this.sword.angle += this.sword.swingSpeed;

            if (this.sword.angle >= Math.PI / 4) {
                this.sword.isSwinging = false;
                this.sword.angle = -Math.PI / 4;
            }
        }
    }
}