import './style.css'

class SwitchPoint {
  pos: number;
  force: number;
  constructor(pos: number, force: number) { }
}

const KEYCHRON_OPTICAL_BROWN: SwitchPoint = [
  [0, 0],
  [0.1, 40],
  [0.8, 45],
  [1.25, 55],
  [1.8, 40],
  [2.1, 48],
  [3.9, 57],
  [0, 0],
  [0.1, 36],
  [0.9, 57],
  [1.7, 36],
  [2.4, 50],
  [4, 120],
  [3.9, 55],
  [2.3, 47],
  [1.8, 24],
  [1.1, 42],
  [0.4, 25],
  [0.1, 22],
  [2.5, 120],
  [2.4, 38],
  [1.7, 20],
  [0.8, 28.5],
  [0.1, 17],
  [0, 0],
  [0, 40],
  [0.5, 60],
  [1.6, 38],
  [1.9, 50],
  [3.9, 60],
  [4, 120],
  [3.9, 58],
  [2.25, 47],
  [1.7, 18],
  [0.4, 40],
  [0.1, 34],
  [0, 0],
  [0.25, 55],
  [0.4, 62],
  [1.7, 37],
  [2.25, 57.5],
  [3.1, 64],
  [3.3, 120],
  [3.1, 64],
  [2.2, 57],
  [2, 30],
  [1.7, 25],
  [0.25, 50],
  [0.3, 55],
  [0.4886904254958, 66.1402618936567],
  [0.9576171509713, 49.9656878845036],
  [2, 35],
  [2.5, 55],
  [4, 65],
  [0, 0],
  [0.1, 35],
  [0.8, 55],
  [1.6, 45],
  [2.9, 62],
  [3, 120],
  [2.9, 58],
  [2, 48],
  [1.6, 35],
  [0.1, 30],
  [0.8249714344882, 44.3152416387084],
]

function main() {
  document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <canvas width=${AREA.width} height=${AREA.height}></canvas>
  </div>
`

  const keychron_optical_brown = new Switch("keychron_optical_brown", "brown", KEYCHRON_OPTICAL_BROWN);
  keychron_optical_brown.draw();
}

type Size = { width: number, height: number }
class Pos {
  static readonly brand: unique symbol = Symbol();
  public x: number;
  public y: number;
  constructor(x,y) {
    this.x = x;
    this.y = y;
  }
}

const AREA: Size = { width: 500, height: 500 }

class CanvasPos {
  public x: number;
  public y: number;
  static readonly brand: unique symbol = Symbol();
  constructor(pos: Pos) {
    this.x = pos.x;
    this.y = AREA.height - pos.y;
  }
}

class Switch {
  public name: string;
  public color: string;
  public point_list: Pos[] = [];
  constructor(name = "unknown", color = "red", point_list: [number, number][]) {
    this.name = name;
    this.color = color;
    for (const point of point_list) {
      this.point_list.push(new Pos(point[0] * 120, point[1] *4));
    }
  }

  draw() {
    let ctx = document.querySelector<HTMLCanvasElement>('canvas')!.getContext('2d')!;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    for (let i = 0; i < this.point_list.length - 1; i++) {
      const start = new CanvasPos(this.point_list[i]);
      const end = new CanvasPos(this.point_list[i + 1]);
      drawLine(ctx, start, end);
    }
  }
}


function drawLine(ctx: CanvasRenderingContext2D, start: CanvasPos, end: CanvasPos) {
  ctx.beginPath();
  ctx.moveTo(start.x, start.y);
  ctx.lineTo(end.x, end.y);
  ctx.closePath();
  ctx.stroke();
}


main();