const path = require('path')
const config = require('./package.json')
const { BannerPlugin } = require('webpack')

const banner = `// ==UserScript==
// @name         ${config.name}
// @namespace    ${config.name.replace(/-/g, '.')}
// @version      ${config.version}
// @author       ${config.author}
// @description  ${config.description}
// @modified     ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString('en-DE')}
// @license      ${config.license}
// @homepage     https://greasyfork.org/zh-CN/scripts/
// @match        https://yande.re/*
// @exclude      https://yande.re/exclude
// @compatible   chrome
// @grant        unsafeWindow
// @grant        GM_addStyle
// @grant        GM_setClipboard
// ==/UserScript==
`

const production = {
  mode: 'production',
  entry: './source/index.js',
  output: {
    path: path.resolve(__dirname, 'bundles'),
    filename: `yrcp.${config.version}.user.js`,
  },
  module: {
    rules: [
      // { test: /\.css$/, use: './source/loader/text-loader.js' },
      // { test: /\.json$/, use: './source/loader/text-loader.js' },
      // { test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/ },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'], // 模块化引入文件的缺省类型
  },
  plugins: [
    new BannerPlugin({ banner, raw: true, entryOnly: true }),
  ],
  optimization: {
    minimize: true,
    minimizer: [],
  },
}

module.exports = [production]
