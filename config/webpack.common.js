const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");

const paths = require("./paths");

module.exports = {
  // Where webpack looks to start building the bundle
  entry: [paths.src + "/js/index.js"],

  // Where webpack outputs the assets and bundles
  output: {
    path: paths.build,
    filename: "[name].bundle.js",
    publicPath: "",
  },

  // Customize the webpack build process
  plugins: [
    // Removes/cleans build folders and unused assets when rebuilding
    new CleanWebpackPlugin(),

    // Copies files from target to destination folder
    new CopyWebpackPlugin({
      patterns: [
        {
          from: paths.public,
          to: "assets",
          globOptions: {
            ignore: ["*.DS_Store"],
          },
          noErrorOnMissing: true,
        },
      ],
    }),

    // Generates an HTML file from a template
    new HtmlWebpackPlugin({
      title: "Dev Restaurant",
      favicon: paths.src + "/assets/imgs/favicon.png",
      template: paths.src + "/index.html", // template file
      filename: "index.html", // output file
    }),

    // ESLint configuration
    // new ESLintPlugin({
    //   files: ['.', 'src', 'config'],
    // formatter: 'table',
    // }),
  ],

  // Determine how modules within the project are treated
  module: {
    rules: [
      // JavaScript: Use Babel to transpile JavaScript files
      { test: /\.js$/, use: ["babel-loader"] },

      // Images: Copy image files to build folder
      // Produce all the background in css to a new file
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/background/[name][ext]",
        },
      },

      // Fonts and SVGs: Inline files
      // {
      //   test: /\.(woff(2)?|eot|ttf|otf)$/,
      //   type: 'asset/resource',
      //   generator: {
      //     filename: 'assets/font/[name]',
      //   },
      // },
    ],
  },

  resolve: {
    modules: [paths.src, "node_modules"],
    extensions: [".js", ".jsx", ".json"],
    alias: {
      "@": paths.src,
    },
  },
};
