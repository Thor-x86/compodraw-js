export class InvalidClassError extends Error {
  public name: string = "InvalidClassError";

  /**
   * Thrown when the class isn't implements minimum requirement
   * that defined on interface
   *
   * @param interfaceName Expected interface name
   */
  constructor(interfaceName: string) {
    super(`The class does not implement "${interfaceName}" interface`);
  }
}

export default InvalidClassError;
