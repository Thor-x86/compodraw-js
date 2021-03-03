import { JSX, Instruct, NamedInstructs } from "../interfaces";
import {
  JsxNameError,
  InstructNotFoundError,
  InvalidClassError,
} from "../errors";

/**
 * Compose render instructions from JSX,
 * this function should not be called repetitively
 *
 * @param jsx Plain XML from JSX source code
 * @param withInstructs Named list of pickable render instructions, ignore if you prefer import class one-by-one
 * @throws {JsxNameError} when element name is invalid
 * @throws {InstructNotFoundError} when element name is not registered on 'withInstructs'
 * @throws {InvalidClassError} when at least one instruction is not valid
 * @returns Grouped instructions
 */
export function composeFromJsx(
  jsx: JSX,
  withInstructs?: NamedInstructs
): Instruct {
  // Resolve render instruction from JSX element
  var result: Instruct;
  if (typeof jsx.type == "string") {
    // Condition: Element is pure XML
    const instructName = jsx.type;
    if (withInstructs) {
      // Condition: Element is pure XML and 'withInstruct' defined
      const targetClass = withInstructs[instructName];
      if (targetClass == undefined) {
        throw new InstructNotFoundError(instructName, "jsx");
      }
      result = new targetClass();
    } else {
      // Condition: Element is pure XML and 'withInstruct' undefined
      throw new InstructNotFoundError(instructName, "jsx");
    }
  } else if (typeof jsx.type == "function") {
    // Condition: Element is a class
    // @ts-ignore
    result = new jsx.type();
  } else {
    throw new JsxNameError(jsx.type);
  }

  // Throw error if it's not a valid instruction
  if (typeof result.draw != "function") {
    throw new InvalidClassError("Instruct");
  }

  if (typeof jsx.props == "object") {
    // Insert properties
    const propKeys = Object.keys(jsx.props);
    for (const eachKey of propKeys) {
      if (eachKey === "children") continue;
      // @ts-ignore
      result[eachKey] = jsx.props[eachKey];
    }

    // Insert JSX element children as content with correct type
    const jsxChildren = jsx.props.children;
    if (
      typeof jsxChildren == "object" &&
      typeof jsxChildren.$$typeof == "symbol" &&
      jsxChildren.$$typeof.toString() == "Symbol(react.element)"
    ) {
      // Condition: has a single valid child
      result.content = [composeFromJsx(jsxChildren, withInstructs)];
    } else if (Array.isArray(jsxChildren)) {
      // Condition: has valid children
      const jsxArray = jsxChildren as JSX[];
      result.content = [];
      for (const eachChild of jsxArray) {
        const resolved = composeFromJsx(eachChild, withInstructs);
        result.content.push(resolved);
      }
    } else if (typeof jsxChildren == "string") {
      // Condition: the children is just a plain string
      result.content = jsxChildren.replace(/\\n/, "\n").replace(/\\t/, "\t");
    }
  }

  return result;
}

export default composeFromJsx;
