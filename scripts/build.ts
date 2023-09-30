import { readFileSync, writeFileSync } from 'node:fs'

main()

function main() {
  const source = readFileSync('dist/index.js', 'utf-8')
  const styleSource = JSON.stringify(readFileSync('dist/style.css', 'utf-8'))

  const content = `// ==UserScript==
// @name         Yande.re 3.0 alpha
// @namespace    com.zhzwz
// @version      3.0.0-alpha
// @author       zhzwz
// @description  中文标签 | 界面优化 | 高清大图 | 键盘翻页 | 流体布局
// @homepage     https://greasyfork.org/scripts/421970
// @license      MIT
// @match        https://yande.re/*
// @run-at       document-idle
// @sandbox      ISOLATED_WORLD
// @grant        unsafeWindow
// @grant        GM_addStyle
// @grant        GM_download
// ==/UserScript==

/* eslint-env esnext */
/* global global:readonly */
/* global globalThis:readonly */

${source}
GM_addStyle(${styleSource});
`

  writeFileSync('dist/index.user.js', content)
}
