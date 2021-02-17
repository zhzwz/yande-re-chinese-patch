// ==UserScript==
// @name         Yande.re 简体中文
// @namespace    com.coderzhaoziwei.yandere
// @version      0.0.3
// @author       Coder Zhao
// @description  Y站简体中文补丁 | Simplified Chinese patch for Yande.re
// @modified     2021/2/17 20:56:16
// @license      MIT
// @homepage     https://greasyfork.org/zh-CN/scripts/
// @match        https://yande.re/*
// @exclude      https://yande.re/exclude
// @grant        none
// ==/UserScript==

/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 604:
/***/ (() => {


;// CONCATENATED MODULE: ./source/data/tags.json
const tags_namespaceObject = JSON.parse('{"anal":"肛门","angel":"天使","animal_ears":"兽耳","anus":"菊花","areola":"乳晕","armor":"装甲","ass":"屁股","bandages":"绷带","bathing":"沐浴","bikini":"比基尼","blood":"血腥","bodysuit":"紧身衣裤","bondage":"束缚","bottomless":"下身裸露","bra":"胸罩","breast_grab":"胸部抓握","breast_hold":"胸部托起","breasts":"胸部","bunny_ears":"兔耳","cameltoe":"阴户凸显","censored":"有码","cheerleader":"啦啦队队员","chibi":"Q版","cleavage":"乳沟","cream":"奶油","cum":"精液","dress":"连衣裙","dress_shirt":"衬衫","erect_nipples":"乳尖","extreme_content":"极端","feet":"足","fellatio":"口交","footjob":"足交","futanari":"扶她","garter":"袜带","garter_belt":"吊袜腰带","gun":"枪炮","guro":"猎奇","headphones":"耳机","heels":"高跟鞋","horns":"角","japanese_clothes":"日式服装","kimono":"和服","lingerie":"贴身内衣","loli":"萝莉","lolita_fashion":"洛丽塔","maid":"女仆","male":"男性","masturbation":"自摸","megane":"眼镜","monochrome":"黑白","naked":"裸体","naked_apron":"裸体围裙","neko":"猫娘","nekomimi":"猫耳","nipples":"乳头","no_bra":"无胸罩","nopan":"无内裤","onsen":"温泉","open_shirt":"衬衫敞开","pajama":"睡衣","pantsu":"胖次","panty_pull":"脱内裤","pantyhose":"吊带袜","partial_scan":"局部扫描","penis":"阴茎","pointy_ears":"尖耳朵","pubic_hair":"阴毛","pussy":"阴户","pussy_juice":"妹汁","school_swimsuit":"学校泳衣","see_through":"透视","seifuku":"制服","sex":"性交","shimapan":"条纹内裤","shirt_lift":"衬衫提起","skirt_lift":"裙摆提起","stockings":"长筒袜","string_panties":"细绳内裤","sweater":"毛线衣","swimsuits":"泳衣","sword":"刀剑","tagme":"标签","tail":"兽尾","tattoo":"文身","tentacles":"触手","thighhighs":"过膝袜","thong":"丁字裤","topless":"上身裸露","torn_clothes":"衣服撕裂","towel":"浴巾","transparent_png":"透明PNG","uncensored":"无码","underboob":"内衣裤","undressing":"脱衣服","uniform":"制服","wallpaper":"壁纸","weapon":"武器","wet":"湿身","wet_clothes":"衣服打湿","wings":"翅膀","witch":"女巫","yuri":"百合"}');
;// CONCATENATED MODULE: ./source/index.js


/* 遍历所有的 <a> 元素 */
Array.from(document.getElementsByTagName('a')).forEach(a => {
  const href = a.getAttribute('href')
  /* 标签 */
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