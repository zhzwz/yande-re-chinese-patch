import tags from './tags.json'

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
