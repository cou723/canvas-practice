import "./style.css";

type SwitchParam = [number, number];
type SwitchData = { name: string, color: string, switchParam: SwitchParam[] }

const SWITCH_DATA: SwitchData[] = [{
  name: "keychron_optical_brown", color: "#b55519", switchParam: [
    [0, 0],
    [0.1, 40],
    [0.8, 45],
    [1.25, 55],
    [1.8, 40],
    [2.1, 48],
    [3.9, 57],
    [4, 120],
    [3.9, 55],
    [2.3, 47],
    [1.8, 24],
    [1.1, 42],
    [0.4, 25],
    [0.1, 22],
    [0, 0],
  ]
}, {
  name: "gateron_brown_milk", color: "#d18528", switchParam: [
    [0, 0],
    [0.1, 36],
    [0.9, 57],
    [1.7, 36],
    [2.4, 50],
    [2.5, 120],
    [2.4, 38],
    [1.7, 20],
    [0.8, 28.5],
    [0.1, 17],
    [0, 0],
  ]
}, {
  name: "kailh_midnight", color: "#f2dcaa", switchParam: [
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
  ]
}, {
  name: "gazzew_boba", color: "#f5f4f2", switchParam: [
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
    [0, 0],
  ]
}, {
  name: "jwick", color: "#31a5cc", switchParam: [
    [0, 0],
    [0.3, 55],
    [0.5, 66],
    [1, 50],
    [2, 35],
    [2.5, 55],
    [4, 65],
  ]
}, {
  name: "gateron_brown_low", color: "#8a4504", switchParam: [
    [0, 0],
    [0.1, 35],
    [0.8, 55],
    [1.6, 45],
    [2.9, 62],
    [3, 120],
    [2.9, 58],
    [2, 48],
    [1.6, 35],
    [0.8, 44],
    [0.1, 30],
    [0, 0],
  ]
}
]
function drawCanvas(ignore_list: string[] = []) {
  SWITCH_DATA.forEach((switch_data, i) => {
    if (!ignore_list.includes(switch_data.name))
      new Switch(switch_data.name, switch_data.color, switch_data.switchParam).draw(i);
  })
}

function main() {
  document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <canvas width=${AREA.width} height=${AREA.height}></canvas>
  </div>
`;
  drawCanvas();
}

type Size = { width: number; height: number };
class Pos {
  static readonly brand: unique symbol = Symbol();
  public x: number;
  public y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

const AREA: Size = { width: 600, height: 600 };

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
  constructor(name = "unknown", color = "red", switch_params: SwitchParam[]) {
    this.name = name;
    this.color = color;
    for (const switch_param of switch_params) {
      this.point_list.push(new Pos(switch_param[0] * 140, switch_param[1] * 5));
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
  ctx.shadowColor = 'black';
  ctx.shadowOffsetX = 5;
  ctx.shadowOffsetY = 5;
  ctx.shadowBlur = 10;
  ctx.moveTo(start.x, start.y);
  ctx.lineTo(end.x, end.y);
  ctx.closePath();
  ctx.stroke();
}

const all = document.querySelectorAll<HTMLInputElement>("input");
let ignore_list: string[] = [];
for (const e of all) {
  e.onchange = () => {
    // canvasをクリア
    const ctx = document.querySelector<HTMLCanvasElement>("canvas")!.getContext("2d")!;
    ctx.clearRect(0, 0, AREA.width, AREA.height);
    if (!e.checked) {
      ignore_list.push(e.name);
    }
    else {
      ignore_list = ignore_list.filter((v) => v !== e.name);
    }
    drawCanvas(ignore_list);
  }
}

main();
