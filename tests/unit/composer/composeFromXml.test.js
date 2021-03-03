const {
  composeFromXml,
  XmlSyntaxError,
  InstructNotFoundError,
  InvalidClassError,
  XmlInHtmlError,
} = require("../../../build/compodraw");

const instructs = require("compodraw-instructs").all;

test('"composeFromXml" function is exist', () => {
  expect(typeof composeFromXml).toBe("function");
});

test("Non-group composition", () => {
  const composed = composeFromXml(
    `
    <rectangle
      x="10"      y="20"
      width="200" height="150"
    />
  `,
    instructs
  );

  expect(typeof composed).toBe("object");
  expect(composed).toHaveProperty("x", 10);
  expect(composed).toHaveProperty("y", 20);
  expect(composed).toHaveProperty("width", 200);
  expect(composed).toHaveProperty("height", 150);
});

test("Single content composition", () => {
  const composed = composeFromXml(
    `
    <move x="15" y="35">
      <rectangle
        x="10"      y="20"
        width="200" height="150"
      />
    </move>
  `,
    instructs
  );

  expect(typeof composed).toBe("object");
  expect(composed).toHaveProperty("x", 15);
  expect(composed).toHaveProperty("y", 35);
  expect(composed).toHaveProperty("content");

  expect(Array.isArray(composed.content)).toBe(true);
  expect(composed.content.length).toBe(1);

  expect(composed.content[0]).toHaveProperty("x", 10);
  expect(composed.content[0]).toHaveProperty("y", 20);
  expect(composed.content[0]).toHaveProperty("width", 200);
  expect(composed.content[0]).toHaveProperty("height", 150);
});

test("Multiple content composition", () => {
  const composed = composeFromXml(
    `
    <move x="15" y="35">
      <rectangle
        x="10"      y="20"
        width="200" height="150"
      />
      <rectangle
        x="210"      y="170"
        width="200" height="150"
      />
    </move>
  `,
    instructs
  );

  expect(typeof composed).toBe("object");
  expect(composed).toHaveProperty("x", 15);
  expect(composed).toHaveProperty("y", 35);
  expect(composed).toHaveProperty("content");

  expect(Array.isArray(composed.content)).toBe(true);
  expect(composed.content.length).toBe(2);

  expect(composed.content[0]).toHaveProperty("x", 10);
  expect(composed.content[0]).toHaveProperty("y", 20);
  expect(composed.content[0]).toHaveProperty("width", 200);
  expect(composed.content[0]).toHaveProperty("height", 150);

  expect(composed.content[1]).toHaveProperty("x", 210);
  expect(composed.content[1]).toHaveProperty("y", 170);
  expect(composed.content[1]).toHaveProperty("width", 200);
  expect(composed.content[1]).toHaveProperty("height", 150);
});

test("Multiple content composition but inside DOM", () => {
  const canvasDOM = document.createElement("canvas");
  canvasDOM.innerHTML = `
    <!--
    <move x="15" y="35">
      <rectangle
        x="10"      y="20"
        width="200" height="150"
      />
      <rectangle
        x="210"      y="170"
        width="200" height="150"
      />
    </move>
    -->
  `;

  const composed = composeFromXml(canvasDOM, instructs);

  expect(typeof composed).toBe("object");
  expect(composed).toHaveProperty("x", 15);
  expect(composed).toHaveProperty("y", 35);
  expect(composed).toHaveProperty("content");

  expect(Array.isArray(composed.content)).toBe(true);
  expect(composed.content.length).toBe(2);

  expect(composed.content[0]).toHaveProperty("x", 10);
  expect(composed.content[0]).toHaveProperty("y", 20);
  expect(composed.content[0]).toHaveProperty("width", 200);
  expect(composed.content[0]).toHaveProperty("height", 150);

  expect(composed.content[1]).toHaveProperty("x", 210);
  expect(composed.content[1]).toHaveProperty("y", 170);
  expect(composed.content[1]).toHaveProperty("width", 200);
  expect(composed.content[1]).toHaveProperty("height", 150);
});

test("Throw error when syntax error", () => {
  const faultyElement = `</ my-fault>`;

  expect(() => {
    composeFromXml(faultyElement, instructs);
  }).toThrow(new XmlSyntaxError("1:4: disallowed character in closing tag."));
});

test("Throw error when element name is not registered", () => {
  const faultyElement = `<i-am-invalid />`;

  expect(() => {
    composeFromXml(faultyElement, instructs);
  }).toThrow(new InstructNotFoundError("i-am-invalid", "xml"));
});

test("Throw error when instruction is not a valid class", () => {
  const faultyInstructs = {
    "the-faulty-one": class TheFaultyOne {},
  };

  expect(() => {
    composeFromXml("<the-faulty-one />", faultyInstructs);
  }).toThrow(new InvalidClassError("Instruct"));
});

test("Throw error when XML in HTML Element is not commented", () => {
  const canvasDOM = document.createElement("canvas");
  canvasDOM.innerHTML = "<rectangle />";

  expect(() => {
    composeFromXml(canvasDOM, instructs);
  }).toThrow(new XmlInHtmlError("canvas"));
});
