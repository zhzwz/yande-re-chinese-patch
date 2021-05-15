
export const initHotKey = function() {

  window.addEventListener("keyup", function(event) {
    // 有输入框被激活时，禁止触发方向键。
    if (/^(TEXTAREA|INPUT|SELECT|BUTTON)$/.test(document.activeElement.tagName)) return
    // 左 上一页
    const prev = document.querySelector(".pagination>.previous_page")
    if (event.key == "ArrowLeft" && prev) {
      prev.click()
      return event.preventDefault()
    }
    // 右 下一页
    const next = document.querySelector(".pagination>.next_page")
    if (event.key == "ArrowRight" && next) {
      next.click()
      return event.preventDefault()
    }
  })

}



