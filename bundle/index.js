// ==UserScript==
// @name         Yande.re 简体中文
// @namespace    com.coderzhaoziwei.yandere
// @version      2.1.43
// @author       Coder Zhao coderzhaoziwei@outlook.com
// @description  中文标签 | 界面优化 | 高清大图 | 键盘翻页 | 流体布局
// @homepage     https://greasyfork.org/scripts/421970
// @license      MIT
// @match        https://yande.re/*
// @exclude      https://yande.re/forum/*
// @match        https://konachan.com/*
// @exclude      https://konachan.com/forum/*
// @match        https://konachan.net/*
// @exclude      https://konachan.net/forum/*
// @supportURL   https://github.com/coderzhaoziwei/yande-re-chinese-patch/issues
// @grant        GM_download
// ==/UserScript==

/* eslint-env es2022 */
/* global jQuery:readonly */
/* global Vue:readonly */
/* global Vuetify:readonly */
/* global VueMasonry:readonly */

(function () {
  'use strict';

  const initStyle = function() {
    document.head.insertAdjacentHTML("beforeend", `<style>[{ path: "source/style/fix.css" }]</style>`);
  };

  const initHotKey = function() {
    window.addEventListener("keyup", function(event) {
      console.log('keyup:', event.key);
      if (/^(TEXTAREA|INPUT|SELECT|BUTTON)$/.test(document.activeElement.tagName)) return
      const prev = document.querySelector(".pagination>.previous_page") || jQuery("li:contains('Previous') a[href]")[0];
      if (prev && (event.key == "ArrowLeft" || event.key == "a" || event.key == "A")) {
        prev.click();
        return event.preventDefault()
      }
      const next = document.querySelector(".pagination>.next_page") || jQuery("li:contains('Next') a[href]")[0];
      if (next && (event.key == "ArrowRight" || event.key === "d" || event.key == "D")) {
        next.click();
        return event.preventDefault()
      }
      const show = document.querySelector("#png") || document.querySelector("#highres");
      if (show && (event.key === "s" || event.key === "S")) {
        show.click();
        return event.preventDefault()
      }
      const where = jQuery("li:contains('Source:') a")[0];
      if (where && (event.key === "w" || event.key === "W")) {
        where.click();
        return event.preventDefault()
      }
    });
    const sidebar = document.querySelector("#post-list > div.sidebar") || document.querySelector("#post-view > div.sidebar");
    if (sidebar) {
      sidebar.insertAdjacentHTML("beforeend", "<div>" +
        "<h5>快捷键说明</h5>" +
        "<div style='color: #ee8888'>上一页：A / ←</div>" +
        "<div style='color: #ee8888'>下一页：D / →</div>" +
        "<div style='color: #ee8888'>显示当前作品原图：S</div>" +
        "<div style='color: #ee8888'>显示当前作品来源：W</div>" +
      "</div>");
    }
  };

  class Post {
    constructor(data) {
      if (typeof data !== "object") data = {};
      this.id = data.id || 0;
      this.score = data.score || 0;
      this.tags = data.tags || "";
      this.source = data.source || "";
      this.author = data.author || "";
      this.creatorId = data.creator_id || 0;
      this.createdAt = data.created_at || 0;
      this.updatedAt = data.updated_at || 0;
      this.rating = data.rating || "s";
      this.fileUrl = data.file_url || "";
      this.fileExt = data.file_ext || "";
      this.fileSize = data.file_size || 0;
      this.width = data.width || 0;
      this.height = data.height || 0;
      this.jpegUrl = data.jpeg_url || "";
      this.jpegSize = data.jpeg_file_size || 0;
      this.jpegWidth = data.jpeg_width || 0;
      this.jpegHeight = data.jpeg_height || 0;
      this.sampleUrl = data.sample_url;
      this.sampleSize = data.sample_file_size || 0;
      this.sampleWidth = data.sample_width || 0;
      this.sampleHeight = data.sample_height || 0;
      this.previewUrl = data.preview_url;
      this.previewWidth = data.actual_preview_width || 0;
      this.previewHeight = data.actual_preview_height || 0;
      this.favorite = false;
    }
    get isRatingS() {
      return this.rating === "s"
    }
    get isRatingQ() {
      return this.rating === "q"
    }
    get isRatingE() {
      return this.rating === "e"
    }
    get aspectRatio() {
      return this.width / this.height
    }
    getSizeText(size) {
      if (size > 1024 * 1024) {
        return (size / (1024 * 1024)).toFixed(2) + "MB"
      }
      if (size > 1024) {
        return (size / 1024).toFixed(2) + "KB"
      }
      return (size).toFixed(2) + "B"
    }
    get sampleSizeText() {
      return this.getSizeText(this.sampleSize)
    }
    get sampleDownloadText() {
      return `下载缩略图 ${this.sampleWidth}×${this.sampleHeight} [${this.sampleSizeText}]`
    }
    get sampleDownloadName() {
      return `${location.hostname}.${this.id}.${this.sampleWidth}x${this.sampleHeight}`.replace(/\./g, "_")
    }
    get jpegSizeText() {
      return this.getSizeText(this.jpegSize)
    }
    get jpegDownloadText() {
      return `下载高清图 ${this.jpegWidth}×${this.jpegHeight} [${this.jpegSizeText}]`
    }
    get jpegDownloadName() {
      return `${location.hostname}.${this.id}.${this.jpegWidth}x${this.jpegHeight}`.replace(/\./g, "_")
    }
    get fileSizeText() {
      return this.getSizeText(this.fileSize)
    }
    get fileDownloadText() {
      return `下载原文件 ${this.width}×${this.height} [${this.fileSizeText}] ${this.fileExt.toUpperCase()}`
    }
    get fileDownloadName() {
      return `${location.hostname}.${this.id}.${this.width}x${this.height}`.replace(/\./g, "_")
    }
    get createdTime() {
      const date = new Date(this.createdAt * 1000);
      return `${date.toLocaleDateString()} ${date.toLocaleTimeString("en-DE")}`
    }
    get updatedTime() {
      const date = new Date(this.updatedAt * 1000);
      return `${date.toLocaleDateString()} ${date.toLocaleTimeString("en-DE")}`
    }
    get sourceUrl() {
      if (/^https:\/\/i\.pximg\.net\/img-original\/img\/[\d\/]{19}\/([\d]{1,})_p[\d]{1,}\.(jpg|png)$/.test(this.source)) {
        const pid = RegExp.$1;
        return `https://pixiv.net/artworks/${pid}`
      }
      return this.source
    }
  }

  const App = {
    template: "#app-template",
    data() {
      return {
        showDrawer: false,
        showImageSelected: false,
        showImageInfo: true,
        showRatingQ: JSON.parse(localStorage.getItem("showRatingQ") || "true"),
        showRatingE: JSON.parse(localStorage.getItem("showRatingE") || "false"),
        imageList: [],
        imageSelectedIndex: 0,
        params: new URLSearchParams(location.search),
        requestState: false,
        requestStop: false,
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight,
        imageCountInRow: JSON.parse(localStorage.getItem("imageCountInRow") || "3"),
        imageQualityHigh: JSON.parse(localStorage.getItem("imageQualityHigh") || "false"),
        showFavoriteSuccess: false,
      }
    },
    computed: {
      isMobile() {
        try {
          return this.$vuetify.breakpoint.mobile
        } catch(error) {
          return false
        }
      },
      title() {
        return `${this.imageList.length} Posts`
      },
      version() {
        return GM_info.script.version
      },
      imageSelected() {
        return this.imageList[this.imageSelectedIndex] || new Post()
      },
      imageSelectedWidth() {
        const width = parseInt(Math.min(this.innerWidth * 0.9, this.imageSelected.sampleWidth));
        const height = Math.min(this.innerHeight * 0.9, this.imageSelected.sampleHeight);
        const width2 = parseInt(height * this.imageSelected.aspectRatio);
        return Math.min(width, width2)
      },
      imageSelectedHeight() {
        const width = Math.min(this.innerWidth * 0.9, this.imageSelected.sampleWidth);
        const height = parseInt(Math.min(this.innerHeight * 0.9, this.imageSelected.sampleHeight));
        const height2 = parseInt(width / this.imageSelected.aspectRatio);
        return Math.min(height, height2)
      },
    },
    watch: {
      showRatingQ(value) {
        localStorage.setItem("showRatingQ", JSON.stringify(value));
      },
      showRatingE(value) {
        localStorage.setItem("showRatingE", JSON.stringify(value));
      },
      imageCountInRow(value) {
        localStorage.setItem("imageCountInRow", JSON.stringify(value));
      },
      imageQualityHigh(value) {
        localStorage.setItem("imageQualityHigh", JSON.stringify(value));
      },
      showFavoriteSuccess(value) {
        console.log('showFavoriteSuccess: ', value);
      },
    },
    methods: {
      async request() {
        this.requestState = true;
        const url = location.origin + location.pathname + ".json?" + this.params.toString();
        const response = await new Promise(resolve => {
          console.log(url);
          jQuery.get(url, data => resolve(data));
        });
        if (response instanceof Array && response.length > 0) {
          window.history.pushState("", "", location.pathname + "?" + this.params.toString());
          response.forEach(item => this.imageList.push(new Post(item)));
          const page = Number(this.params.get("page")) || 1;
          this.params.set("page", page + 1);
          setTimeout(() => (this.requestState = false), 1000);
        } else {
          this.requestStop = true;
        }
      },
      download(src, filename) {
        const match = src.match(/[.](?<extension>png|jpg|jpeg)$/);
        if (match) {
          const extension = match.groups.extension;
          GM_download(src, filename + "." + extension);
        } else {
          GM_download(src, filename);
        }
      },
      onFavorite(id) {
        $.ajax({
          method: 'POST',
          url: "https://yande.re/post/vote.json",
          beforeSend: xhr => xhr.setRequestHeader('x-csrf-token', window.csrfToken),
          data: { id, score: 3 },
          success: data => {
            if (data.success === true) {
              this.imageList[this.imageSelectedIndex].favorite = true;
            }
          },
        });
      },
    },
    mounted() {
      const timeInterval = setInterval(() => {
        if (this.requestStop === true) {
          clearInterval(timeInterval);
          return
        }
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight;
        const height = window.innerHeight;
        if (scrollTop + height >= scrollHeight * 0.75) {
          if (this.requestState === false) {
            this.request();
          }
        }
      }, 1000);
      window.addEventListener("resize", () => {
        this.innerWidth = window.innerWidth;
        this.innerHeight = window.innerHeight;
      });
    },
  };

  async function enterBrowseMode() {
    function getScript(url) {
      return new Promise(resolve => jQuery.getScript(url, () => resolve()))
    }
    await getScript("https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.min.js");
    await getScript("https://cdn.jsdelivr.net/npm/vuetify@2.5.0/dist/vuetify.min.js");
    await getScript("https://cdn.jsdelivr.net/npm/vue-masonry-css@1.0.3/dist/vue-masonry.min.js");
    await getScript("https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js");
    window.csrfToken = jQuery('[name="csrf-token"]').attr('content');
    document.head.innerHTML = `[{ path: "source/html/head.html" }]`;
    document.body.innerHTML = `[{ path: "source/html/body.html" }]`;
    Vue.use(VueMasonry);
    new Vue({
      vuetify: new Vuetify({
        theme: { dark: true },
      }),
      render: h => h(App)
    }).$mount("#app");
  }

  const onChangeLeftBar = function() {
    const value = Boolean(document.getElementById("showLeftBar").selectedIndex);
    localStorage.setItem("showLeftBar", JSON.stringify(value));
    const element = document.querySelector("#post-list > .sidebar");
    element.setAttribute("show-left-bar", value);
    console.log("showLeftBar", value);
  };
  const onChangeRatingE = function() {
    const value = Boolean(document.getElementById("showRatingE").selectedIndex);
    localStorage.setItem("showRatingE", JSON.stringify(value));
    const elementList = document.querySelectorAll(".javascript-hide");
    elementList.forEach(element => element.setAttribute("show-rating-e", value));
    console.log("showRatingE", value);
  };
  const onChangeImageHD = function() {
    const index = document.getElementById("showImageHD").selectedIndex;
    const elementList = document.querySelectorAll("#post-list-posts > li > .inner");
    elementList.forEach(element => element.setAttribute("show-image-hd", index));
    localStorage.setItem("showImageHD", JSON.stringify(index));
    console.log("showImageHD", index);
  };
  let taskArray = [];
  let maxLoadingSampleNum = 4;
  let doLoadSampleUrl = () => {
    let loadingNum = 0;
    let loadSampleUrl = () => {
      if (taskArray.length == 0) return
      loadingNum++;
      let { element, sampleUrl } = taskArray.shift();
      element.onerror = () => {
        element.src = sampleUrl;
      };
      element.onload = () => {
        loadingNum--;
      };
      element.src = sampleUrl;
    };
    setInterval(() => {
      if (taskArray.length == 0) return
      let needloadNum = maxLoadingSampleNum - loadingNum;
      while (needloadNum--) {
        loadSampleUrl();
      }
    }, 1000);
  };
  const initOptions = function() {
    if (/^\/user\/show\/[\d]{1,}/.test(location.pathname)) return
    if (document.getElementById("post-list-posts") === null) return
    document.getElementById("post-list-posts").insertAdjacentHTML("beforebegin", `[{ path: "source/html/options.html" }]`);
    const imageList = document.querySelectorAll("img.preview");
    const samples = JSON.parse(localStorage.getItem("sample_urls"));
    imageList.forEach(element => {
      if (/\/post\/show\/([\d]{1,})/.test(element.nextElementSibling.innerText)) {
        const id = RegExp.$1;
        const sampleUrl = samples[id];
        if (sampleUrl !== undefined) {
          element.src = sampleUrl;
        }
      }
    });
    doLoadSampleUrl();
    document.getElementById("showLeftBar").addEventListener("change", onChangeLeftBar);
    document.getElementById("showRatingE").addEventListener("change", onChangeRatingE);
    document.getElementById("showImageHD").addEventListener("change", onChangeImageHD);
    const showLeftBar = JSON.parse(localStorage.getItem("showLeftBar") || "true");
    const showRatingE = JSON.parse(localStorage.getItem("showRatingE") || "true");
    const showImageHD = JSON.parse(localStorage.getItem("showImageHD") || "0");
    document.getElementById("showLeftBar").selectedIndex = showLeftBar;
    document.getElementById("showRatingE").selectedIndex = showRatingE;
    document.getElementById("showImageHD").selectedIndex = showImageHD;
    onChangeLeftBar();
    onChangeRatingE();
    onChangeImageHD();
    document.getElementById("enterBrowseMode").addEventListener("click", enterBrowseMode);
  };

  const tags = [{ path: "source/data/tags.json" }];
  const menus = [{ path: "source/data/menus.json" }];
  const footers = [{ path: "source/data/footers.json" }];
  const translateTags = function() {
    const elementList = Array.from(document.getElementsByTagName("a"));
    elementList.forEach(element => {
      const href = element.getAttribute("href");
      if (typeof href === "string" && /^\/post\?tags=(\S+)$/.test(href)) {
        const en = RegExp.$1;
        const cn = tags[en];
        if (cn) {
          element.innerText = `[${cn}]${en.replace(/_/g, " ")}`;
        }
      }
    });
  };
  const translateMenus = function() {
    const mainMenuList = Array.from(document.querySelectorAll("#main-menu>ul>li>a"));
    const subMenuList = Array.from(document.querySelectorAll("ul.submenu>li>a"));
    const elementList = [...mainMenuList, ...subMenuList];
    elementList.forEach(element => {
      if (element.getAttribute("href") === "#") return
      const en = element.innerText;
      const cn = menus[en];
      if (cn) {
        element.innerText = cn;
      }
    });
  };
  const translateNotice = function() {
    const elementList = Array.from(document.querySelectorAll(".status-notice"));
    elementList.forEach(element => {
      console.log(element.innerHTML);
      element.innerHTML = element.innerHTML
        .replace(/^[\s]+This image has been resized. Click on the /, "这张图片已经被压缩，单击侧边栏中的")
        .replace(/View larger version/, "显示高清图")
        .replace(/ link in the sidebar for a high-quality version./, "可以获取更高质量的版本。")
        .replace(/Hide this message<\/a>\./, "不再提醒</a>")
        .replace(/This post belongs to a /, "这张图片从属于一个")
        .replace(/parent post<\/a>\./, "相关父作品</a>。")
        .replace(/This post has /, "这张图片从属于一个")
        .replace(/child posts<\/a>\. \(post #/, "作品集</a>。相关子作品：")
        .replace(/a child post<\/a>\. \(post #/, "作品集</a>。相关子作品：")
        .replace(/<\/a>, <a /, "</a> | <a ")
        .replace(/<\/a>\)/, "</a>");
    });
  };
  const translateButtons = function() {
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
      const [selector, en, cn] = data;
      const element = document.querySelector(selector);
      if (element) {
        element.innerText = element.innerText.replace(en, cn);
      }
    });
  };
  const translateFooters = function() {
    const elementList = Array.from(document.querySelectorAll('#subnavbar>li>a'));
    elementList.forEach(element => {
      const en = element.innerText;
      const cn = footers[en];
      if (cn) {
        element.innerText = cn;
      }
    });
  };
  const initTranslate = function() {
    translateTags();
    translateMenus();
    translateNotice();
    translateButtons();
    translateFooters();
  };

  jQuery(document).ready(function() {
    initStyle();
    initHotKey();
    initOptions();
    initTranslate();
    if (document.cookie.includes('locale=zh_CN') === false) {
      document.cookie = "locale=zh_CN";
      location.href = location.href;
    }
  });

}());
