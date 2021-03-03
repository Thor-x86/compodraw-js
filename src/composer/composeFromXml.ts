import { Instruct, NamedInstructs } from "../interfaces";
import {
  XmlSyntaxError,
  InstructNotFoundError,
  InvalidClassError,
  XmlInHtmlError,
} from "../errors";

/**
 * Compose render instructions from either parsed or string XML,
 * this function should not be called repetitively
 *
 * @param xml Parsed or string XML
 * @param withInstructs Named list of pickable render instructions
 * @throws {XmlSyntaxError} when XML string contains syntax error
 * @throws {InstructNotFoundError} when element name is not registered on 'withInstructs'
 * @throws {InvalidClassError} when at least one instruction is not valid
 * @throws {XmlInHtmlError} when developer forgot to comment XML in HTML Element
 * @returns Grouped instructions
 */
export function composeFromXml(
  xml: HTMLElement | XMLDocument | string,
  withInstructs: NamedInstructs
): Instruct {
  // Parse XML if not yet
  var xmlDoc: XMLDocument;
  if (xml instanceof XMLDocument) {
    // CONDITION: Already parsed XML
    xmlDoc = xml;
  } else {
    const parser = new DOMParser();

    if (xml instanceof HTMLElement) {
      // CONDITION: XML came from comment inside HTML Element
      let xmlInHtml = xml.innerHTML;
      xmlInHtml = xmlInHtml.trim().replace(/\r/gm, "");
      if (!xmlInHtml.startsWith("<!--") || !xmlInHtml.endsWith("-->")) {
        throw new XmlInHtmlError(xml.localName);
      }
      xmlInHtml = xmlInHtml.replace(/^\<\!\-\-/, "").replace(/\-\-\>$/, "");
      xmlDoc = parser.parseFromString(xmlInHtml, "text/xml");
    } else {
      // CONDITION: XML came from string
      xmlDoc = parser.parseFromString(xml, "text/xml");
    }

    const errorMessage = checkXmlError(xmlDoc);
    if (errorMessage) {
      throw new XmlSyntaxError(errorMessage);
    }
  }

  // Making sure root element exactly one, no more, no less
  if (xmlDoc.children.length !== 1) {
    throw new XmlSyntaxError("Only 1 root element allowed");
  }

  return convertElement(xmlDoc.children[0], withInstructs);
}

export default composeFromXml;

function checkXmlError(xml: XMLDocument): string | false {
  if (xml.getElementsByTagName("parsererror").length > 0) {
    const errorElement = xml.getElementsByTagName("parsererror")[0];
    return errorElement.textContent || "Unknown XML Error";
  } else {
    return false;
  }
}

function convertElement(
  xmlElement: Element,
  withInstructs: NamedInstructs
): Instruct {
  // Get targeted name
  const instructName = xmlElement.localName;

  // Take instruction with targeted name, throw error if not found
  const targetClass = withInstructs[instructName];
  if (targetClass == undefined) {
    throw new InstructNotFoundError(instructName, "xml");
  }
  const result = new targetClass();

  // Throw error if it's not a valid instruction
  if (typeof result.draw != "function") {
    throw new InvalidClassError("Instruct");
  }

  // Parse attributes then assign as properties
  for (const eachIndex in xmlElement.attributes) {
    if (isNaN(Number(eachIndex))) continue;
    const eachAttr = xmlElement.attributes.item(Number(eachIndex));
    if (eachAttr == null) continue;
    const eachKey = eachAttr.name;
    const eachRawValue = eachAttr.value;
    var eachValue: any;
    if (eachRawValue == "true" || eachRawValue.length === 0) {
      eachValue = true;
    } else if (eachRawValue == "false") {
      eachValue = false;
    } else if (eachRawValue == "null") {
      eachValue = null;
    } else if (!Number.isNaN(Number(eachRawValue))) {
      eachValue = Number(eachRawValue);
    } else if (eachRawValue[0] == "#") {
      eachValue = Number(eachRawValue.replace(/^\#/, "0x"));
    } else {
      eachValue = eachRawValue;
    }
    //@ts-ignore
    result[eachKey] = eachValue;
  }

  // Insert XML inner elements as content with correct type
  if (xmlElement.children.length > 0) {
    result.content = [];
    const length = xmlElement.children.length;
    for (let i = 0; i < length; i++) {
      const each = xmlElement.children.item(i);
      if (each == null) continue;
      const converted = convertElement(each, withInstructs);
      result.content.push(converted);
    }
  } else if (xmlElement.textContent && xmlElement.textContent.length > 0) {
    result.content = xmlElement.textContent;
  }

  return result;
}
