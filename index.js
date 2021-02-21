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
 */
;(function() {
  const element = document.querySelector('#resized_notice')
  if (element) {
    element.innerHTML = element.innerHTML
      .replace(/^[\s]+This image has been resized. Click on the /, '这张图片已经被压缩，单击侧边栏中的')
      .replace(/View larger version/, '显示高清图')
      .replace(/ link in the sidebar for a high-quality version./, '可以获取更高质量的版本。')
      .replace(/Hide this message<\/a>./, '不再提醒</a>')
  }
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
