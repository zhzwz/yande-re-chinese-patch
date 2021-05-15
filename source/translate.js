const tags = [{ path: "source/data/tags.json" }]
const menus = [{ path: "source/data/menus.json" }]
const footers = [{ path: "source/data/footers.json" }]

// 翻译标签
export const translateTags = function() {
  const elementList = Array.from(document.getElementsByTagName("a"))
  elementList.forEach(element => {
    const href = element.getAttribute("href")
    if (typeof href === "string" && /^\/post\?tags=(\S+)$/.test(href)) {
      const en = RegExp.$1
      const cn = tags[en]
      if (cn) {
        element.innerText = `[${cn}]${en.replace(/_/g, " ")}`
      }
    }
  })
}

// 翻译菜单
export const translateMenus = function() {
  const mainMenuList = Array.from(document.querySelectorAll("#main-menu>ul>li>a"))
  const subMenuList = Array.from(document.querySelectorAll("ul.submenu>li>a"))
  const elementList = [...mainMenuList, ...subMenuList]
  elementList.forEach(element => {
    if (element.getAttribute("href") === "#") return
    const en = element.innerText
    const cn = menus[en]
    if (cn) {
      element.innerText = cn
    }
  })
}

// 翻译提示
export const translateNotice = function() {
  // EN: This image has been resized. Click on the `View larger version` link in the sidebar
  //     for a high-quality version. Hide this message
  // CN: 这张图片已经被压缩，单击侧边栏中的 `显示高清图` 可以获取更高质量的版本。不再提醒
  // EN: This post belongs to a parent post.
  // EN: This post has child posts. (post #728160, 746235)
  // EN: This post has a child post. (post #383703)
  const elementList = Array.from(document.querySelectorAll(".status-notice"))
  elementList.forEach(element => {
    console.log(element.innerHTML)
    element.innerHTML = element.innerHTML
      .replace(/^[\s]+This image has been resized. Click on the /, "这张图片已经被压缩，单击侧边栏中的")
      .replace(/View larger version/, "显示高清图")
      .replace(/ link in the sidebar for a high-quality version./, "可以获取更高质量的版本。")
      .replace(/Hide this message<\/a>\./, "不再提醒</a>")
      /* 相关父作品 */
      .replace(/This post belongs to a /, "这张图片从属于一个")
      .replace(/parent post<\/a>\./, "相关父作品</a>。")
      /* 相关子作品 */
      .replace(/This post has /, "这张图片从属于一个")
      .replace(/child posts<\/a>\. \(post #/, "作品集</a>。相关子作品：")
      .replace(/a child post<\/a>\. \(post #/, "作品集</a>。相关子作品：")
      .replace(/<\/a>, <a /, "</a> | <a ")
      .replace(/<\/a>\)/, "</a>")
  })
}

// 翻译点击
export const translateButtons = function() {
  [
    ['#highres-show', 'View larger version', '显示高清图'],
    ['#highres', 'Download larger version', '下载高清图'],
    ['#png', 'Download PNG', '下载 PNG 图'],
    ['li#add-to-favs>a', 'Add to favorites', '添加收藏'],
    ['li#set-avatar>a', 'Set avatar', '设置头像'],
    ['h4>a.js-posts-show-edit-tab', 'Edit', '编辑'],
    ['h4>a.js-posts-show-comments-tab', 'Respond', '评论'],
    ['.pagination>.previous_page', '← Previous', '上一页'],
    ['.pagination>.next_page', 'Next →', '下一页'],
  ].forEach(data => {
    const [selector, en, cn] = data
    const element = document.querySelector(selector)
    if (element) {
      element.innerText = element.innerText.replace(en, cn)
    }
  })
}

// 翻译页脚
export const translateFooters = function() {
  const elementList = Array.from(document.querySelectorAll('#subnavbar>li>a'))
  elementList.forEach(element => {
    const en = element.innerText
    const cn = footers[en]
    if (cn) {
      element.innerText = cn
    }
  })
}

// 合并
export const initTranslate = function() {
  translateTags()
  translateMenus()
  translateNotice()
  translateButtons()
  translateFooters()
}
