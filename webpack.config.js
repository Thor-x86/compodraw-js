const path = require("path");

/** @type {import('webpack').Configuration} */
module.exports = {
  mode: "production",
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "./build"),
    filename: "compodraw.js",
    library: "compodraw",
    libraryTarget: "umd",
    umdNamedDefine: true,
  },
  devtool: "source-map",
  context: __dirname,
  target: "web",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
};
