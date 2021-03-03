export class InstructNotFoundError extends Error {
  public name: string = "InstructNotFoundError";

  /**
   * Thrown when developer forgot to register targeted instruction name
   *
   * @param targetedName What name that unregistered
   * @param whichFunc Indicates which compose function caused error
   */
  constructor(targetedName: string, whichFunc: "jsx" | "xml") {
    super();
    var capitalized: string = whichFunc[0].toUpperCase() + whichFunc.substr(1);
    this.message = `"${targetedName}" is not registered in 'withInstructs' at composeFrom${capitalized}(${whichFunc}, withInstructs) function`;
  }
}

export default InstructNotFoundError;
