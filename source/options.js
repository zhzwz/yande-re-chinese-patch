import { enterBrowseMode } from "./browse"

export const onChangeLeftBar = function() {
  const value = Boolean(document.getElementById("showLeftBar").selectedIndex)
  localStorage.setItem("showLeftBar", JSON.stringify(value))
  const element = document.querySelector("#post-list > .sidebar")
  element.setAttribute("show-left-bar", value)

  console.log("showLeftBar", value)
}
export const onChangeRatingE = function() {
  const value = Boolean(document.getElementById("showRatingE").selectedIndex)
  localStorage.setItem("showRatingE", JSON.stringify(value))
  const elementList = document.querySelectorAll(".javascript-hide")
  elementList.forEach(element => element.setAttribute("show-rating-e", value))

  console.log("showRatingE", value)
}
export const onChangeImageHD = function() {
  // 获取 index 值
  const index = document.getElementById("showImageHD").selectedIndex
  // 修改属性 show-image-hd
  const elementList = document.querySelectorAll("#post-list-posts > li > .inner")
  elementList.forEach(element => element.setAttribute("show-image-hd", index))
  // 缓存 index 值
  localStorage.setItem("showImageHD", JSON.stringify(index))
  console.log("showImageHD", index)
  // 设置网格布局宽
  // document.querySelector("#post-list-posts").style.gridTemplateColumns = `repeat(auto-fill, ${(index + 1) * 150}px)`
}

export const initOptions = function() {
  // https://yande.re/user/show/507475
  if (/^\/user\/show\/[\d]{1,}/.test(location.pathname)) return
  if (document.getElementById("post-list-posts") === null) return
  // 插入文档元素
  document.getElementById("post-list-posts").insertAdjacentHTML("beforebegin", `[{ path: "source/html/options.html" }]`)
  // 替换图片元素
  const imageList = document.querySelectorAll("img.preview")
  const samples = JSON.parse(localStorage.getItem("sample_urls"))
  imageList.forEach(element => {
    if (/\/post\/show\/([\d]{1,})/.test(element.nextElementSibling.innerText)) {
      const id = RegExp.$1
      const sampleUrl = samples[id]
      if (sampleUrl !== undefined) {
        element.src = sampleUrl
      }
    }
  })

  // 监听
  document.getElementById("showLeftBar").addEventListener("change", onChangeLeftBar)
  document.getElementById("showRatingE").addEventListener("change", onChangeRatingE)
  document.getElementById("showImageHD").addEventListener("change", onChangeImageHD)

  // 获取本地记录
  const showLeftBar = JSON.parse(localStorage.getItem("showLeftBar") || "true")
  const showRatingE = JSON.parse(localStorage.getItem("showRatingE") || "true")
  const showImageHD = JSON.parse(localStorage.getItem("showImageHD") || "0")
  document.getElementById("showLeftBar").selectedIndex = showLeftBar
  document.getElementById("showRatingE").selectedIndex = showRatingE
  document.getElementById("showImageHD").selectedIndex = showImageHD
  onChangeLeftBar()
  onChangeRatingE()
  onChangeImageHD()

  // 浏览模式
  document.getElementById("enterBrowseMode").addEventListener("click", enterBrowseMode)
}
