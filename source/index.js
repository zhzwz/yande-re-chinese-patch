import tags from './data/tags.json'

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
