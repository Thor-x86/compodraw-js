/**
 * Minimum requirements for building your own render instruction
 */
export interface Instruct {
  /**
   * Will be called everytime this instruction executed for drawing on canvas,
   * this function MUST be implemented
   **/
  draw: (canvasCtx: CanvasRenderingContext2D) => void;

  /**
   * Whenever instruction has "children" node while composing
   * with JSX or XML, they will be inserted into this property
   */
  content?: Instruct[] | string;
}

export default Instruct;
