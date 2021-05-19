export const initHotKey = function() {

  window.addEventListener("keyup", function(event) {
    // 有输入框被激活时，禁止触发方向键。
    if (/^(TEXTAREA|INPUT|SELECT|BUTTON)$/.test(document.activeElement.tagName)) return

    // 上一页 ← a A
    const prev = document.querySelector(".pagination>.previous_page")
    if (prev && (event.key == "ArrowLeft" || event.key == "a" || event.key == "A")) {
      prev.click()
      return event.preventDefault()
    }
    // 下一页 → d D
    const next = document.querySelector(".pagination>.next_page")
    if (next && (event.key == "ArrowRight" || event.key === "d" || event.key == "D")) {
      next.click()
      return event.preventDefault()
    }
    // 显示 s S
    const show = document.querySelector("#png") || document.querySelector("#highres")
    if (show && (event.key === "s" || event.key === "S")) {
      show.click()
      return event.preventDefault()
    }
    // 来源 w W
    const where = jQuery("li:contains('Source:') a")[0]
    if (where && (event.key === "w" || event.key === "W")) {
      where.click()
      return event.preventDefault()
    }
  })

  const sidebar = document.querySelector("#post-list > div.sidebar") || document.querySelector("#post-view > div.sidebar")
  if (sidebar) {
    sidebar.insertAdjacentHTML("beforeend", "<div>" +
      "<h5>快捷键说明</h5>" +
      "<div style='color: #ee8888'>上一页：A / ←</div>" +
      "<div style='color: #ee8888'>下一页：D / →</div>" +
      "<div style='color: #ee8888'>显示当前作品原图：S</div>" +
      "<div style='color: #ee8888'>显示当前作品来源：W</div>" +
    "</div>")
  }

}
