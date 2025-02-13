import Animation from "../classes/Animation";
import Player from "../classes/Player";

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

    drawCharacter(animation: Animation, player: Player) {
        this.ctx.fillStyle = 'grey';
        this.ctx.fillRect(
            player.x,
            player.y,
            player.width,
            player.height);

        this.ctx.drawImage(
            animation.image,
            animation.sourceX,
            animation.sourceY,
            animation.sourceSW,
            animation.sourceSH,
            player.x,
            player.y,
            player.width,
            player.height
        );
    }
}
