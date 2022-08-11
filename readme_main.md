![version][img-version]
![license][img-license]
![stars][img-stars]
![cover][img-cover]

<!-- omit in toc -->
# 目录

- [前言](#前言)
- [预览](#预览)
- [功能](#功能)
  - [标签翻译](#标签翻译)
  - [操作优化](#操作优化)
  - [浏览模式](#浏览模式)
- [安装](#安装)
  - [安装浏览器插件](#安装浏览器插件)
  - [安装脚本程序](#安装脚本程序)
- [常见问题](#常见问题)
  - [Q: 安卓手机如何安装 Tampermonkey？](#q-安卓手机如何安装-tampermonkey)
- [相关链接](#相关链接)
- [开源许可](#开源许可)
- [附：标签翻译表](#附标签翻译表)

# 前言

最初，我在浏览 [yande.re 站](https://yande.re)（以下简称 Y 站）的时候，遇到了一些难懂的标签名。在使用搜索引擎多方查询之后，我才终于明白个别晦涩单词的含义，可是过了一段时间再次遇到，又忘记了。然后我就敲了一个脚本程序，自动遍历页面中的标签名，添加中文翻译。为了让与我有同样困扰的其他朋友节约时间，我将脚本程序发布到了脚本网站 [Greasy Fork](https://greasyfork.org/) 上。

后来，有朋友提议添加更优化的操作方式，于是陆续增加了显示大图、键盘翻页等功能。再后来有一天，我躺在床上用手机登陆了 Y 站，网站无法适配移动端屏幕实在是太特么难受了，于是我就敲了响应式布局的浏览模式，手机可以自动加载图片资源，单屏一滑到底。

终于，舒服了。

- https://yande.re
- ~~https://oreno.imouto.us （Y 站镜像，无需魔法上网）~~（已失效）
- https://konachan.com （K 站已兼容）
- https://konachan.net （K 站安全模式，.net 域名下默认隐藏成人内容）

# 预览

- 样式优化，高清图源，尺寸自选。

![1](https://cdn.jsdelivr.net/gh/coderzhaoziwei/yande-re-chinese-patch/source/img/1.png)

- 流体布局，自动加载，一屏到底。

![2](https://cdn.jsdelivr.net/gh/coderzhaoziwei/yande-re-chinese-patch/source/img/2.png)

- 单图预览，聚合详情，一键下载。

![3](https://cdn.jsdelivr.net/gh/coderzhaoziwei/yande-re-chinese-patch/source/img/3.png)

- 显隐自如，更多功能，欢迎体验。

![4](https://cdn.jsdelivr.net/gh/coderzhaoziwei/yande-re-chinese-patch/source/img/4.png)

# 功能

## 标签翻译

翻译了 Y 站出现频率较高的 100 多个标签，详细内容请查看最下方的标签翻译表。欢迎校正或补充。

## 操作优化

- 对于 Y 站默认隐藏的成人内容，提供了显示或者隐藏的选项。
- 网页左侧的边栏，提供了显示或者隐藏的选项。
- 图源默认自动替换为高清资源，并提供了 1 ~ 4 倍尺寸的选项。
- 快捷键
  - 上一页：A / ←
  - 下一页：D / →
  - 显示当前作品原图：S
  - 显示当前作品来源：W

## 浏览模式

浏览任意图片列表时，可以进入浏览模式。

# 安装

## 安装浏览器插件

首先你需要为你的浏览器安装一个用户脚本管理器，推荐使用插件 [Tampermonkey](https://www.tampermonkey.net/)。

> 主流浏览器有 Chrome、Microsoft Edge、Firefox、Safari 等，如果你的浏览器无法安装 Tampermonkey，那么也就无法安装此脚本程序。

## 安装脚本程序

使用浏览器直接访问 [Greasy Fork - Yande.re 简体中文 - 主页](https://greasyfork.org/scripts/421970)，点击安装即可。

如果你没有 Greasy Fork 的账号，访问以上链接可能会提示你：`此脚本不再在本网站上匿名可用。请登录并检查您的 Greasy Fork 账号设置。`

因为此脚本程序涉及成人内容，所以在 Greasy Fork 站点必须登录才可以浏览或安装。如果你不想注册成为 Greasy Fork 的用户，可以访问成人脚本站点 [Sleasy Fork](https://sleazyfork.org/scripts/421970) 直接安装，或者直接获取[仓库文件](https://github.com/coderzhaoziwei/yande-re-chinese-patch/raw/main/index.user.js)来安装。

# 常见问题

## Q: 安卓手机如何安装 Tampermonkey？

我推荐安卓 Yandex 浏览器，可以直接安装 Chrome 插件。当你发现谷歌市场的 Tampermonkey 显示不兼容时，点击 Yandex 菜单栏，切换为桌面模式即可。

其他安卓浏览器也可以的，Firefox、Kiwi、Iceraven 等自行尝试。

# 相关链接

[Github 仓库](https://github.com/coderzhaoziwei/yande-re-chinese-patch) |
[Greasy Fork 脚本主页](https://greasyfork.org/scripts/421970) |
[封面原图 Yande#388833](https://yande.re/post/show/388833)

# 开源许可

MIT

# 附：标签翻译表

[[ TAGS ]]

[img-version]: https://img.shields.io/github/package-json/v/coderzhaoziwei/yande-re-chinese-patch?style=flat-square
[img-license]: https://shields.io/badge/license-MIT-blue?style=flat-square
[img-stars]: https://img.shields.io/github/stars/coderzhaoziwei/yande-re-chinese-patch?label=star&style=social
[img-cover]: https://cdn.jsdelivr.net/gh/coderzhaoziwei/yande-re-chinese-patch/preview.png
