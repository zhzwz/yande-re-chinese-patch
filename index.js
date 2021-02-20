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
