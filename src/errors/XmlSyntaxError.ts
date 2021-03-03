export class XmlSyntaxError extends Error {
  public name: string = "XmlSyntaxError";

  /**
   * Thrown when XML contains invalid syntax
   *
   * @param message The error message
   */
  constructor(message: string) {
    super(message);
  }
}

export default XmlSyntaxError;
