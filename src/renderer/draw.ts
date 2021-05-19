import { Instruct } from "../interfaces";

/**
 * Render composed instructions to canvas DOM
 *
 * @param composed Typically a group of instructions
 * @param canvasDOM Targeted canvas element
 * @param isResponsive Set to false if canvas behaves weird
 */
export function draw(
  composed: Instruct,
  canvasDOM: HTMLCanvasElement,
  isResponsive: boolean = true
): void {
  if (!canvasDOM) return;

  if (isResponsive) {
    canvasDOM.width = canvasDOM.clientWidth * window.devicePixelRatio;
    canvasDOM.height = canvasDOM.clientHeight * window.devicePixelRatio;
  }

  if (typeof canvasDOM.getContext === "function") {
    const canvasCtx = canvasDOM.getContext("2d");
    if (canvasCtx) {
      canvasCtx.clearRect(0, 0, canvasDOM.width, canvasDOM.height);
      composed.draw(canvasCtx);
    }
  }
}

export default draw;
