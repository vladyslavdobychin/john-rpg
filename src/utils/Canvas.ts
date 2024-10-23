export default class Canvas {
    private canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    constructor() {
        this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
        this.ctx = <CanvasRenderingContext2D>this.canvas.getContext('2d');
        this.resize();
    }

    resize() {
        this.canvas.width = window.innerWidth - 20;
        this.canvas.height = window.innerHeight - 20;
    }

    get width() {
        return this.canvas.width;
    }

    get height() {
        return this.canvas.height
    }

    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }

    drawCharacter(x: number, y: number, width: number, height: number, color: string) {
        this.ctx.fillStyle = color
        this.ctx.fillRect(x, y, width, height);
    }
}
