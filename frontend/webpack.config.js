import path from "path";
import { VueLoaderPlugin } from "vue-loader";

module.exports = {
  entry: "./src/main.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: "vue-loader",
      },
      // Add other loaders as needed
    ],
  },
  plugins: [new VueLoaderPlugin()],
};

