/* eslint-disable global-require */
const purgecss = require("@fullhuman/postcss-purgecss");

module.exports = {
  plugins: [
    require("postcss-preset-env")({
      browsers: "last 2 versions",
    }),
    require("tailwindcss"),
    require("autoprefixer"),
  ],
};
