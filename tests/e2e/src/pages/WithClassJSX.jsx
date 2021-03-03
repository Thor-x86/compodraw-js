import React, { useEffect } from "react";
import { composeFromJsx, draw } from "compodraw";
import { Group, Move, Rectangle } from "compodraw-instructs";

const composed = composeFromJsx(
  <Group>
    <Move x={15} y={35}>
      <Rectangle color="pink" x={10} y={20} width={200} height={150} />
      <Rectangle color="green" x={210} y={170} width={200} height={150} />
    </Move>
    <Move x={15} y={35}>
      <Rectangle color="cyan" x={410} y={320} width={200} height={150} />
    </Move>
  </Group>
);

function onDraw() {
  const element = document.getElementById("viewport");
  draw(composed, element);
}

function WithClassJSX() {
  useEffect(() => {
    onDraw();
    window.addEventListener("resize", onDraw);
    return () => window.removeEventListener("resize", onDraw);
  });
  return (
    <canvas id="viewport">
      <strong>Canvas is NOT supported!</strong>
    </canvas>
  );
}

export default WithClassJSX;
