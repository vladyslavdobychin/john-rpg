import {Frame} from "../constants/Frame";

export default class Animation {

    public image: HTMLImageElement
    public sourceX: number = Frame.SOURCE_X
    public sourceY: number = Frame.SOURCE_Y
    public sourceSW: number = Frame.SOURCE_SW
    public sourceSH: number = Frame.SOURCE_SH

    constructor() {
        this.image = new Image();
        this.image.src = 'src/sprites/Warrior_Sheet-Effect.png'
    }
}