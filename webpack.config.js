const path = require('path')
const config = require('./package.json')
const { BannerPlugin } = require('webpack')

const banner = `// ==UserScript==
// @name         Yande.re 简体中文
// @namespace    com.coderzhaoziwei.yandere
// @version      ${config.version}
// @author       Coder Zhao
// @description  Y 站简体中文补丁| 显示隐藏作品 | 高清大图模式 | 界面布局优化 | 方向键翻页 | Simplified Chinese patch for Yande.re
// @modified     ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString('en-DE')}
// @license      MIT
// @homepage     https://greasyfork.org/zh-CN/scripts/421970
// @match        https://yande.re/*
// @exclude      https://yande.re/forum/*
// @match        https://yande.in/*
// @match        https://oreno.imouto.us/*
// @supportURL   https://github.com/coderzhaoziwei/yande-re-chinese-patch/issues
// @grant        none
// ==/UserScript==
`

module.exports = {
  mode: 'production',
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, ''),
    filename: `index.user.js`,
  },
  module: {
    rules: [
      { test: /\.css$/, use: './css_text_loader.js' },
    ],
  },
  plugins: [
    new BannerPlugin({ banner, raw: true, entryOnly: true }),
  ],
  optimization: {
    minimize: true,
    minimizer: [],
  },
}
