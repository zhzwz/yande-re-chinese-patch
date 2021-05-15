import { enterBrowseMode } from "./browse"

const onChangeLeftBar = function() {
  const value = Boolean(document.getElementById("showLeftBar").selectedIndex)
  localStorage.setItem("showLeftBar", JSON.stringify(value))
  const element = document.querySelector("#post-list > .sidebar")
  element.setAttribute("show-left-bar", value)

  console.log("showLeftBar", value)
}
const onChangeRatingE = function() {
  const value = Boolean(document.getElementById("showRatingE").selectedIndex)
  localStorage.setItem("showRatingE", JSON.stringify(value))
  const elementList = document.querySelectorAll(".javascript-hide")
  elementList.forEach(element => element.setAttribute("show-rating-e", value))

  console.log("showRatingE", value)
}
const onChangeImageHD = function() {
  const index = document.getElementById("showImageHD").selectedIndex
  const samples = JSON.parse(localStorage.getItem("sample_urls"))
  localStorage.setItem("showImageHD", JSON.stringify(index))

  const imageList = document.querySelectorAll("img.preview")
  imageList.forEach(element => {
    if (element.getAttribute("preview-url") === null) {
      // 保存小图链接
      element.setAttribute("preview-url", element.src)
    }
    const id = element.parentNode.href.split("/").pop()
    element.src = (index > 0) ? samples[id] : element.getAttribute("preview-url")
    element.parentNode.parentNode.setAttribute("show-image-hd", index)
  })
  console.log("showImageHD", index)
}

export const initOptions = function() {
  // https://yande.re/user/show/507475
  if (/^\/user\/show\/[\d]{1,}/.test(location.pathname)) return
  if (document.getElementById("post-list-posts") === null) return
  // 插入文档元素
  document.getElementById("post-list-posts").insertAdjacentHTML("beforebegin", `[{ path: "source/html/options.html" }]`)

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
