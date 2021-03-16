# Example with Programmatical Method

**NOTE:** In this example, we're assuming you are using [compodraw-instructs](https://github.com/Thor-x86/compodraw-js-instructs).

This method is suitable for logic-based composition. On this example, we don't use any framework. However, you can implement this on any framework that currently you're using.

There is 3 files in a single folder:
- `index.html` -> Your HTML file
- `compodraw.js` -> CompoDraw bundled javascript file -- [download](https://github.com/Thor-x86/compodraw-js/releases)
- `compodraw-instructs.js` -> bundled instructs package -- [download](https://github.com/Thor-x86/compodraw-js-instructs/releases)

Then write this snippet code to `index.html`:

```html
<!DOCTYPE html>
<html>
    <head>
        <title>CompoDraw Example with XML</title>
        <style>
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
        </style>
    </head>
    <body>
        <canvas id="viewport">
            <strong>Canvas is NOT supported!</strong>
        </canvas>

        <!-- Load the bundled JavaScripts -->
        <!-- make sure they are in the same folder -->
        <script src="compodraw.js"></script>
        <script src="compodraw-instructs.js"></script>

        <script>
            // If instructs package name contains
            // dash character "-", make an alias for it
            const instructs = self['compodraw-instructs'].all;

            // Compose logically
            const composed = new instructs.Elevate();
            for(let i = 0; i < 10; i++) {
                const color = i * 255 / 10;
                const rectangle = new instructs.Rectangle();
                rectangle.x = 20 + (120 * i);
                rectangle.y = 20;
                rectangle.color = `rgba(${color},${color},${color},1)`;
                composed.content.push(rectangle);
            }

            // Get the canvas element
            const element = document.getElementById('viewport');

            // Redraw on browser window resize,
            // otherwise it will stretches
            window.onresize = () => {
                compodraw.draw(composed, element);
            };

            // Now, let's draw the canvas!
            compodraw.draw(composed, element);
        </script>

    </body>
</html>
```
