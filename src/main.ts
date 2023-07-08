import './style.css'
import { setupCounter } from './counter.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <canvas></canvas>
  </div>
`

const canvas = document.querySelector<HTMLCanvasElement>('canvas')!
const ctx = canvas.getContext('2d')!
ctx.fillStyle = 'red';
ctx.fillRect(10, 10, 100, 100);
