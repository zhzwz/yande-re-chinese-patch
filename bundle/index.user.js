// ==UserScript==
// @name         Yande.re 简体中文
// @namespace    com.coderzhaoziwei.yandere
// @version      2.1.47
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
    document.head.insertAdjacentHTML("beforeend", `<style>
body {
  font-size: 12px;
  padding: 0 0.5rem;
}
body::-webkit-scrollbar {
  display: none;
  width: 0px !important;
}
/* 标题居中 */
div#header {
  margin: 0;
}
div#header > div#title {
  display: flex;
  place-content: center;
  margin: 0 !important;
  height: fit-content;
}
div#header > div#title > h2#site-title {
  display: flex !important;
  flex-direction: column;
}
div#header > div#title > h2#site-title > span {
  font-size: 12px;
  font-weight: normal;
  text-align: right;
}
div#header > div#main-menu {
  padding: 0 !important;
  margin: 0 !important;
  display: flex !important;
  justify-content: center;
  font-size: 14px;
  line-height: 2rem;
  height: 2rem;
}
div#header > div#main-menu > ul {
  margin: 0;
}
/* 通知 */
.status-notice {
  text-align: center;
}
/* 标签前缀 */
li.tag-type-artist a[href^="/post"]:not(.no-browser-link)::before {
  content: "[画师]";
}
li.tag-type-copyright a[href^="/post"]:not(.no-browser-link)::before {
  content: "[原作]";
}
li.tag-type-character a[href^="/post"]:not(.no-browser-link)::before {
  content: "[角色]";
}
li.tag-type-circle a[href^="/post"]:not(.no-browser-link)::before {
  content: "[公司]";
}
/* 图区 */
#post-list {
  display: flex;
  flex-direction: row;
}
#post-list > .sidebar {
  width: auto;
  max-width: 200px;
  flex: 0 0 auto;
}
#post-list > .content {
  width: auto;
  flex: 1 1 auto;
}
#post-list > div.lsidebar {
  display: none;
}
ul#post-list-posts {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  place-content: center;
  place-items: center;
}
ul#post-list-posts > li {
  width: fit-content !important;
  height: 100%;
  margin: 0 !important;
  border: none;
}
ul#post-list-posts > li > div.inner {
  width: auto !important;
  height: fit-content !important;
}
ul#post-list-posts > li > a.directlink {
  font-size: 12px;
  height: 12px;
  line-height: 12px;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background: rgb(16, 16, 16);
}
ul#post-list-posts > li > a.directlink > span.directlink-res {
  display: inline;
}
ul#post-list-posts > li > a.directlink > span.directlink-info {
  display: none;
}
ul#post-list-posts > li > div.inner > a.thumb {
  height: auto;
}
ul#post-list-posts > li > div.inner > a.thumb > img.preview {
  margin: 0 !important; /* @konachan */
  border: none;
}
/* 分页器 */
div#paginator {
  padding: 0;
}
div#paginator > div.pagination {
  line-height: 2rem;
}
/* 页脚 */
#content > div:nth-child(2) > div.sidebar {
  display: none;
}
#content div.footer {
  font-size: 14px;
  margin: 1rem;
}

/* show-left-bar */
.sidebar[show-left-bar=false] {
  display: none !important;
}
/* show-rating-e */
.javascript-hide[show-rating-e=true] {
  display: block !important;
  position: relative;
}
.javascript-hide[show-rating-e=true]::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  box-shadow: 0px 0px 12px rgb(255, 0, 0) inset;
  pointer-events: none;
}
/* show-image-hd */
#post-list-posts > li > .inner[show-image-hd="1"] {
  zoom: 2;
}
#post-list-posts > li > .inner[show-image-hd="2"] {
  zoom: 3;
}
#post-list-posts > li > .inner[show-image-hd="3"] {
  zoom: 4;
}
</style>`);
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
        imageSelectedDetail: {},
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
      showImageSelected(value) {
        if (!value) {
          this.imageSelectedDetail = {};
          return
        }
        this.getPostDetail(this.imageSelected.id).then(res => {
          if (!res) return
          this.imageSelectedDetail = res;
        });
      }
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
              this.imageSelectedDetail.favorite = true;
            }
          },
        });
      },
      async getPostDetail(id) {
        try {
          if (!id) return
          const response = await fetch(`/post.json?api_version=2&tags=id:${id}&include_tags=1&include_votes=1`);
          const result = await response.json();
          return {
            favorite: result.votes[id] == 3,
            artist: Object.keys(result.tags).find(k => result.tags[k] == 'artist')
          }
        } catch (error) {
          console.log('getPostDetail error:', error);
        }
      }
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
    document.head.innerHTML = `
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui">
<title>Yande.re 简体中文</title>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/necolas/normalize.css/normalize.css">
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@mdi/font@5.9.55/css/materialdesignicons.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/vuetify@2.5.0/dist/vuetify.min.css">
<style>
::-webkit-scrollbar {
  display: none;
  width: 0px !important;
}
</style>
`;
    document.body.innerHTML = `
<div id="app"></div>

<script type="text/template" id="app-template">
<v-app>

  <v-app-bar app dense>
    <v-app-bar-nav-icon :x-small="isMobile" @click="showDrawer=!showDrawer"></v-app-bar-nav-icon>
    <v-toolbar-title :style="isMobile ? 'font-size: 12px;' : ''" v-text="title"></v-toolbar-title>
    <!-- 设置分级制度 -->
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn :x-small="isMobile" class="white--text ml-2" dark v-bind="attrs" v-on="on">
          S{{ showRatingQ ? 'Q' : '' }}{{ showRatingE ? 'E' : '' }}
        </v-btn>
      </template>
      <v-list dense>
        <v-list-item dense>
          <v-list-item-title style="cursor: pointer;" @click="showRatingQ = !showRatingQ;">
            {{ showRatingQ ? '隐藏 Q 级内容' : '显示 Q 级内容' }}
          </v-list-item-title>
        </v-list-item>
        <v-list-item dense>
          <v-list-item-title style="cursor: pointer;" @click="showRatingE = !showRatingE;">
            {{ showRatingE ? '隐藏 E 级内容' : '显示 E 级内容' }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <!-- 设置图片质量 -->
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn :x-small="isMobile" class="white--text ml-2" dark v-bind="attrs" v-on="on">{{ imageQualityHigh ? 'HD' : '速' }}</v-btn>
      </template>
      <v-list dense>
        <v-list-item dense>
          <v-list-item-title style="cursor: pointer;" @click="imageQualityHigh = false;">
            图片质量：速览
          </v-list-item-title>
        </v-list-item>
        <v-list-item dense>
          <v-list-item-title style="cursor: pointer;" @click="imageQualityHigh = true;">
            图片质量：高清
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <!-- 设置每行几张 -->
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn :x-small="isMobile" class="white--text ml-2" dark v-bind="attrs" v-on="on">{{imageCountInRow}}列</v-btn>
      </template>
      <v-list dense>
        <v-list-item dense v-for="number in [1, 2, 3, 4, 5, 6, 8, 10, 12, 14, 16, 20]" :key="number">
          <v-list-item-title style="cursor: pointer;" @click="imageCountInRow = number;">
            {{ number }}列
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <v-spacer></v-spacer>
    <v-btn
      :style="isMobile ? 'flex: 0 1 auto; overflow: hidden;' : ''" :x-small="isMobile"
      text v-text="'v' + version" color="#ffffff" disabled>
    </v-btn>
  </v-app-bar>

  <v-navigation-drawer v-model="showDrawer" app temporary>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title">Yande.re 简体中文</v-list-item-title>
        <v-list-item-subtitle>浏览器脚本程序</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense nav>
      <v-list-item-content>
        <v-list-item-title class="title">设置</v-list-item-title>
        <v-list-item-subtitle></v-list-item-subtitle>
      </v-list-item-content>
      <!-- s -->
      <v-list-item link>
        <v-list-item-icon class="mr-2">
          <v-icon>mdi-check</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>显示 S 分级内容</v-list-item-title>
          <v-list-item-subtitle>S(safe) 安全的全年龄内容</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <!-- q -->
      <v-list-item link @click="showRatingQ=!showRatingQ;">
        <v-list-item-icon class="mr-2">
          <v-icon v-text="showRatingQ ? 'mdi-check' : 'mdi-close'"></v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title v-text="showRatingQ ? '显示 Q 分级内容' : '隐藏 Q 分级内容'"></v-list-item-title>
          <v-list-item-subtitle>Q(questionable) 疑似的成人内容</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <!-- e -->
      <v-list-item link @click="showRatingE=!showRatingE;">
        <v-list-item-icon class="mr-2">
          <v-icon v-text="showRatingE ? 'mdi-check' : 'mdi-close'"></v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title v-text="showRatingE ? '显示 E 分级内容' : '隐藏 E 分级内容'"></v-list-item-title>
          <v-list-item-subtitle>E(explicit) 明确的成人内容</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list dense nav>
      <v-list-item-content>
        <v-list-item-title class="title">关于</v-list-item-title>
        <v-list-item-subtitle></v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item link @click="window.open('https://github.com/coderzhaoziwei/yande-re-chinese-patch/blob/main/readme.md')">
        <v-list-item-icon class="mr-2"><v-icon>mdi-file-document-outline</v-icon></v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>简介</v-list-item-title>
          <v-list-item-subtitle>说明文档 / 功能介绍</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link @click="window.open('https://github.com/coderzhaoziwei/yande-re-chinese-patch/issues')">
        <v-list-item-icon class="mr-2"><v-icon>mdi-github</v-icon></v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>反馈</v-list-item-title>
          <v-list-item-subtitle>发现错误 / 提出建议</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link @click="window.open('https://github.com/coderzhaoziwei/yande-re-chinese-patch')">
        <v-list-item-icon class="mr-2"><v-icon>mdi-star</v-icon></v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Github</v-list-item-title>
          <v-list-item-subtitle>觉得好用就 Star 支持一下</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link>
        <v-list-item-icon class="mr-2"><v-icon>mdi-google-controller</v-icon></v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>QQ</v-list-item-title>
          <v-list-item-subtitle>3158492760</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link>
        <v-list-item-icon class="mr-2"><v-icon>mdi-email</v-icon></v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>邮箱</v-list-item-title>
          <v-list-item-subtitle>coderzhaoziwei@outlook.com</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>

  <v-main app>
    <v-container class="pa-2" fluid>
      <masonry ref="masonry" :cols="imageCountInRow" gutter="8px" :key="imageCountInRow">
        <v-card class="mb-2" v-for="(image, index) in imageList" :key="index">
          <v-img
            :src="
              image.isRatingS || (image.isRatingQ && showRatingQ) || (image.isRatingE && showRatingE)
                ? (imageQualityHigh ? image.sampleUrl : image.previewUrl) : ''
            "
            :aspect-ratio="image.aspectRatio"
            @click="if(image.isRatingS||(image.isRatingQ && showRatingQ)||(image.isRatingE && showRatingE)){imageSelectedIndex=index;showImageSelected=true;}"
            @click.middle="imageSelectedIndex = index; window.open('/post/show/' + imageSelected.id)"
          >
            <template v-slot:placeholder>
              <v-row v-if="image.isRatingS||(image.isRatingQ && showRatingQ)||(image.isRatingE && showRatingE)"
                class="fill-height ma-0" align="center" justify="center"
              >
                <v-progress-circular indeterminate color="#ee8888"></v-progress-circular>
              </v-row>
            </template>
            <v-row
              v-if="(image.isRatingS||(image.isRatingQ && showRatingQ)||(image.isRatingE && showRatingE))===false"
              class="fill-height ma-0 text-h5" align="center" justify="center"
              style="color:#ee8888;"
              v-text="image.rating.toUpperCase()"
            ></v-row>
          </v-img>
        </v-card>
      </masonry>

      <div class="d-flex justify-center">
        <v-btn
          :disabled="requestState===false"
          color="#ee8888" text
          v-text="requestStop ? '下面没有了...' : requestState ? '正在加载中...' : ''"
        ></v-btn>
      </div>

      <v-dialog v-model="showImageSelected" :width="imageSelectedWidth" :height="imageSelectedHeight">
        <v-img
          :src="imageSelected.sampleUrl"
          :lazy-src="imageSelected.previewUrl"
          @click="showImageInfo = !showImageInfo;"
        >
          <div
            :style="showImageInfo
              ? 'display: flex; flex-direction: column; height: 100%; padding: 4px; grid-gap: 4px;'
              : 'display: none !important;'"
          >
            <div style="height: 100%; flex: 1 1 auto;"></div>

            <div style="display: flex; flex-direction: column; grid-gap: 4px;">
              <v-chip style="width: fit-content;" color="#009ff088" text-color="#ffffff" small
                v-text="imageSelected.sampleDownloadText"
                @click.stop="download(imageSelected.sampleUrl, imageSelected.sampleDownloadName)"
              ></v-chip>
              <v-chip style="width: fit-content;" color="#009ff088" text-color="#ffffff" small
                v-if="imageSelected.jpegSize !== 0"
                v-text="imageSelected.jpegDownloadText"
                @click.stop="download(imageSelected.jpegUrl, imageSelected.jpegDownloadName)"
              ></v-chip>
              <v-chip style="width: fit-content;" color="#009ff088" text-color="#ffffff" small
                v-text="imageSelected.fileDownloadText"
                @click.stop="download(imageSelected.fileUrl, imageSelected.fileDownloadName)"
              ></v-chip>
            </div>
            <div style="display: flex; grid-gap: 4px; flex-wrap: wrap;">
              <v-chip
                style="width: fit-content;" color="#ee888888" text-color="#ffffff" small
                v-text="imageSelected.id + ' ' + imageSelected.rating.toUpperCase()" @click.stop
              ></v-chip>
              <v-chip class="mr-1" style="width: fit-content;" color="#009ff088" text-color="#ffffff" small
                v-if="imageSelectedDetail.artist"
                @click.stop="window.open('/post?tags='+imageSelectedDetail.artist)"
              >画师 {{imageSelectedDetail.artist}}</v-chip>
              <v-chip class="mr-1" style="width: fit-content;" color="#009ff088" text-color="#ffffff" small
                v-if="imageSelected.sourceUrl !== ''"
                v-text="'来源链接'"
                @click.stop="window.open(imageSelected.sourceUrl)"
              ></v-chip>
              <v-chip class="mr-1" style="width: fit-content;" color="#009ff088" text-color="#ffffff" small
                v-text="'本站链接'"
                @click.stop="window.open('/post/show/' + imageSelected.id)"
              ></v-chip>
              <v-chip class="mr-1" style="width: fit-content;" text-color="#ffffff" small
                :color="imageSelectedDetail.favorite ? '#00900088' : '#009ff088'"
                v-text="imageSelectedDetail.favorite ? '已收藏' : '添加收藏'"
                @click.stop="imageSelectedDetail.favorite ? (void 0) : onFavorite(imageSelected.id)"
              ></v-chip>
            </div>
          </div>
        </v-img>
      </v-dialog>
    </v-container>
  </v-main>
</v-app>
</script>
`;
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
    document.getElementById("post-list-posts").insertAdjacentHTML("beforebegin", `
<div style="padding: 1rem; user-select: none; text-align: center;">
  <select id="showLeftBar" style="height: 1.5rem; line-height: 1.5rem;">
    <option>隐藏左栏</option>
    <option>显示左栏</option>
  </select>
  <select id="showRatingE" style="height: 1.5rem; line-height: 1.5rem; margin-left: 0.25rem;">
    <option>隐藏默认</option>
    <option>显示全部</option>
  </select>
  <select id="showImageHD" style="height: 1.5rem; line-height: 1.5rem; margin-left: 0.25rem;">
    <option>默认尺寸</option>
    <option>二倍尺寸</option>
    <option>三倍尺寸</option>
    <option>四倍尺寸</option>
  </select>
  <button id="enterBrowseMode" style="margin-left: 0.25rem;">进入浏览模式</button>
</div>
`);
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

  const tags = {
  "4koma": "四格漫画",
  "5-toubun_no_hanayome": "五等分的新娘",
  "anal": "肛交",
  "angel": "天使",
  "angel_beats!": "Angel Beats!",
  "animal_ears": "兽耳",
  "anthropomorphization": "拟人化",
  "anus": "肛门露出",
  "areola": "乳晕",
  "arknights": "明日方舟",
  "armor": "盔甲/装甲",
  "artist_revision": "画师修改",
  "ass": "臀部",
  "ass_grab": "持股/捏臀",
  "atelier": "炼金工房系列",
  "autographed": "亲笔签名",
  "azur_lane": "碧蓝航线",
  "bakemonogatari": "化物语",
  "bandages": "绷带",
  "bandaid": "创可贴/绷带",
  "bang_dream!": "BanG Dream!",
  "baseball": "棒球",
  "basketball": "篮球",
  "bathing": "沐浴",
  "benghuai_xueyuan": "崩坏学园",
  "bike_shorts": "自行车短裤",
  "bikini": "比基尼",
  "bikini_armor": "比基尼装甲/轻薄盔甲",
  "bikini_top": "比基尼乳罩",
  "black_rock_shooter": "黑岩射手",
  "blood": "血腥",
  "bloomers": "灯笼裤/宽松短裤",
  "blue_archive": "碧蓝档案",
  "bodysuit": "紧身衣裤",
  "boku_wa_tomodachi_ga_sukunai": "我的朋友很少",
  "bondage": "束缚",
  "bottomless": "下身露出",
  "bra": "乳罩",
  "breast_grab": "握乳",
  "breast_hold": "托乳",
  "breasts": "乳",
  "bukkake": "颜射",
  "bunny_ears": "兔耳",
  "bunny_girl": "兔女郎",
  "buruma": "运动短裤",
  "business_suit": "西装/职业服",
  "calendar": "日历",
  "cameltoe": "阴户凸显",
  "card": "卡牌",
  "card_captor_sakura": "魔卡少女樱",
  "censored": "有码",
  "cg": "CG/计算机动画",
  "chainsaw": "电锯",
  "character_design": "角色设计",
  "cheerleader": "啦啦队队员",
  "chibi": "Q版",
  "chinadress": "旗袍",
  "choujigen_game_neptune": "超次元游戏海王星",
  "christmas": "圣诞",
  "cleavage": "乳沟",
  "code_geass": "反叛的鲁路修",
  "condom": "避孕套",
  "corset": "(束腰)紧身内衣",
  "cosplay": "角色扮演",
  "cream": "奶油",
  "cropped": "裁剪图",
  "crossdress": "变装",
  "crossover": "作品联动/混合同人",
  "cum": "精液",
  "cunnilingus": "品玉/舔阴",
  "dakimakura": "抱枕",
  "darling_in_the_franxx": "DARLING in the FRANXX",
  "date_a_live": "约会大作战",
  "detexted": "去字图片",
  "devil": "魔鬼/恶魔",
  "digital_version": "数字版",
  "dildo": "假阳具",
  "disc_cover": "光盘封面",
  "dress": "连衣裙",
  "dress_shirt": "衬衫",
  "duplicate": "重复图片",
  "elf": "精灵",
  "endcard": "片尾插图",
  "erect_nipples": "乳尖",
  "expression": "角色展示/立绘",
  "extreme_content": "极端",
  "eyepatch": "眼罩",
  "fairy": "精灵/小精灵",
  "fate/kaleid_liner_prisma_illya": "Fate/kaleid liner 魔法少女☆伊莉雅",
  "feet": "足",
  "fellatio": "口交",
  "final_fantasy": "最终幻想",
  "final_fantasy_vii": "最终幻想 VII",
  "final_fantasy_xiv": "最终幻想 14",
  "fingering": "指交",
  "fire_emblem": "火焰纹章",
  "fire_emblem_heroes": "火焰之纹章：英雄云集",
  "fire_emblem_kakusei": "火焰之纹章：觉醒",
  "fire_emblem_three_houses": "火焰之纹章：风花雪月",
  "fishnets": "鱼网袜",
  "fixed": "修改",
  "footjob": "足交",
  "fundoshi": "褌/兜裆布",
  "futanari": "扶她",
  "game_cg": "游戏CG",
  "gangbang": "乱交",
  "garter": "袜带",
  "garter_belt": "吊袜腰带",
  "genderswap": "性转",
  "genshin_impact": "原神",
  "girls_frontline": "少女前线",
  "girls_und_panzer": "少女与战车",
  "gochuumon_wa_usagi_desu_ka?": "请问您今天要来点兔子吗？",
  "gothic_lolita": "哥特式洛丽塔",
  "granblue_fantasy": "碧蓝幻想",
  "guitar": "吉他",
  "gun": "枪炮",
  "gundam": "高达",
  "guro": "猎奇",
  "halloween": "万圣节前夜",
  "handjob": "打手枪",
  "headphones": "耳机",
  "heels": "高跟鞋",
  "heterochromia": "虹膜异色",
  "hibike!_euphonium": "吹响吧！上低音号",
  "highschool_dxd": "恶魔高校D×D",
  "honkai_impact": "崩坏 3",
  "horns": "角",
  "index_page": "索引页面",
  "infinite_stratos": "IS/无限斯特拉托斯",
  "inumimi": "犬耳",
  "japanese_clothes": "日式服装",
  "k-on!": "轻音少女",
  "kaguya-sama_wa_kokurasetai_~tensai-tachi_no_renai_zunousen~": "辉夜大小姐想让我告白～天才们的恋爱头脑战～",
  "kantai_collection": "舰队 Collection",
  "kemono_friends": "兽娘动物园",
  "kimetsu_no_yaiba": "鬼灭之刃",
  "kimono": "和服",
  "kitsune": "狐狸",
  "kobayashi-san_chi_no_maid_dragon": "小林家的龙女仆",
  "kono_subarashii_sekai_ni_shukufuku_wo!": "为美好的世界献上祝福！",
  "lactation": "泌乳",
  "landscape": "风景画",
  "league_of_legends": "英雄联盟",
  "leotard": "紧身连衣裤",
  "line_art": "线条画",
  "lingerie": "贴身内衣",
  "little_busters!": "Little Busters!",
  "loli": "萝莉",
  "lolita_fashion": "洛丽塔",
  "love_live!_nijigasaki_high_school_idol_club": "Love Live! 虹咲学园学园偶像同好会",
  "lucky_star": "幸运星",
  "maebari": "前貼り/遮盖私处",
  "mahou_shoujo_lyrical_nanoha": "魔法少女奈叶",
  "mahou_shoujo_lyrical_nanoha_strikers": "魔法少女奈叶 StrikerS",
  "maid": "女仆",
  "male": "男性",
  "masturbation": "自摸/手淫",
  "mecha": "机甲",
  "mecha_musume": "机甲娘",
  "megane": "眼镜",
  "megaten": "女神转生系列",
  "mermaid": "美人鱼",
  "miko": "巫女",
  "monochrome": "单色",
  "monster": "怪物",
  "monster_girl": "怪物女孩",
  "monster_musume_no_iru_nichijou": "魔物娘的相伴日常",
  "naked": "裸体",
  "naked_apron": "裸体围裙",
  "naked_cape": "裸体披风",
  "naked_ribbon": "裸体丝带",
  "neko": "猫",
  "nekomimi": "猫耳",
  "neon_genesis_evangelion": "新世纪福音战士",
  "nier_automata": "尼尔：自动人形",
  "nijisanji": "彩虹社",
  "ninja": "忍者",
  "nipple_slip": "露点",
  "nipples": "乳头",
  "no_bra": "无乳罩",
  "nopan": "无胖次",
  "nun": "修女",
  "nurse": "护士",
  "official_watermark": "官方水印",
  "onsen": "温泉",
  "open_shirt": "衬衫敞开",
  "ore_no_imouto_ga_konnani_kawaii_wake_ga_nai": "我的妹妹哪有这么可爱！",
  "overalls": "工装连衣裤",
  "overwatch": "守望先锋",
  "paizuri": "乳交",
  "pajama": "睡衣",
  "panties": "内裤",
  "pantsu": "胖次",
  "panty_pull": "胖次脱下",
  "pantyhose": "吊带袜",
  "parody": "仿拟/谐拟",
  "partial_scan": "局部扫描",
  "pasties": "乳贴",
  "pee": "尿尿",
  "penguin": "企鹅",
  "penis": "阴茎",
  "photo": "照片/现实背景",
  "photoshop": "PS 改图",
  "pirate": "海盗",
  "pointy_ears": "尖耳朵",
  "pokemon": "精灵宝可梦",
  "possible_duplicate": "可能重复",
  "pregnant": "孕妇",
  "pretty_cure": "光之美少女",
  "princess_connect": "公主连结",
  "princess_connect!_re:dive": "公主连结 Re:Dive",
  "profile_page": "角色资料页",
  "pubic_hair": "阴毛",
  "puella_magi_madoka_magica": "魔法少女小圆",
  "pussy": "阴户",
  "pussy_juice": "妹汁",
  "queen's_blade": "女王之刃",
  "raw_scan": "扫描原图",
  "re_zero_kara_hajimeru_isekai_seikatsu": "Re:从零开始的异世界生活",
  "robe": "长袍/礼服/睡袍",
  "saenai_heroine_no_sodatekata": "路人女主的养成方法",
  "sailor_moon": "美少女战士",
  "sake": "日本清酒",
  "sample": "样品图",
  "sarashi": "晒し/缠胸布",
  "school_swimsuit": "学校泳衣",
  "see_through": "透视",
  "seifuku": "制服",
  "selfie": "自拍",
  "senran_kagura": "闪乱神乐",
  "sex": "性交",
  "sheets": "床单",
  "shimapan": "条纹胖次",
  "shirt_lift": "衬衫掀起",
  "shota": "正太",
  "silhouette": "剪影/暗色轮廓/体形",
  "sketch": "素描",
  "skirt_lift": "裙摆掀起",
  "sling_bikini": "吊带比基尼",
  "smoking": "吸烟",
  "soccer": "足球",
  "sono_bisque_doll_wa_koi_wo_suru": "更衣人偶坠入爱河",
  "spy_x_family": "间谍过家家",
  "ssss.gridman": "SSSS.古立特",
  "stick_poster": "海报",
  "stockings": "长筒袜",
  "strike_witches": "强袭魔女",
  "string_panties": "细绳胖次",
  "summer_dress": "夏装",
  "suzumiya_haruhi_no_yuuutsu": "凉宫春日的忧郁",
  "sweater": "毛衣",
  "swimsuits": "泳衣",
  "sword": "刀剑",
  "sword_art_online": "刀剑神域",
  "symmetrical_docking": "乳乳相接",
  "tagme": "标签",
  "tail": "兽尾",
  "tan_lines": "日晒线",
  "tattoo": "文身",
  "tennis": "网球",
  "tentacles": "触手",
  "text": "文本",
  "the_idolm@ster": "偶像大师",
  "the_idolm@ster_cinderella_girls": "偶像大师灰姑娘女孩",
  "the_idolm@ster_million_live!": "偶像大师百万现场",
  "the_idolm@ster_shiny_colors": "偶像大师闪耀色彩",
  "thighhighs": "过膝袜",
  "thong": "丁字裤",
  "to_aru_kagaku_no_railgun": "某科学的超电磁炮",
  "to_aru_majutsu_no_index": "魔法禁书目录",
  "to_heart_(series)": "To Heart 系列",
  "to_heart_2": "To Heart 2",
  "to_love_ru": "出包王女",
  "to_love_ru_darkness": "出包王女 Darkness",
  "topless": "上身露出",
  "torn_clothes": "破衣",
  "touhou": "东方",
  "towel": "浴巾",
  "translated": "文字已翻译(英文)",
  "transparent_png": "背景透明",
  "trap": "伪娘",
  "tribadism": "磨豆腐/交叉体位",
  "tutorial": "教程",
  "uma_musume_pretty_derby": "赛马娘",
  "umbrella": "伞",
  "uncensored": "无码",
  "underboob": "南半球",
  "underwear": "内衣",
  "undressing": "脱衣",
  "uniform": "制服",
  "valentine": "情人节",
  "vibrator": "跳蛋",
  "wa_maid": "和风女仆",
  "waitress": "女侍",
  "wallpaper": "壁纸",
  "wardrobe_malfunction": "走光",
  "weapon": "武器",
  "wedding_dress": "婚纱",
  "wet": "湿身",
  "wet_clothes": "湿衣",
  "wings": "翅膀",
  "witch": "女巫",
  "xenoblade": "异度神剑",
  "xenoblade_chronicles_2": "异度神剑 2",
  "yahari_ore_no_seishun_lovecome_wa_machigatteiru.": "我的青春恋爱喜剧果然有问题",
  "yaoi": "蔷薇/男同",
  "yukata": "浴衣",
  "yuri": "百合",
  "zhanjianshaonv": "战舰少女"
};
  const menus = 
{
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
  "My Profile": "我的资料",
  "My Mail": "我的消息",
  "My Favorites": "我的收藏",
  "Settings": "设置",
  "Change Password": "修改密码",
  "Logout": "退出登录",
  "View Posts": "浏览作品",
  "Search Posts": "搜索作品",
  "Upload": "上传",
  "Random": "随机浏览",
  "Popular": "热门",
  "Image Search": "搜索图片",
  "History": "历史",
  "View Comments": "浏览评论",
  "Search Comments": "搜索评论",
  "View Notes": "浏览笔记",
  "Search Notes": "搜索笔记",
  "View Artists": "浏览画师",
  "Search Artists": "搜索画师",
  "Create": "创建",
  "View Tags": "浏览标签",
  "Search Tags": "搜索标签",
  "Aliases": "别名",
  "Implications": "含义",
  "View Pools": "浏览 Pools",
  "Search Pools": "搜索 Pools",
  "Create New Pool": "创建 Pool",
  "View Wiki Index": "浏览 Wiki 主页",
  "Search Wiki": "搜索 Wiki",
  "Create New Page": "创建新页面",
  "Mark All Read": "全部标记已读"
}
;
  const footers = 
{
  "List": "首页",
  "Browse": "翻阅",
  "Upload": "上传",
  "Random": "随机",
  "Popular": "热门",
  "Image Search": "寻图",
  "History": "历史",
  "Help": "帮助"
}
;
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
