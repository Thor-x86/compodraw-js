# Example with XML data

**NOTE:** In this example, we're assuming you are using [compodraw-instructs](https://github.com/Thor-x86/compodraw-js-instructs).

This method is suitable for other than React framework including PHP and plain HTML.

For this example, there is 3 files in a single folder:
- `index.html` -> Your HTML file
- `compodraw.js` -> CompoDraw bundled javascript file (Download link soon...)
- `compodraw-instructs.js` -> bundled instructs package (Download link soon...)

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

            // Assuming you get this data via
            // Fetch API, Axios, or whatever...
            const receivedXML = `
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
                </move>
            `;

            // Compose from received XML data
            const composed = compodraw.composeFromXml(receivedXML, instructs);

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
