# CompoDraw JS

**Compose & Draw for JavaScript**

Easiest way to **compose shapes and effects** with **XML** or **JSX** then **draw them** into **HTML5 Canvas**, without sacrifices **modularity** and **compatibility** among web frameworks.

CompoDraw uses multiple **instruct**s with each of them tells Canvas API how to draw specific thing like a shape or visual effect (e.g. Rotate, Move, Mask, ...). All you need to do is **just arrange them** by writing XML, or JSX if you are ReactJS user.

Instructs are bundled into one package, commonly wrapped with [UMD module](https://www.devguide.at/en/javascript/amd-cjs-umd-esm-modular-javascript/#Universal_Module_Definition_UMD) format. So you can import it to any web framework of your choice :)

## How to Install

1. Add to your project with Yarn:
   ```bash
   yarn add compodraw
   ```
   or with NPM:
   ```bash
   npm install compodraw --save
   ```
   or you can download the bundled JavaScript file for plain HTML or PHP project
2. Then pick your preferred `instructs package`.
   For basic operation, use [compodraw-instructs](https://github.com/Thor-x86/compodraw-js-instructs). If you want, you can build your own instructs package with each instruct is a [class](https://www.w3schools.com/js/js_classes.asp) that has at least `draw(canvasContext)` method
3. That's it! now you can use CompoDraw 😁

## How to Use

First of all, make sure your front-end project already initialized. You can choose either [React](https://reactjs.org/), [Vue](https://vuejs.org/), [Angular](https://angular.io/), [PHP](https://www.quora.com/Which-is-the-best-PHP-framework-for-beginners), or plain HTML. And then, choose your usage method:

### Use with React's JSX

With React, you are able to use the benefit of JSX. Here's [the example](https://github.com/Thor-x86/compodraw-js/blob/dev/examples/usage-with-jsx.md).

### Use with React's JSX (with Tree Shaking)

For production, we recommend you to follow [this example](https://github.com/Thor-x86/compodraw-js/blob/dev/examples/usage-with-jsx-treeshaking.md) instead of above.

### Use with XML

For other than React-based web project, you can still use XML data and compose it without parse by yourself. Here's [the example](https://github.com/Thor-x86/compodraw-js/blob/dev/examples/usage-with-xml.md).

### Use with Embedded XML inside HTML Tag

Embedding XML into HTML is now possible for CompoDrawJS. See [the example](https://github.com/Thor-x86/compodraw-js/blob/dev/examples/usage-with-dom.md).

## How to Contribute

You are free to contribute by opening an issue or pull-request. But before pull-request, it's better to test your changes locally with this command:

```bash
yarn run test
```

or with NPM:

```bash
npm run test
```

Then pull request after all of those tests passed.

**NOTE:** Test is not necessary if you only modify the docs or source code style

## Test on a Computer without GPU

If you are using VM like Hyper-V or Windows Subsystem for Linux (WSL), install [docker](https://docs.docker.com/docker-for-windows/install/#install-docker-desktop-on-windows) first. Then run this command:

```bash
yarn run test:no-gpu
```

or with NPM:

```bash
npm run test:no-gpu
```
