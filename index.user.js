// ==UserScript==
// @name         Yande.re 简体中文
// @namespace    com.coderzhaoziwei.yandere
// @version      1.0.2
// @author       Coder Zhao
// @description  Y 站简体中文补丁 | 界面布局优化 | 显示隐藏作品 | 方向键翻页 | Simplified Chinese patch for Yande.re
// @modified     2021/3/2 13:01:10
// @license      MIT
// @homepage     https://greasyfork.org/zh-CN/scripts/421970
// @match        https://yande.re/*
// @exclude      https://yande.re/forum/*
// @match        https://yande.in/*
// @supportURL   https://github.com/coderzhaoziwei/yande-re-chinese-patch/issues
// @grant        none
// ==/UserScript==

/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 798:
/***/ (() => {


;// CONCATENATED MODULE: ./tags.json
const tags_namespaceObject = JSON.parse('{"anal":"肛交","angel":"天使","animal_ears":"兽耳","anus":"肛门露出","areola":"乳晕","armor":"盔甲/装甲","artist_revision":"画师修改","ass":"臀部","ass_grab":"持股/捏臀","bandages":"绷带","bathing":"沐浴","bikini":"比基尼","bikini_armor":"比基尼装甲/轻薄盔甲","bikini_top":"比基尼乳罩","blood":"血腥","bloomers":"灯笼裤/宽松短裤","bodysuit":"紧身衣裤","bondage":"束缚","bottomless":"下身露出","bra":"乳罩","breast_grab":"握乳","breast_hold":"托乳","breasts":"乳","bunny_ears":"兔耳","bunny_girl":"兔女郎","calendar":"日历","cameltoe":"阴户凸显","censored":"有码","cheerleader":"啦啦队队员","chibi":"Q版","chinadress":"旗袍","christmas":"圣诞","cleavage":"乳沟","cream":"奶油","cum":"精液","dakimakura":"抱枕","digital_version":"数字版","disc_cover":"光盘封面","dress":"连衣裙","dress_shirt":"衬衫","erect_nipples":"乳尖","extreme_content":"极端","eyepatch":"眼罩","feet":"足","fellatio":"口交","fishnets":"鱼网袜","fixed":"修改","footjob":"足交","futanari":"扶她","game_cg":"游戏CG","gangbang":"乱交","garter":"袜带","garter_belt":"吊袜腰带","gun":"枪炮","guro":"猎奇","halloween":"万圣节前夜","handjob":"打手枪","headphones":"耳机","heels":"高跟鞋","heterochromia":"虹膜异色","horns":"角","japanese_clothes":"日式服装","kimono":"和服","kitsune":"狐狸","landscape":"风景画","leotard":"紧身连衣裤","lingerie":"贴身内衣","loli":"萝莉","lolita_fashion":"洛丽塔","maid":"女仆","male":"男性","masturbation":"自摸/手淫","mecha":"机甲","megane":"眼镜","miko":"巫女","monochrome":"单色","naked":"裸体","naked_apron":"裸体围裙","neko":"猫","nekomimi":"猫耳","nipples":"乳头","no_bra":"无乳罩","nopan":"无胖次","nurse":"护士","onsen":"温泉","open_shirt":"衬衫敞开","pajama":"睡衣","pantsu":"胖次","panty_pull":"胖次脱下","pantyhose":"吊带袜","partial_scan":"局部扫描","penis":"阴茎","pointy_ears":"尖耳朵","pubic_hair":"阴毛","pussy":"阴户","pussy_juice":"妹汁","school_swimsuit":"学校泳衣","see_through":"透视","seifuku":"制服","sex":"性交","shimapan":"条纹胖次","shirt_lift":"衬衫掀起","shota":"正太","sketch":"素描","skirt_lift":"裙摆掀起","stockings":"长筒袜","string_panties":"细绳胖次","sweater":"毛衣","swimsuits":"泳衣","sword":"刀剑","symmetrical_docking":"乳乳相接","tagme":"标签","tail":"兽尾","tan_lines":"日晒线","tattoo":"文身","tentacles":"触手","text":"文本","thighhighs":"过膝袜","thong":"丁字裤","topless":"上身露出","torn_clothes":"破衣","towel":"浴巾","transparent_png":"背景透明","uncensored":"无码","underboob":"南半球/下乳露出","undressing":"脱衣","uniform":"制服","waitress":"女侍","wallpaper":"壁纸","weapon":"武器","wedding_dress":"婚纱","wet":"湿身","wet_clothes":"湿衣","wings":"翅膀","witch":"女巫","yukata":"浴衣","yuri":"百合"}');
;// CONCATENATED MODULE: ./style.css
/* harmony default export */ const style = ("/* 标签前缀 */\nli.tag-type-artist a:nth-child(4)::before {\n  content: '[画师]';\n}\nli.tag-type-copyright a:nth-child(4)::before {\n  content: '[原作]';\n}\nli.tag-type-character a:nth-child(4)::before {\n  content: '[角色]';\n}\nli.tag-type-circle a:nth-child(4)::before {\n  content: '[公司]';\n}\n\n/* 字体大小 */\nbody {\n  font-size: 12px;\n  padding: 12px 4px;\n}\n\n/* 标题居中 */\n#title {\n  display: flex;\n  justify-content: center;\n  margin: 0 0 0 0 !important;\n}\n#site-title {\n  display: flex !important;\n}\n#main-menu {\n  padding: 0 !important;\n  margin: 0 !important;\n  display: flex !important;\n  justify-content: center;\n}\n\n/* 通知居中 */\n.status-notice {\n  text-align: center;\n}\n\n/* 图片区域 */\n#post-list {\n  display: flex;\n  flex-direction: row;\n}\n#post-list > .sidebar {\n  width: auto;\n  max-width: 200px;\n  flex: 0 0 auto;\n}\n#post-list > .content {\n  width: auto;\n  flex: 0 1 auto;\n}\n\n#post-list-posts {\n  display: flex !important;\n  flex-wrap: wrap;\n  justify-content: center;\n}\n#post-list-posts > li {\n  width: auto !important;\n  height: auto !important;\n  margin: 0 8px 8px 0 !important; /* 图片区域间距 */\n  border: 1px solid rgba(0, 0, 0, 0);\n}\n#post-list-posts > li.javascript-hide:not(.set-javascript-hide) {\n  display: block !important;\n  position: relative;\n}\n#post-list-posts > li.javascript-hide::after {\n  content: \"\";\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  box-shadow: 0px 0px 12px rgb(255, 0, 0) inset;\n  pointer-events: none;\n}\n#post-list-posts > li > .inner {\n  width: auto !important;\n  height: 150px !important;\n  display: flex;\n  align-items: center;\n}\n#post-list-posts > li > .inner > .thumb {\n  height: auto;\n}\n#post-list-posts > li > .largeimg.directlink {\n  height: 12px;\n  font-size: 12px;\n  line-height: 12px;\n  padding: 0;\n  margin: 2px 0 0 0;\n  overflow: hidden;\n}\n\n/* checkbox 显示隐藏的作品 */\n#script-addition-checkbox {\n  user-select: none;\n  text-align: right;\n  font-weight: 100;\n  padding: 8px 12px;\n}\n");
;// CONCATENATED MODULE: ./index.js

(function() {
  const list = Array.from(document.getElementsByTagName('a'))
  list.forEach(a => {
    const href = a.getAttribute('href')
    if (typeof href === 'string' && /^\/post\?tags=(\S+)$/.test(href)) {
      const en = RegExp.$1
      const cn = tags_namespaceObject[en]
      if (cn) a.innerText = `[${cn}]${en.replace(/_/g, ' ')}`
    }
  })
})()

/**
 * 创建 <style> 标签，导入 style.css 的内容。
 */
;(function() {
  const element = document.createElement('style')
  element.innerHTML = style
  document.head.appendChild(element)
})()

/**
 * 导航栏，替换主菜单和子菜单的部分文本内容。
 */
;(function() {
  const list1 = Array.from(document.querySelectorAll('#main-menu>ul>li>a'))
  const list2 = Array.from(document.querySelectorAll('ul.submenu>li>a'))
  const list  = [...list1, ...list2]

  list.forEach(menu => {
    if (menu.getAttribute('href') === '#') return
    const en = menu.innerText
    const cn = {
      /* 主菜单 */
      'My Account': '账户',
      'Posts':      '作品',
      'Comments':   '评论',
      'Notes':      '笔记',
      'Artists':    '画师',
      'Tags':       '标签',
      'Forum':      '论坛',
      'Help':       '帮助',
      'More »':     '更多>>',
      'New Mail':   '新消息',
      /* 子菜单 */
      'My Profile':      '我的资料',
      'My Mail':         '我的消息',
      'My Favorites':    '我的收藏',
      'Settings':        '设置',
      'Change Password': '修改密码',
      'Logout':          '退出登录',
      'View Posts':      '浏览作品',
      'Search Posts':    '搜索作品',
      'Upload':          '上传',
      'Random':          '随机浏览',
      'Popular':         '热门',
      'Image Search':    '搜索图片',
      'History':         '历史',
      'View Comments':   '浏览评论',
      'Search Comments': '搜索评论',
      'View Notes':      '浏览笔记',
      'Search Notes':    '搜索笔记',
      'View Artists':    '浏览画师',
      'Search Artists':  '搜索画师',
      'Create':          '创建',
      'View Tags':       '浏览标签',
      'Search Tags':     '搜索标签',
      'Aliases':         '别名',
      'Implications':    '含义',
      'View Pools':      '浏览 Pools',
      'Search Pools':    '搜索 Pools',
      'Create New Pool': '创建 Pool',
      'View Wiki Index': '浏览 Wiki 主页',
      'Search Wiki':     '搜索 Wiki',
      'Create New Page': '创建新页面',
      'Mark All Read':   '全部标记已读',
    }[en]
    if (typeof cn === 'string') menu.innerText = cn
  })
})()

/**
 * 提示信息
 * EN: This image has been resized. Click on the `View larger version` link in the sidebar
 *     for a high-quality version. Hide this message
 * CN: 这张图片已经被压缩，单击侧边栏中的 `显示高清图` 可以获取更高质量的版本。不再提醒
 *
 * EN: This post belongs to a parent post.
 * EN: This post has child posts. (post #728160, 746235)
 * EN: This post has a child post. (post #383703)
  </div>
 */
;(function() {
  Array.from(document.querySelectorAll('.status-notice')).forEach(element => {
    console.log(element.innerHTML)
    element.innerHTML = element.innerHTML
      .replace(/^[\s]+This image has been resized. Click on the /, '这张图片已经被压缩，单击侧边栏中的')
      .replace(/View larger version/, '显示高清图')
      .replace(/ link in the sidebar for a high-quality version./, '可以获取更高质量的版本。')
      .replace(/Hide this message<\/a>\./, '不再提醒</a>')
      /* 相关父作品 */
      .replace(/This post belongs to a /, '这张图片从属于一个').replace(/parent post<\/a>\./, '相关父作品</a>。')
      /* 相关子作品 */
      .replace(/This post has /, '这张图片从属于一个')
      .replace(/child posts<\/a>\. \(post #/, '作品集</a>。相关子作品：')
      .replace(/a child post<\/a>\. \(post #/, '作品集</a>。相关子作品：')
      .replace(/<\/a>, <a /, '</a> | <a ').replace(/<\/a>\)/, '</a>')
  })
})()

/**
 * 快捷操作，替换指定的元素的文本内容。
 */
;(function() {
  const translate = function(selector, en, cn) {
    const element = document.querySelector(selector)
    if (element) element.innerText = element.innerText.replace(en, cn)
  }
  const list = [
    ['#highres-show',                   'View larger version',     '显示高清图'],
    ['#highres',                        'Download larger version', '下载高清图'],
    ['#png',                            'Download PNG',            '下载 PNG 图'],
    ['li#add-to-favs>a',                'Add to favorites',        '添加收藏'],
    ['li#set-avatar>a',                 'Set avatar',              '设置头像'],
    ['h4>a.js-posts-show-edit-tab',     'Edit',                    '编辑'],
    ['h4>a.js-posts-show-comments-tab', 'Respond',                 '评论'],
    ['.pagination>.previous_page',      '← Previous',              '上一页'],
    ['.pagination>.next_page',          'Next →',                  '下一页'],
  ]
  list.forEach(item => translate(...item))
  /* 页脚 */
  Array.from(document.querySelectorAll('#subnavbar>li>a')).forEach(a => {
    const en = a.innerText
    const cn = {
      'List': '首页',
      'Browse': '翻阅',
      'Upload': '上传',
      'Random': '随机',
      'Popular': '热门',
      'Image Search': '寻图',
      'History': '历史',
      'Help': '帮助',
    }[en]
    if (cn) a.innerText = cn
  })
})()

/**
 * 翻页功能，使用键盘左右方向键控制。
 */
;(function() {
  window.addEventListener('keyup', function(event) {
    /* 在输入的情况下，方向键禁止触发翻页。 */
    if (/^(TEXTAREA|INPUT|SELECT|BUTTON)$/.test(document.activeElement.tagName)) return

    const prev = document.querySelector('.pagination>.previous_page')
    const next = document.querySelector('.pagination>.next_page')
    if (event.key == 'ArrowLeft'  && prev) {
      prev.click()
      return event.preventDefault()
    }
    if (event.key == 'ArrowRight' && next) {
      next.click()
      return event.preventDefault()
    }
  })
})()

/**
 * 默认显示隐藏的作品，并提供可开关的选项。
 */
;(function() {
  const SET_JS_HIDE = 'set-javascript-hide'
  const INPUT_HTML = `<input type="checkbox" id="${SET_JS_HIDE}"> <label for="${SET_JS_HIDE}">显示隐藏的作品</label>`

  const target = document.getElementById('post-list-posts')
  if (target && target.parentNode) {
    const div = document.createElement('div')
    target.parentNode.insertBefore(div, target)
    div.innerHTML = INPUT_HTML
    div.setAttribute('style', 'user-select: none; text-align: right;')
    div.setAttribute('id', 'script-addition-checkbox')
  } else return

  const checkbox = document.getElementById(SET_JS_HIDE)
  checkbox.checked = JSON.parse(localStorage.getItem(SET_JS_HIDE))
  update()
  checkbox.addEventListener('change', update)

  function update() {
    Array.from(document.querySelectorAll('.javascript-hide')).forEach(element => {
      if (checkbox.checked) element.removeClassName(SET_JS_HIDE)
      else element.addClassName(SET_JS_HIDE)
    })
    localStorage.setItem(SET_JS_HIDE, checkbox.checked)
  }
})()


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module doesn't tell about it's top-level declarations so it can't be inlined
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__[798]();
/******/ 	
/******/ })()
;