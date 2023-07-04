import "./style.css";
import { SWITCH_DATA } from "./data";
import { Switch } from "./types";
import { AREA } from "./static";

function drawCanvas(ignore_list: string[] = []) {
    SWITCH_DATA.forEach((switch_data, i) => {
        if (!ignore_list.includes(switch_data.name))
            new Switch(
                switch_data.name,
                switch_data.color,
                switch_data.switchParam
            ).draw(i+1);
    });
}

function main() {
    document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <canvas width=${AREA.width} height=${AREA.height}></canvas>
  </div>
`;
    drawCanvas();
}

const all = document.querySelectorAll<HTMLInputElement>("input");
let ignore_list: string[] = [];
for (const e of all) {
    e.onchange = () => {
        // canvasをクリア
        const ctx = document
            .querySelector<HTMLCanvasElement>("canvas")!
            .getContext("2d")!;
        ctx.clearRect(0, 0, AREA.width, AREA.height);
        if (!e.checked) {
            ignore_list.push(e.name);
        } else {
            ignore_list = ignore_list.filter((v) => v !== e.name);
        }
        drawCanvas(ignore_list);
    };
}

main();
