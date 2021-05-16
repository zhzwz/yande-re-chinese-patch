import { version } from "../package.json"
import cleanup from "rollup-plugin-cleanup"
import json from "@rollup/plugin-json"

const banner = `// ==UserScript==
// @name         Yande.re 简体中文
// @namespace    com.coderzhaoziwei.yandere
// @version      ${ version }
// @author       Coder Zhao coderzhaoziwei@outlook.com
// @description  Y 站简体中文补丁| 显示隐藏作品 | 高清大图模式 | 界面布局优化 | 方向键翻页 | Simplified Chinese patch for Yande.re
// @modified     ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString('en-DE')}
// @homepage     https://greasyfork.org/scripts/421970
// @license      MIT
// @match        https://yande.re/*
// @exclude      https://yande.re/forum/*
// @match        https://oreno.imouto.us/*
// @exclude      https://oreno.imouto.us/forum/*
// @match        https://konachan.com/*
// @supportURL   https://github.com/coderzhaoziwei/yande-re-chinese-patch/issues
// @grant        none
// ==/UserScript==

/* eslint-env es6 */
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

// @match https://konachan.com/*
