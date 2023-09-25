/* global module */

let config = {
  notGetBlocks: ["blocks-demo.html"],
  ignoredBlocks: ["no-js"],
  alwaysAddBlocks: [
    // 'sprite-svg',
    // 'sprite-png',
  ],
  addStyleBefore: [
    "src/scss/variables.scss",
    "src/scss/mixins.scss",
    "src/scss/main.scss",
    "src/scss/fonts.scss",
    "swiper/swiper-bundle.min.css",
    "@fancyapps/ui/dist/fancybox/fancybox.css",
    // 'somePackage/dist/somePackage.css', // для 'node_modules/somePackage/dist/somePackage.css',
  ],
  addStyleAfter: [
    // 'src/scss/print.scss',
  ],
  addJsBefore: [
    // 'somePackage/dist/somePackage.js', // для 'node_modules/somePackage/dist/somePackage.js',
  ],
  addJsAfter: ["./script.js"],
  addAssets: {
    "src/img/*.{png,svg,jpg,jpeg,mp4,gif}": "img/",
    "src/img/*/*.{png,svg,jpg,jpeg,mp4,gif}": "img/",
    "src/fonts/{otf,ttf,woff,woff2}/TTFirsNeue{DemiBold,Light,Regular}.{otf,ttf,woff,woff2}":
      "fonts/",
    // 'src/favicon/*.{png,ico,svg,xml,webmanifest}': 'img/favicon',
    // 'node_modules/somePackage/images/*.{png,svg,jpg,jpeg}': 'img/',{otf,ttf,jpg,jpeg}
  },
  dir: {
    src: "src/",
    build: "build/",
    blocks: "src/blocks/",
  },
};

module.exports = config;
