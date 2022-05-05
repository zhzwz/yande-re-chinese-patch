import { version } from "../package.json"
import cleanup from "rollup-plugin-cleanup"
import json from "@rollup/plugin-json"

const banner = `// ==UserScript==
// @name         Yande.re 简体中文
// @namespace    com.coderzhaoziwei.yandere
// @version      ${ version }
// @author       Coder Zhao coderzhaoziwei@outlook.com
// @description  中文标签 | 界面优化 | 高清大图 | 键盘翻页 | 流体布局
// @homepage     https://greasyfork.org/scripts/421970
// @license      MIT
// @match        https://yande.re/*
// @exclude      https://yande.re/forum/*
// @match        https://konachan.com/*
// @exclude      https://konachan.com/forum/*
// @match        https://konachan.net/*
// @exclude      https://konachan.net/forum/*
// @supportURL   https://github.com/coderzhaoziwei/yande-re-chinese-patch/issues
// @grant        GM_download
// ==/UserScript==

/* eslint-env es2022 */
/* global jQuery:readonly */
/* global Vue:readonly */
/* global Vuetify:readonly */
/* global VueMasonry:readonly */
`

export default {
  input: "source/index.js",
  output: {
    file: "bundle/index.js",
    format: "iife",
    banner,
  },
  plugins: [ cleanup(), json() ],
}
