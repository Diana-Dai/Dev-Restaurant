const purgecss = require("@fullhuman/postcss-purgecss");
const cssnano = require("cssnano");

// Development Mode
module.exports = {
  plugins: [
    require("tailwindcss"),
    require("autoprefixer"),
    // cssnano({
    //   preset: "default",
    // }),
    purgecss({
      content: ["./src/layout/*.html"],
      defaultExtractor: (content) =>
        content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [],
    }),
  ],
};

// Production Mode
// module.exports = {
//   plugins: [
//     require("tailwindcss"),
//     require("autoprefixer"),
//     cssnano({
//       preset: "default",
//     }),
//     purgecss({
//       content: ["./src/index.html"],
//       defaultExtractor: (content) => content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [],
//     }),
//   ],
// };
