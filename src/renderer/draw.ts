import { Instruct } from "../interfaces";

/**
 * Render composed instructions to canvas DOM
 *
 * @param composed Typically a group of instructions
 * @param canvasDOM Targeted canvas element
 */
export function draw(composed: Instruct, canvasDOM: HTMLCanvasElement): void {
  if (!canvasDOM) return;

  canvasDOM.width = canvasDOM.clientWidth * window.devicePixelRatio;
  canvasDOM.height = canvasDOM.clientHeight * window.devicePixelRatio;

  if (typeof canvasDOM.getContext === "function") {
    const canvasCtx = canvasDOM.getContext("2d");
    if (canvasCtx) {
      canvasCtx.clearRect(0, 0, canvasDOM.width, canvasDOM.height);
      composed.draw(canvasCtx);
    }
  }
}

export default draw;
