const {
  composeFromJsx,
  JsxNameError,
  InstructNotFoundError,
  InvalidClassError,
} = require("../../../build/compodraw");

const { createElement, Component } = require("react");
const instructs = require("compodraw-instructs").all;
const { Move, Rectangle } = require("compodraw-instructs");

test('"composeFromJsx" function is exist', () => {
  expect(typeof composeFromJsx).toBe("function");
});

test("Non-group composition", () => {
  /** @todo Change to JSX syntax */
  const composed = composeFromJsx(
    createElement("rectangle", {
      x: 10,
      y: 20,
      width: 200,
      height: 150,
    }),
    instructs
  );

  expect(typeof composed).toBe("object");
  expect(composed).toHaveProperty("x", 10);
  expect(composed).toHaveProperty("y", 20);
  expect(composed).toHaveProperty("width", 200);
  expect(composed).toHaveProperty("height", 150);
});

test("Single content composition", () => {
  /** @todo Change to JSX syntax */
  const composed = composeFromJsx(
    createElement(
      "move",
      { x: 15, y: 35 },
      createElement("rectangle", {
        x: 10,
        y: 20,
        width: 200,
        height: 150,
      })
    ),
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
  /** @todo Change to JSX syntax */
  const composed = composeFromJsx(
    createElement("move", {
      x: 15,
      y: 35,
      children: [
        createElement("rectangle", {
          x: 10,
          y: 20,
          width: 200,
          height: 150,
        }),
        createElement("rectangle", {
          x: 210,
          y: 170,
          width: 200,
          height: 150,
        }),
      ],
    }),
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

test("Multiple content composition but with classes", () => {
  /** @todo Change to JSX syntax */
  const composed = composeFromJsx(
    createElement(Move, {
      x: 15,
      y: 35,
      children: [
        createElement(Rectangle, {
          x: 10,
          y: 20,
          width: 200,
          height: 150,
        }),
        createElement(Rectangle, {
          x: 210,
          y: 170,
          width: 200,
          height: 150,
        }),
      ],
    })
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

test("String content composition", () => {
  /** @todo Change to JSX syntax */
  const composed = composeFromJsx(
    createElement(
      "text",
      { x: 25, y: 60, align: "center" },
      "\r\n\tLorem Ipsum\r\n    Dolor Amet\r\n"
    ),
    instructs
  );

  expect(typeof composed).toBe("object");
  expect(composed).toHaveProperty("x", 25);
  expect(composed).toHaveProperty("y", 60);
  expect(composed).toHaveProperty("align", "center");
  expect(composed).toHaveProperty("content", "Lorem Ipsum\r\nDolor Amet");
});

test("Throw error when element name is invalid", () => {
  const faultyElement = {
    type: [true, false, {}],
    props: {},
  };

  expect(() => {
    composeFromJsx(faultyElement);
  }).toThrow(new JsxNameError("true,false," + {}));
});

test("Throw error when element name is not registered", () => {
  /** @todo Change to JSX syntax */
  const faultyElement = createElement("i-am-invalid");

  expect(() => {
    composeFromJsx(faultyElement, instructs);
  }).toThrow(new InstructNotFoundError("i-am-invalid", "jsx"));
});

test("Throw error when instruction is not a valid class", () => {
  /** @todo Change to JSX syntax */
  const faultyElement = createElement(Component);

  expect(() => {
    composeFromJsx(faultyElement);
  }).toThrow(new InvalidClassError("Instruct"));
});
