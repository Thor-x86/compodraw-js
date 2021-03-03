import React, { useEffect } from "react";
import { composeFromXml, draw } from "compodraw";
import instructs from "compodraw-instructs";

function onDraw() {
  const element = document.getElementById("viewport");
  const composed = composeFromXml(element, instructs);
  draw(composed, element);
}

function WithDOM() {
  useEffect(() => {
    onDraw();
    window.addEventListener("resize", onDraw);
    return () => window.removeEventListener("resize", onDraw);
  });
  return (
    <canvas
      id="viewport"
      dangerouslySetInnerHTML={{
        __html: `
          <!--
            <group>
              <move x="15" y="35">
                <rectangle
                  color="pink"
                  x="10"      y="20"
                  width="200" height="150"
                />
                <rectangle
                  color="green"
                  x="210"      y="170"
                  width="200" height="150"
                />
              </move>
              <move x="15" y="35">
                <rectangle
                  color="cyan"
                  x="410"      y="320"
                  width="200" height="150"
                />
              </move>
            </group>
          -->
        `,
      }}
    />
  );
}

export default WithDOM;
