// ==UserScript==
// @name         yande-re-chinese-patch
// @namespace    yande.re.chinese.patch
// @version      0.0.1
// @author       Coder Zhao
// @description  Yande.re Chinese Patch | Y站汉化补丁
// @modified     2021/2/16 23:05:51
// @license      MIT
// @homepage     https://greasyfork.org/zh-CN/scripts/
// @match        https://yande.re/*
// @exclude      https://yande.re/exclude
// @compatible   chrome
// @grant        unsafeWindow
// @grant        GM_addStyle
// @grant        GM_setClipboard
// ==/UserScript==

/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 604:
/***/ (() => {


;// CONCATENATED MODULE: ./source/data/tags.json
;// CONCATENATED MODULE: ./source/index.js


// 遍历所有的 <a> 元素
Array.from(document.getElementsByTagName('a')).forEach(a => {
  const href = a.getAttribute('href')
  if (typeof href === 'string' && /^\/post\?tags=(\S+)$/.test(href)) {
    const en = RegExp.$1
    const cn = tags_namespaceObject[en]
    if (cn) a.innerText = `[${cn}]${en.replace(/_/g, ' ')}`
  }
})


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module doesn't tell about it's top-level declarations so it can't be inlined
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__[604]();
/******/ 	
/******/ })()
;