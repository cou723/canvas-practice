import { AREA } from "./static";
export type SwitchParam = [number, number];
export type SwitchData = {
    name: string;
    color: string;
    switchParam: SwitchParam[];
};

export type Size = { width: number; height: number };
export class Pos {
    static readonly brand: unique symbol = Symbol();
    public x: number;
    public y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

export class CanvasPos {
    public x: number;
    public y: number;
    static readonly brand: unique symbol = Symbol();
    constructor(pos: Pos) {
        this.x = pos.x;
        this.y = AREA.height - pos.y;
    }
}

export class Switch {
    public name: string;
    public color: string;
    public point_list: Pos[] = [];
    constructor(name = "unknown", color = "red", switch_params: SwitchParam[]) {
        this.name = name;
        this.color = color;
        for (const switch_param of switch_params) {
            this.point_list.push(
                new Pos(switch_param[0] * 200, switch_param[1] * 8)
            );
        }
    }

    draw(index: number) {
        const ctx = document
            .querySelector<HTMLCanvasElement>("canvas")!
            .getContext("2d")!;
        ctx.fillStyle = this.color;
        ctx.fillText(this.name, 20, 20 * index);
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        for (let i = 0; i < this.point_list.length - 1; i++) {
            const start = new CanvasPos(this.point_list[i]);
            const end = new CanvasPos(this.point_list[i + 1]);
            drawLine(ctx, start, end);
        }
    }
}

function drawLine(
    ctx: CanvasRenderingContext2D,
    start: CanvasPos,
    end: CanvasPos
) {
    ctx.beginPath();
    ctx.shadowColor = "black";
    ctx.shadowOffsetX = 5;
    ctx.shadowOffsetY = 5;
    ctx.shadowBlur = 10;
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.closePath();
    ctx.stroke();
}
