const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const imageminMozjpeg = require("imagemin-mozjpeg");
const ImageminPlugin = require("imagemin-webpack-plugin").default;
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const HtmlCriticalWebpackPlugin = require("html-critical-webpack-plugin");
const PurgecssPlugin = require("purgecss-webpack-plugin");
const glob = require("glob");
const path = require("path");

// process.env.NODE_ENV = 'development';

module.exports = {
  // cache: {
  //   type: "filesystem",
  // },
  entry: "./src/js/main.js",
  output: {
    filename: "[name].[contenthash:10].js",
    path: resolve(__dirname, "build"),
  },

  // split runtime code into a separate chunk
  optimization: {
    moduleIds: "deterministic",
    runtimeChunk: "single",
    // separate code from node_modules directory
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "thread-loader",
            options: { workers: 2 },
          },
          {
            loader: "babel-loader",
            options: {
              // 预设：指示babel做怎么样的兼容性处理
              presets: [
                [
                  "@babel/preset-env",
                  {
                    // 按需加载
                    useBuiltIns: "usage",
                    // 指定core-js版本
                    corejs: {
                      version: 3,
                    },
                    // 指定兼容性做到哪个版本浏览器
                    targets: {
                      chrome: "60",
                      firefox: "60",
                      ie: "9",
                      safari: "10",
                      edge: "17",
                    },
                  },
                ],
              ],
              cacheDirectory: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html",
      minify: true,
    }),
    // copy images
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "src/imgs",
          to: "imgs",
          // to: "imgs/[name].[contenthash:10].[ext]",
        },
      ],
    }),
    // compress images
    // new ImageminPlugin({
    //   pngquant: { quality: [0.5, 0.5] },
    //   plugins: [imageminMozjpeg({ quality: 90 })],
    // }),
    new MiniCssExtractPlugin({
      // 对输出的css文件进行重命名
      filename: "css/main.[contenthash:10].css",
    }),
    new OptimizeCssAssetsWebpackPlugin(),
    // gzip 压缩
    new CompressionWebpackPlugin({
      filename: "[path][base].gz",
      algorithm: "gzip",
      test: /\.(js|css|html)$/,
      // 只处理大于xx字节 的文件，默认：0
      // threshold: 10240,
      // 示例：一个1024b大小的文件，压缩后大小为768b，minRatio : 0.75
      minRatio: 0.8, // 默认: 0.8
    }),
    new PurgecssPlugin({
      paths: glob.sync(`${path.join(__dirname, "src")}/**/*`, { nodir: true }),
    }),
    // new HtmlCriticalWebpackPlugin({
    //   base: path.resolve(__dirname, "build"),
    //   src: "index.html",
    //   dest: "index.html",
    //   inline: true,
    //   minify: true,
    //   extract: true,
    //   width: 1300,
    //   height: 900,
    //   penthouse: {
    //     blockJSRequests: false,
    //   },
    // }),
  ],
  // mode: "production",
  mode: "development",

  devServer: {
    contentBase: resolve(__dirname, "build"),
    compress: true,
    port: 3000,
    open: true,
  },
  cache: {
    type: "memory",
  },
};
