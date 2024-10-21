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

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
canvas.height = window.innerHeight - 20;

export default class {
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

    constructor(props: PlayerProps) {
        this.x = props.x ?? 50;
        this.y = props.y ?? canvas.height - 100;
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

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    updatePosition(
        getIsDashing: any,
        setIsDashing: any,
        getIsGrounder: any,
        setIsGrounded: any,
        getIsJumping: any,
        setIsJumping: any,
        getGravity: any
    ) {
        if (getIsDashing()) {
            if ((this.facingDirection === 'right' && this.x < this.dashTargetX) ||
                (this.facingDirection === 'left' && this.x > this.dashTargetX)) {
                this.x += (this.facingDirection === 'right' ? this.dashSpeed : -this.dashSpeed);
            } else {
                setIsDashing(false);
                this.dx = 0;
            }
        }

        if (!getIsDashing()) {
            this.x += this.dx;
            this.y += this.dy;

            if (!getIsGrounder()) {
                this.dy += getGravity();
            }
        }

        // Prevent out of bounds (left)
        if (this.x < 0 ) {
            this.x = 0;
        }

        // Prevent out of bounds (right)
        if (this.x + this.width > canvas.width) {
            this.x = canvas.width - this.width
        }

        // Prevent out of bound (down)
        if (this.y + this.height >= canvas.height) {
            this.y = canvas.height - this.height;
            setIsGrounded(true);
            setIsJumping(false);
        }
    }
}