import React, { useEffect } from "react";
import { composeFromJsx, draw } from "compodraw";
import instructs from "compodraw-instructs";

const composed = composeFromJsx(
  <group>
    <move x={15} y={35}>
      <rectangle color="pink" x={10} y={20} width={200} height={150} />
      <rectangle color="green" x={210} y={170} width={200} height={150} />
    </move>
    <move x={15} y={35}>
      <rectangle color="cyan" x={410} y={320} width={200} height={150} />
    </move>
  </group>,
  instructs
);

function onDraw() {
  const element = document.getElementById("viewport");
  draw(composed, element);
}

function WithPlainJSX() {
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

export default WithPlainJSX;
