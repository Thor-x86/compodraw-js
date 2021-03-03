require("jest-canvas-mock");

const { draw, composeFromXml } = require("../../../build/compodraw");
const instructs = require("compodraw-instructs").all;

const composed = composeFromXml(
  `
  <move x="100" y="125">
    <rectangle
      color="pink"
      x="10" width="200"
      y="20" height="150"
    />
    <rectangle
      color="cyan"
      x="210" width="200"
      y="170" height="150"
    />
    <move x="15" y="35">
      <rectangle
        x="10" width="200"
        y="20" height="150"
      />
    </move>
  </move>
`,
  instructs
);

test('"draw" function is exist', () => {
  expect(typeof draw).toBe("function");
});

test("No error while drawing", () => {
  const canvas = document.createElement("canvas");
  expect(() => {
    draw(composed, canvas);
  }).not.toThrow();
});

test("No error while drawing without canvas", () => {
  expect(() => {
    draw(composed, null);
  }).not.toThrow();
});

test("No error while drawing on invalid canvas", () => {
  const wrongElement = document.createElement("div");
  expect(() => {
    draw(composed, wrongElement);
  }).not.toThrow();
});
