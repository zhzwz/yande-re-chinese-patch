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
    // div.setAttribute('style', 'user-select: none; text-align: left;')
    div.setAttribute('id', 'script-addition')
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

/**
 * 默认尺寸 h=150px
 * 大图模式 h=300px
 * 高清模式 显示高清大图 parent
 */
;(function() {
  const target = document.getElementById(`script-addition`)

  if (target) {
    // const SET_POST_HD = `set-post-hd`
    // const isHD = Boolean(JSON.parse(localStorage.getItem(SET_POST_HD)))

    const SET_POST_SIZE = `set-post-size`
    if (getHDValue() === false) {
      target.insertAdjacentHTML(`beforeend`, `<input type="checkbox" id="${SET_POST_SIZE}1">`)
      target.insertAdjacentHTML(`beforeend`, `<label for="${SET_POST_SIZE}1">默认尺寸</label>`)
      target.insertAdjacentHTML(`beforeend`, `<input type="checkbox" id="${SET_POST_SIZE}2">`)
      target.insertAdjacentHTML(`beforeend`, `<label for="${SET_POST_SIZE}2">大图模式</label>`)
    }
    target.insertAdjacentHTML(`beforeend`, `<input type="checkbox" id="${SET_POST_SIZE}3">`)
    target.insertAdjacentHTML(`beforeend`, `<label for="${SET_POST_SIZE}2">高清模式</label>`)

    const checkbox1 = document.getElementById(`${SET_POST_SIZE}1`)
    const checkbox2 = document.getElementById(`${SET_POST_SIZE}2`)
    const checkbox3 = document.getElementById(`${SET_POST_SIZE}3`)
    update()

    checkbox1 && checkbox1.addEventListener(`change`, changeValue)
    checkbox2 && checkbox2.addEventListener(`change`, changeValue)
    checkbox3.addEventListener(`change`, changeHDValue)

    function getValue() {
      return Boolean(JSON.parse(localStorage.getItem(SET_POST_SIZE)))
    }
    function changeValue() {
      const value = getValue()
      localStorage.setItem(SET_POST_SIZE, JSON.stringify(!value))
      location.reload() // 刷新页面
    }
    function getHDValue() {
      return Boolean(JSON.parse(localStorage.getItem(`set-post-hd`)))
    }
    function changeHDValue() {
      const value = getHDValue()
      localStorage.setItem(`set-post-hd`, JSON.stringify(!value))
      location.reload() // 刷新页面
    }
    function update() {
      if (getHDValue() === true) {
        checkbox3.checked = true
        target.insertAdjacentHTML(`beforeend`, `<div id="script-notice-hd">高清模式加载缓慢，可能需要等待一段时间。</div>`)
        // setTimeout(() => document.getElementById(`script-notice-hd`).remove(), 10000)
        const imageList = document.querySelectorAll(`img.preview`)
        imageList.forEach(x => x.src = x.parentNode.parentNode.nextElementSibling.href)
        document.head.insertAdjacentHTML(`beforeend`, `<style>#post-list-posts>li>.inner{zoom:2.5;}</style>`)
      } else if (getValue() === false) {
        checkbox1.checked = true
        checkbox2.checked = false
        checkbox3.checked = false
      } else {
        checkbox1.checked = false
        checkbox2.checked = true
        checkbox3.checked = false
        document.head.insertAdjacentHTML(`beforeend`, `<style>img.preview{width:auto;height:auto;}</style>`)
        document.head.insertAdjacentHTML(`beforeend`, `<style>#post-list-posts>li>.inner{height:auto !important;}</style>`)
      }
    }
  }
})()
