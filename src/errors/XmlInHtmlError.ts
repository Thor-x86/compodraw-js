export class XmlInHtmlError extends Error {
  public name: string = "XmlInHtmlError";

  /**
   * Thrown when XML in HTML is not commented
   * or mixed with other DOM
   *
   * @param domName The container HTML DOM Element name
   */
  constructor(domName: string) {
    super(
      `XML inside HTML Element (${domName}) must be commented like <${domName}><!-- ... --></${domName}> and cannot be mixed with HTML Element child`
    );
  }
}

export default XmlInHtmlError;
