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
- https://oreno.imouto.us （Y 站镜像，无需魔法上网）
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

||English|简体中文|
|:-:|:-|:-|
|1|anal|肛交|
|2|angel|天使|
|3|animal ears|兽耳|
|4|anus|肛门露出|
|5|areola|乳晕|
|6|armor|盔甲/装甲|
|7|artist revision|画师修改|
|8|ass|臀部|
|9|ass grab|持股/捏臀|
|10|bandages|绷带|
|11|bathing|沐浴|
|12|bikini|比基尼|
|13|bikini armor|比基尼装甲/轻薄盔甲|
|14|bikini top|比基尼乳罩|
|15|blood|血腥|
|16|bloomers|灯笼裤/宽松短裤|
|17|bodysuit|紧身衣裤|
|18|bondage|束缚|
|19|bottomless|下身露出|
|20|bra|乳罩|
|21|breast grab|握乳|
|22|breast hold|托乳|
|23|breasts|乳|
|24|bunny ears|兔耳|
|25|bunny girl|兔女郎|
|26|buruma|运动短裤|
|27|calendar|日历|
|28|cameltoe|阴户凸显|
|29|censored|有码|
|30|cheerleader|啦啦队队员|
|31|chibi|Q版|
|32|chinadress|旗袍|
|33|christmas|圣诞|
|34|cleavage|乳沟|
|35|cream|奶油|
|36|crossdress|变装|
|37|cum|精液|
|38|dakimakura|抱枕|
|39|digital version|数字版|
|40|dildo|假阳具|
|41|disc cover|光盘封面|
|42|dress|连衣裙|
|43|dress shirt|衬衫|
|44|elf|精灵|
|45|erect nipples|乳尖|
|46|extreme content|极端|
|47|eyepatch|眼罩|
|48|feet|足|
|49|fellatio|口交|
|50|fishnets|鱼网袜|
|51|fixed|修改|
|52|footjob|足交|
|53|futanari|扶她|
|54|game cg|游戏CG|
|55|gangbang|乱交|
|56|garter|袜带|
|57|garter belt|吊袜腰带|
|58|guitar|吉他|
|59|gun|枪炮|
|60|guro|猎奇|
|61|halloween|万圣节前夜|
|62|handjob|打手枪|
|63|headphones|耳机|
|64|heels|高跟鞋|
|65|heterochromia|虹膜异色|
|66|horns|角|
|67|japanese clothes|日式服装|
|68|kimono|和服|
|69|kitsune|狐狸|
|70|landscape|风景画|
|71|leotard|紧身连衣裤|
|72|lingerie|贴身内衣|
|73|loli|萝莉|
|74|lolita fashion|洛丽塔|
|75|maid|女仆|
|76|male|男性|
|77|masturbation|自摸/手淫|
|78|mecha|机甲|
|79|megane|眼镜|
|80|miko|巫女|
|81|monochrome|单色|
|82|naked|裸体|
|83|naked apron|裸体围裙|
|84|naked cape|裸体披风|
|85|neko|猫|
|86|nekomimi|猫耳|
|87|nipples|乳头|
|88|no bra|无乳罩|
|89|nopan|无胖次|
|90|nurse|护士|
|91|onsen|温泉|
|92|open shirt|衬衫敞开|
|93|paizuri|乳交|
|94|pajama|睡衣|
|95|pantsu|胖次|
|96|panty pull|胖次脱下|
|97|pantyhose|吊带袜|
|98|partial scan|局部扫描|
|99|penis|阴茎|
|100|pointy ears|尖耳朵|
|101|pubic hair|阴毛|
|102|pussy|阴户|
|103|pussy juice|妹汁|
|104|school swimsuit|学校泳衣|
|105|see through|透视|
|106|seifuku|制服|
|107|sex|性交|
|108|sheets|床单|
|109|shimapan|条纹胖次|
|110|shirt lift|衬衫掀起|
|111|shota|正太|
|112|sketch|素描|
|113|skirt lift|裙摆掀起|
|114|stockings|长筒袜|
|115|string panties|细绳胖次|
|116|sweater|毛衣|
|117|swimsuits|泳衣|
|118|sword|刀剑|
|119|symmetrical docking|乳乳相接|
|120|tagme|标签|
|121|tail|兽尾|
|122|tan lines|日晒线|
|123|tattoo|文身|
|124|tentacles|触手|
|125|text|文本|
|126|thighhighs|过膝袜|
|127|thong|丁字裤|
|128|topless|上身露出|
|129|torn clothes|破衣|
|130|towel|浴巾|
|131|transparent png|背景透明|
|132|trap|伪娘|
|133|umbrella|伞|
|134|uncensored|无码|
|135|underboob|南半球/下乳露出|
|136|undressing|脱衣|
|137|uniform|制服|
|138|vibrator|跳蛋|
|139|waitress|女侍|
|140|wallpaper|壁纸|
|141|weapon|武器|
|142|wedding dress|婚纱|
|143|wet|湿身|
|144|wet clothes|湿衣|
|145|wings|翅膀|
|146|witch|女巫|
|147|yaoi|蔷薇/男同|
|148|yukata|浴衣|
|149|yuri|百合|

[img-version]: https://img.shields.io/github/package-json/v/coderzhaoziwei/yande-re-chinese-patch?style=flat-square
[img-license]: https://shields.io/badge/license-MIT-blue?style=flat-square
[img-stars]: https://img.shields.io/github/stars/coderzhaoziwei/yande-re-chinese-patch?label=star&style=social
[img-cover]: https://cdn.jsdelivr.net/gh/coderzhaoziwei/yande-re-chinese-patch/preview.png
