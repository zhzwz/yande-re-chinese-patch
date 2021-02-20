import tags from './tags.json'
import style from './style.css'

const styleElement = document.createElement('style')
styleElement.innerHTML = style
document.head.appendChild(styleElement)

/* 遍历所有的 <a> 元素 */
Array.from(document.getElementsByTagName('a')).forEach(a => {
  const href = a.getAttribute('href')
  /* 标签 */
  if (typeof href === 'string' && /^\/post\?tags=(\S+)$/.test(href)) {
    const en = RegExp.$1
    const cn = tags[en]
    if (cn) a.innerText = `[${cn}]${en.replace(/_/g, ' ')}`
  }
})

/* 导航栏主菜单 */
Array.from(document.querySelectorAll("#main-menu>ul>li>a")).forEach(nav => {
  if (nav.getAttribute("href") === "#") return
  const en = nav.innerText
  const cn = {
    "My Account": "账户",
    "Posts": "作品",
    "Comments": "评论",
    "Notes": "笔记",
    "Artists": "画师",
    "Tags": "标签",
    "Forum": "论坛",
    "Help": "帮助",
    "More »": "更多>>",
    "New Mail": "新消息",
  }[en]
  if (typeof cn === 'string') nav.innerText = cn
})

/**
 * 提示信息
 * EN: This image has been resized. Click on the `View larger version` link in the sidebar
 *     for a high-quality version. Hide this message
 * CN: 这张图片已经被压缩，单击侧边栏中的 `显示大图` 可以获取更高质量的版本。不再提醒
 */
if (document.querySelector("#resized_notice")) {
  document.querySelector("#resized_notice").innerHTML = document.querySelector("#resized_notice").innerHTML
  .replace(/^[\s]+This image has been resized. Click on the /, "这张图片已经被压缩，单击侧边栏中的")
  .replace(/View larger version/, "显示大图")
  .replace(/ link in the sidebar for a high-quality version./, "可以获取更高质量的版本。")
  .replace(/Hide this message<\/a>./, "不再提醒</a>")
}

/* 导航栏子菜单 */
Array.from(document.querySelectorAll("ul.submenu>li>a")).forEach(menu => {
  const en = menu.innerText
  const cn = {
    "My Profile": "我的资料",
    "My Mail": "我的消息",
    "My Favorites": "我的收藏",
    "Settings": "设置",
    "Change Password": "修改密码",
    "Logout": "退出登录",
    "View Posts": "浏览作品",
    "Search Posts": "搜索作品",
    "Upload": "上传",
    "Random": "随机浏览",
    "Popular": "热门",
    "Image Search": "搜索图片",
    "History": "历史",
    "View Comments": "浏览评论",
    "Search Comments": "搜索评论",
    "View Notes": "浏览笔记",
    "Search Notes": "搜索笔记",
    "View Artists": "浏览画师",
    "Search Artists": "搜索画师",
    "Create": "创建",
    "View Tags": "浏览标签",
    "Search Tags": "搜索标签",
    "Aliases": "别名",
    "Implications": "含义",
    "View Pools": "浏览 Pools",
    "Search Pools": "搜索 Pools",
    "Create New Pool": "创建 Pool",
    "View Wiki Index": "浏览 Wiki 主页",
    "Search Wiki": "搜索 Wiki",
    "Create New Page": "创建新页面",
    "Mark All Read": "全部标记已读",
  }[en]
  if (typeof cn === 'string') menu.innerText = cn
})
/* 部分操作按钮 */
;(function() {
  const translate = function(element, en, cn) {
    if (element) element.innerText = element.innerText.replace(en, cn)
  }
  const list = [
    [document.getElementById('highres-show'), 'View larger version', '显示高清图'],
    [document.getElementById('highres'), 'Download larger version', '下载高清图'],
    [document.getElementById('png'), 'Download PNG', '下载 PNG 图'],
    [document.querySelector('li#add-to-favs>a'), 'Add to favorites', '添加收藏'],
    [document.querySelector('li#set-avatar>a'), 'Set avatar', '设置头像'],
    [document.querySelector('h4>a.js-posts-show-edit-tab'), 'Edit', '编辑'],
    [document.querySelector('h4>a.js-posts-show-comments-tab'), 'Respond', '评论'],
  ]
  list.forEach(item => translate(...item))
})()
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
