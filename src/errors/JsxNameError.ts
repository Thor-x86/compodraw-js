export class JsxNameError extends Error {
  public name: string = "JsxNameError";

  /**
   * Thrown when the name of JSX element is invalid
   *
   * @param elementTypeValue Typically filled with jsx.type property
   **/
  constructor(elementTypeValue: any) {
    super("JSX node name expected string but found " + elementTypeValue);
  }
}

export default JsxNameError;
