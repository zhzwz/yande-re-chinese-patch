import tags from './tags.json'
import style from './style.css'

/**
 * 遍历页面所有的 <a> 元素，筛选出标签，然后替换文本内容。
 */
;(function() {
  const list = Array.from(document.getElementsByTagName('a'))
  list.forEach(a => {
    const href = a.getAttribute('href')
    if (typeof href === 'string' && /^\/post\?tags=(\S+)$/.test(href)) {
      const en = RegExp.$1
      const cn = tags[en]
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
      // This post belongs to a parent post.
      .replace(/This post belongs to a /, '这张图片从属于一个').replace(/parent post<\/a>\./, '相关父作品</a>。')
      // This post has child posts. (post #728160, 746235)
      // This post has a child post. (post #383703)
      .replace(/This post has /, '这张图片从属于一个')
      .replace(/child posts<\/a>\. \(post #/, '作品集</a>。相关子作品：')
      .replace(/a child post<\/a>\. \(post #/, '作品集</a>。相关子作品：')
      .replace(/<\/a>, <a /, '</a> | <a ').replace(/<\/a>\)/, '</a>')
  })
  // This post has <a href="/post?tags=parent%3A728162">child posts</a>. (post #<a href="/post/show/728160">728160</a>, <a href="/post/show/746235">746235</a>)
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
