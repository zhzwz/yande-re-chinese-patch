const path = require('path')
const config = require('./package.json')
const { BannerPlugin } = require('webpack')

const banner = `// ==UserScript==
// @name         Yande.re 简体中文
// @namespace    com.coderzhaoziwei.yandere
// @version      ${config.version}
// @author       Coder Zhao
// @description  Simplified Chinese patch for Yande.re | Y 站简体中文补丁
// @modified     ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString('en-DE')}
// @license      MIT
// @homepage     https://greasyfork.org/zh-CN/scripts/421970
// @match        https://yande.re/*
// @exclude      https://yande.re/help
// @grant        none
// ==/UserScript==
`

const production = {
  mode: 'production',
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, ''),
    filename: `index.user.js`,
  },
  module: {
    rules: [
      // { test: /\.css$/, use: './source/text_loader.js' },
      // { test: /\.json$/, use: './source/text_loader.js' },
      // { test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/ },
    ],
  },
  // resolve: {
  //   extensions: ['.tsx', '.ts', '.js'], // 模块化引入文件的缺省类型
  // },
  plugins: [
    new BannerPlugin({ banner, raw: true, entryOnly: true }),
  ],
  optimization: {
    minimize: true,
    minimizer: [],
  },
}

module.exports = [production]
