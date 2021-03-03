# Example with React JSX

**NOTE:** In this example, we're assuming you are using [compodraw-instructs](https://github.com/Thor-x86/compodraw-js-instructs).

Simple code snippet for `src/App.js` to draw pink and cyan rectangle:

```jsx
// Import dependencies:
import React, {useEffect} from 'react';
import {composeFromJsx, draw} from 'compodraw';

// Import CSS style, remove this
// if you don't need it
import './App.css';

// Import your prefered instructs package:
import instructs from 'compodraw-instructs';

// Compose with JSX:
const composed = composeFromJsx(
  <move x={100} y={125}>
    <rectangle
      color="pink"
      x={10} width={200}
      y={20} height={150}
    />
    <rectangle
      color="cyan"
      x={210} width={200}
      y={170} height={150}
    />
  </move>,
  instructs
);

// You can access the composed instructs
// like normal object
const firstRectangle = composed.content[0];
console.log(firstRectangle.color);

// Create a function to handle draw
// everytime browser need to do that
function onDraw() {
  // Get the canvas element
  const element = document.getElementById('viewport');

  // Making sure canvas is exist,
  // otherwise don't draw
  if(!element) return;

  // Now, let's draw the canvas!
  draw(composed, element);
}

// Your React App
function App() {
  // Use hook to make sure canvas element is ready
  useEffect(() => {
    // Draw immediately after canvas is ready
    onDraw();

    // Redraw on browser window resize,
    // otherwise it will stretches
    window.addEventListener('resize', onDraw);

    // Remove the event when user
    // navigates to other page
    return () => window.removeEventListener('resize', onDraw);
  });

  // Render canvas element:
  return (
    <canvas id="viewport">
      <strong>Canvas is NOT supported!</strong>
    </canvas>
  );
}

// Don't forget this
export default App;
```

For experimental purpose, you can use this CSS snippet for `src/App.css` to make canvas fills entire webpage:

```css
html, body, canvas {
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

* {
  box-sizing: border-box;
}
```

**ATTENTION:** Example above is only suitable for learning. For production, use [tree shaking support](https://github.com/Thor-x86/compodraw-js/blob/dev/examples/usage-with-jsx-treeshaking.md) because it makes build size a lot smaller.
