// ==UserScript==
// @name         Yande.re 简体中文
// @namespace    com.coderzhaoziwei.yandere
// @version      2.0.58
// @author       Coder Zhao coderzhaoziwei@outlook.com
// @description  Y 站简体中文补丁| 显示隐藏作品 | 高清大图模式 | 界面布局优化 | 方向键翻页 | Simplified Chinese patch for Yande.re
// @modified     2021/5/19 18:22:30
// @homepage     https://greasyfork.org/scripts/421970
// @license      MIT
// @match        https://yande.re/*
// @exclude      https://yande.re/forum/*
// @match        https://oreno.imouto.us/*
// @exclude      https://oreno.imouto.us/forum/*
// @match        https://konachan.com/*
// @exclude      https://konachan.com/forum/*
// @match        https://konachan.net/*
// @exclude      https://konachan.net/forum/*
// @supportURL   https://github.com/coderzhaoziwei/yande-re-chinese-patch/issues
// @grant        none
// ==/UserScript==

/* eslint-env es6 */
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
li.tag-type-artist a:nth-child(4)::before {
  content: "[画师]";
}
li.tag-type-copyright a:nth-child(4)::before {
  content: "[原作]";
}
li.tag-type-character a:nth-child(4)::before {
  content: "[角色]";
}
li.tag-type-circle a:nth-child(4)::before {
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
      if (/^(TEXTAREA|INPUT|SELECT|BUTTON)$/.test(document.activeElement.tagName)) return
      const prev = document.querySelector(".pagination>.previous_page");
      if (prev && (event.key == "ArrowLeft" || event.key == "a" || event.key == "A")) {
        prev.click();
        return event.preventDefault()
      }
      const next = document.querySelector(".pagination>.next_page");
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
      }
    },
    computed: {
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
        const width = parseInt(Math.min(this.innerWidth*0.9, this.imageSelected.width));
        const height = Math.min(this.innerHeight*0.9, this.imageSelected.height);
        const width2 = parseInt(height * this.imageSelected.aspectRatio);
        return Math.min(width, width2)
      },
      imageSelectedHeight() {
        const width = Math.min(this.innerWidth*0.9, this.imageSelected.width);
        const height = parseInt(Math.min(this.innerHeight*0.9, this.imageSelected.height));
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
          response.forEach(item => this.imageList.push(new Post(item)));
          const page = Number(this.params.get("page")) || 1;
          this.params.set("page", page + 1);
          setTimeout(() => (this.requestState = false), 1000);
        } else {
          this.requestStop = true;
        }
      },
      download(url, filename) {
        console.log(url);
        jQuery.ajax({
          url,
          xhrFields:{ responseType: 'blob' },
          success(data) {
            const element = document.createElement("a");
            element.href = URL.createObjectURL(data);
            element.download = filename;
            const event = new MouseEvent('click');
            element.dispatchEvent(event);
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
    document.head.innerHTML = `
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui">
<title>Yande.re 简体中文</title>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/necolas/normalize.css/normalize.css">
<link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900" rel="stylesheet">
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
    <v-app-bar-nav-icon @click="showDrawer=!showDrawer"></v-app-bar-nav-icon>
    <v-toolbar-title v-text="title"></v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn text v-text="'version ' + version" color="#ffffff" disabled></v-btn>
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
          <v-list-item-title>仓库</v-list-item-title>
          <v-list-item-subtitle>觉得好用就 Star 支持一下</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link @click="window.open('http://wpa.qq.com/msgrd?v=3&uin=3158492760&site=qq&menu=yes')">
        <v-list-item-icon class="mr-2"><v-icon>mdi-google-controller</v-icon></v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>作者</v-list-item-title>
          <v-list-item-subtitle>加Q 3158492760 找我玩儿</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link>
        <v-list-item-icon class="mr-2"><v-icon>mdi-email</v-icon></v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>邮箱</v-list-item-title>
          <v-list-item-subtitle>coderzhaoziwei@outlook.com</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <!-- <v-list-item-subtitle>QQ: 3158492760</v-list-item-subtitle> -->
    </v-list>
  </v-navigation-drawer>

  <v-main app>
    <v-container class="pa-2" fluid>
      <masonry :cols="{ default: 8, 2000: 7, 1750: 6, 1500: 5, 1250: 4, 1000: 3, 750: 2 }" gutter="8px">
        <v-card class="mb-2" v-for="(image, index) in imageList" :key="index">
          <v-img
            :src="image.isRatingS||(image.isRatingQ && showRatingQ)||(image.isRatingE && showRatingE)?image.sampleUrl:''"
            :lazy-src="image.isRatingS||(image.isRatingQ && showRatingQ)||(image.isRatingE && showRatingE)?image.previewUrl:''"
            :aspect-ratio="image.aspectRatio"
            @click="if(image.isRatingS||(image.isRatingQ && showRatingQ)||(image.isRatingE && showRatingE)){imageSelectedIndex=index;showImageSelected=true;}"
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
        <v-img :src="imageSelected.sampleUrl" @click="showImageInfo=!showImageInfo;">
          <div :style="showImageInfo ? '' : 'display: none !important;'" class="d-flex flex-column px-1">
            <v-chip class="mt-1" style="width:fit-content;" color="#ee8888" text-color="#ffffff" small
              v-text="'编号 ' + imageSelected.id" @click.stop
            ></v-chip>
            <v-chip class="mt-1" style="width:fit-content;" color="#ee8888" text-color="#ffffff" small
              v-text="'分级 ' + imageSelected.rating.toUpperCase()" @click.stop
            ></v-chip>
            <v-chip class="mt-1" style="width:fit-content;" color="#ee8888" text-color="#ffffff" small
              v-text="'评分 ' + imageSelected.score" @click.stop
            ></v-chip>
            <v-chip class="mt-1" style="width:fit-content;" color="#ee8888" text-color="#ffffff" small
              v-text="'创建者 ' + imageSelected.author"
              @click.stop="window.open('/user/show/' + imageSelected.creatorId)"
            ></v-chip>
            <v-chip class="mt-1" style="width:fit-content;" color="#ee8888" text-color="#ffffff" small
              v-text="'创建时间 ' + imageSelected.createdTime"
              @click.stop
            ></v-chip>
            <v-chip class="mt-1" style="width:fit-content;" color="#ee8888" text-color="#ffffff" small
              v-text="'更新时间 ' + imageSelected.updatedTime"
              @click.stop
            ></v-chip>
            <v-chip class="mt-1" style="width:fit-content;" color="#ee8888" text-color="#ffffff" small
              v-if="imageSelected.sourceUrl !== ''"
              v-text="'来源链接 ' + imageSelected.sourceUrl"
              @click.stop="window.open(imageSelected.sourceUrl)"
            ></v-chip>
            <!-- https://oreno.imouto.us/post/show/785667 -->
            <v-chip class="mt-1" style="width:fit-content;" color="#ee8888" text-color="#ffffff" small
              v-text="'本站链接 ' + location.origin + '/post/show/' + imageSelected.id"
              @click.stop="window.open('/post/show/' + imageSelected.id)"
            ></v-chip>
            <div style="height:1.25rem;"></div>
            <!-- 下载三种格式的文件 -->
            <v-chip class="mt-1" style="width:fit-content;" color="#ee8888" text-color="#ffffff" small
              v-text="imageSelected.sampleDownloadText"
              @click.stop="download(imageSelected.sampleUrl, imageSelected.sampleDownloadName)"
            ></v-chip>
            <v-chip class="mt-1" style="width:fit-content;" color="#ee8888" text-color="#ffffff" small
              v-if="imageSelected.jpegSize !== 0"
              v-text="imageSelected.jpegDownloadText"
              @click.stop="download(imageSelected.jpegUrl, imageSelected.jpegDownloadName)"
            ></v-chip>
            <v-chip class="mt-1" style="width:fit-content;" color="#ee8888" text-color="#ffffff" small
              v-text="imageSelected.fileDownloadText"
              @click.stop="download(imageSelected.fileUrl, imageSelected.fileDownloadName)"
            ></v-chip>
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

  const tags = 
{
  "anal": "肛交",
  "angel": "天使",
  "animal_ears": "兽耳",
  "anus": "肛门露出",
  "areola": "乳晕",
  "armor": "盔甲/装甲",
  "artist_revision": "画师修改",
  "ass": "臀部",
  "ass_grab": "持股/捏臀",
  "bandages": "绷带",
  "bathing": "沐浴",
  "bikini": "比基尼",
  "bikini_armor": "比基尼装甲/轻薄盔甲",
  "bikini_top": "比基尼乳罩",
  "blood": "血腥",
  "bloomers": "灯笼裤/宽松短裤",
  "bodysuit": "紧身衣裤",
  "bondage": "束缚",
  "bottomless": "下身露出",
  "bra": "乳罩",
  "breast_grab": "握乳",
  "breast_hold": "托乳",
  "breasts": "乳",
  "bunny_ears": "兔耳",
  "bunny_girl": "兔女郎",
  "buruma": "运动短裤",
  "calendar": "日历",
  "cameltoe": "阴户凸显",
  "censored": "有码",
  "cheerleader": "啦啦队队员",
  "chibi": "Q版",
  "chinadress": "旗袍",
  "christmas": "圣诞",
  "cleavage": "乳沟",
  "cream": "奶油",
  "crossdress": "变装",
  "cum": "精液",
  "dakimakura": "抱枕",
  "digital_version": "数字版",
  "dildo": "假阳具",
  "disc_cover": "光盘封面",
  "dress": "连衣裙",
  "dress_shirt": "衬衫",
  "elf": "精灵",
  "erect_nipples": "乳尖",
  "extreme_content": "极端",
  "eyepatch": "眼罩",
  "feet": "足",
  "fellatio": "口交",
  "fishnets": "鱼网袜",
  "fixed": "修改",
  "footjob": "足交",
  "futanari": "扶她",
  "game_cg": "游戏CG",
  "gangbang": "乱交",
  "garter": "袜带",
  "garter_belt": "吊袜腰带",
  "guitar": "吉他",
  "gun": "枪炮",
  "guro": "猎奇",
  "halloween": "万圣节前夜",
  "handjob": "打手枪",
  "headphones": "耳机",
  "heels": "高跟鞋",
  "heterochromia": "虹膜异色",
  "horns": "角",
  "japanese_clothes": "日式服装",
  "kimono": "和服",
  "kitsune": "狐狸",
  "landscape": "风景画",
  "leotard": "紧身连衣裤",
  "lingerie": "贴身内衣",
  "loli": "萝莉",
  "lolita_fashion": "洛丽塔",
  "maid": "女仆",
  "male": "男性",
  "masturbation": "自摸/手淫",
  "mecha": "机甲",
  "megane": "眼镜",
  "miko": "巫女",
  "monochrome": "单色",
  "naked": "裸体",
  "naked_apron": "裸体围裙",
  "naked_cape": "裸体披风",
  "neko": "猫",
  "nekomimi": "猫耳",
  "nipples": "乳头",
  "no_bra": "无乳罩",
  "nopan": "无胖次",
  "nurse": "护士",
  "onsen": "温泉",
  "open_shirt": "衬衫敞开",
  "paizuri": "乳交",
  "pajama": "睡衣",
  "pantsu": "胖次",
  "panty_pull": "胖次脱下",
  "pantyhose": "吊带袜",
  "partial_scan": "局部扫描",
  "penis": "阴茎",
  "pointy_ears": "尖耳朵",
  "pubic_hair": "阴毛",
  "pussy": "阴户",
  "pussy_juice": "妹汁",
  "school_swimsuit": "学校泳衣",
  "see_through": "透视",
  "seifuku": "制服",
  "sex": "性交",
  "sheets": "床单",
  "shimapan": "条纹胖次",
  "shirt_lift": "衬衫掀起",
  "shota": "正太",
  "sketch": "素描",
  "skirt_lift": "裙摆掀起",
  "stockings": "长筒袜",
  "string_panties": "细绳胖次",
  "sweater": "毛衣",
  "swimsuits": "泳衣",
  "sword": "刀剑",
  "symmetrical_docking": "乳乳相接",
  "tagme": "标签",
  "tail": "兽尾",
  "tan_lines": "日晒线",
  "tattoo": "文身",
  "tentacles": "触手",
  "text": "文本",
  "thighhighs": "过膝袜",
  "thong": "丁字裤",
  "topless": "上身露出",
  "torn_clothes": "破衣",
  "towel": "浴巾",
  "transparent_png": "背景透明",
  "trap": "伪娘",
  "umbrella": "伞",
  "uncensored": "无码",
  "underboob": "南半球/下乳露出",
  "undressing": "脱衣",
  "uniform": "制服",
  "vibrator": "跳蛋",
  "waitress": "女侍",
  "wallpaper": "壁纸",
  "weapon": "武器",
  "wedding_dress": "婚纱",
  "wet": "湿身",
  "wet_clothes": "湿衣",
  "wings": "翅膀",
  "witch": "女巫",
  "yaoi": "蔷薇/男同",
  "yukata": "浴衣",
  "yuri": "百合"
}
;
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
  });

}());
