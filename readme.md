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

||English|简体中文|
|:-:|:-|:-|
|1|4koma|四格漫画|
|2|5-toubun no hanayome|五等分的新娘|
|3|anal|肛交|
|4|angel|天使|
|5|angel beats!|Angel Beats!|
|6|animal ears|兽耳|
|7|anthropomorphization|拟人化|
|8|anus|肛门露出|
|9|areola|乳晕|
|10|arknights|明日方舟|
|11|armor|盔甲/装甲|
|12|artist revision|画师修改|
|13|ass|臀部|
|14|ass grab|持股/捏臀|
|15|atelier|炼金工房系列|
|16|autographed|亲笔签名|
|17|azur lane|碧蓝航线|
|18|bakemonogatari|化物语|
|19|bandages|绷带|
|20|bandaid|创可贴/绷带|
|21|bang dream!|BanG Dream!|
|22|baseball|棒球|
|23|basketball|篮球|
|24|bathing|沐浴|
|25|benghuai xueyuan|崩坏学园|
|26|bike shorts|自行车短裤|
|27|bikini|比基尼|
|28|bikini armor|比基尼装甲/轻薄盔甲|
|29|bikini top|比基尼乳罩|
|30|black rock shooter|黑岩射手|
|31|blood|血腥|
|32|bloomers|灯笼裤/宽松短裤|
|33|blue archive|碧蓝档案|
|34|bodysuit|紧身衣裤|
|35|boku wa tomodachi ga sukunai|我的朋友很少|
|36|bondage|束缚|
|37|bottomless|下身露出|
|38|bra|乳罩|
|39|breast grab|握乳|
|40|breast hold|托乳|
|41|breasts|乳|
|42|bukkake|颜射|
|43|bunny ears|兔耳|
|44|bunny girl|兔女郎|
|45|buruma|运动短裤|
|46|business suit|西装/职业服|
|47|calendar|日历|
|48|cameltoe|阴户凸显|
|49|card|卡牌|
|50|card captor sakura|魔卡少女樱|
|51|censored|有码|
|52|cg|CG/计算机动画|
|53|chainsaw|电锯|
|54|character design|角色设计|
|55|cheerleader|啦啦队队员|
|56|chibi|Q版|
|57|chinadress|旗袍|
|58|choujigen game neptune|超次元游戏海王星|
|59|christmas|圣诞|
|60|cleavage|乳沟|
|61|code geass|反叛的鲁路修|
|62|condom|避孕套|
|63|corset|(束腰)紧身内衣|
|64|cosplay|角色扮演|
|65|cream|奶油|
|66|cropped|裁剪图|
|67|crossdress|变装|
|68|crossover|作品联动/混合同人|
|69|cum|精液|
|70|cunnilingus|品玉/舔阴|
|71|dakimakura|抱枕|
|72|darling in the franxx|DARLING in the FRANXX|
|73|date a live|约会大作战|
|74|detexted|去字图片|
|75|devil|魔鬼/恶魔|
|76|digital version|数字版|
|77|dildo|假阳具|
|78|disc cover|光盘封面|
|79|dress|连衣裙|
|80|dress shirt|衬衫|
|81|duplicate|重复图片|
|82|elf|精灵|
|83|endcard|片尾插图|
|84|erect nipples|乳尖|
|85|expression|角色展示/立绘|
|86|extreme content|极端|
|87|eyepatch|眼罩|
|88|fairy|精灵/小精灵|
|89|fate/kaleid liner prisma illya|Fate/kaleid liner 魔法少女☆伊莉雅|
|90|feet|足|
|91|fellatio|口交|
|92|final fantasy|最终幻想|
|93|final fantasy vii|最终幻想 VII|
|94|final fantasy xiv|最终幻想 14|
|95|fingering|指交|
|96|fire emblem|火焰纹章|
|97|fire emblem heroes|火焰之纹章：英雄云集|
|98|fire emblem kakusei|火焰之纹章：觉醒|
|99|fire emblem three houses|火焰之纹章：风花雪月|
|100|fishnets|鱼网袜|
|101|fixed|修改|
|102|footjob|足交|
|103|fundoshi|褌/兜裆布|
|104|futanari|扶她|
|105|game cg|游戏CG|
|106|gangbang|乱交|
|107|garter|袜带|
|108|garter belt|吊袜腰带|
|109|genderswap|性转|
|110|genshin impact|原神|
|111|girls frontline|少女前线|
|112|girls und panzer|少女与战车|
|113|gochuumon wa usagi desu ka?|请问您今天要来点兔子吗？|
|114|gothic lolita|哥特式洛丽塔|
|115|granblue fantasy|碧蓝幻想|
|116|guitar|吉他|
|117|gun|枪炮|
|118|gundam|高达|
|119|guro|猎奇|
|120|halloween|万圣节前夜|
|121|handjob|打手枪|
|122|headphones|耳机|
|123|heels|高跟鞋|
|124|heterochromia|虹膜异色|
|125|hibike! euphonium|吹响吧！上低音号|
|126|highschool dxd|恶魔高校D×D|
|127|honkai impact|崩坏 3|
|128|horns|角|
|129|index page|索引页面|
|130|infinite stratos|IS/无限斯特拉托斯|
|131|inumimi|犬耳|
|132|japanese clothes|日式服装|
|133|k-on!|轻音少女|
|134|kaguya-sama wa kokurasetai ~tensai-tachi no renai zunousen~|辉夜大小姐想让我告白～天才们的恋爱头脑战～|
|135|kantai collection|舰队 Collection|
|136|kemono friends|兽娘动物园|
|137|kimetsu no yaiba|鬼灭之刃|
|138|kimono|和服|
|139|kitsune|狐狸|
|140|kobayashi-san chi no maid dragon|小林家的龙女仆|
|141|kono subarashii sekai ni shukufuku wo!|为美好的世界献上祝福！|
|142|lactation|泌乳|
|143|landscape|风景画|
|144|league of legends|英雄联盟|
|145|leotard|紧身连衣裤|
|146|line art|线条画|
|147|lingerie|贴身内衣|
|148|little busters!|Little Busters!|
|149|loli|萝莉|
|150|lolita fashion|洛丽塔|
|151|love live! nijigasaki high school idol club|Love Live! 虹咲学园学园偶像同好会|
|152|lucky star|幸运星|
|153|maebari|前貼り/遮盖私处|
|154|mahou shoujo lyrical nanoha|魔法少女奈叶|
|155|mahou shoujo lyrical nanoha strikers|魔法少女奈叶 StrikerS|
|156|maid|女仆|
|157|male|男性|
|158|masturbation|自摸/手淫|
|159|mecha|机甲|
|160|mecha musume|机甲娘|
|161|megane|眼镜|
|162|megaten|女神转生系列|
|163|mermaid|美人鱼|
|164|miko|巫女|
|165|monochrome|单色|
|166|monster|怪物|
|167|monster girl|怪物女孩|
|168|monster musume no iru nichijou|魔物娘的相伴日常|
|169|naked|裸体|
|170|naked apron|裸体围裙|
|171|naked cape|裸体披风|
|172|naked ribbon|裸体丝带|
|173|neko|猫|
|174|nekomimi|猫耳|
|175|neon genesis evangelion|新世纪福音战士|
|176|nier automata|尼尔：自动人形|
|177|nijisanji|彩虹社|
|178|ninja|忍者|
|179|nipple slip|露点|
|180|nipples|乳头|
|181|no bra|无乳罩|
|182|nopan|无胖次|
|183|nun|修女|
|184|nurse|护士|
|185|official watermark|官方水印|
|186|onsen|温泉|
|187|open shirt|衬衫敞开|
|188|ore no imouto ga konnani kawaii wake ga nai|我的妹妹哪有这么可爱！|
|189|overalls|工装连衣裤|
|190|overwatch|守望先锋|
|191|paizuri|乳交|
|192|pajama|睡衣|
|193|panties|内裤|
|194|pantsu|胖次|
|195|panty pull|胖次脱下|
|196|pantyhose|吊带袜|
|197|parody|仿拟/谐拟|
|198|partial scan|局部扫描|
|199|pasties|乳贴|
|200|pee|尿尿|
|201|penguin|企鹅|
|202|penis|阴茎|
|203|photo|照片/现实背景|
|204|photoshop|PS 改图|
|205|pirate|海盗|
|206|pointy ears|尖耳朵|
|207|pokemon|精灵宝可梦|
|208|possible duplicate|可能重复|
|209|pregnant|孕妇|
|210|pretty cure|光之美少女|
|211|princess connect|公主连结|
|212|princess connect! re:dive|公主连结 Re:Dive|
|213|profile page|角色资料页|
|214|pubic hair|阴毛|
|215|puella magi madoka magica|魔法少女小圆|
|216|pussy|阴户|
|217|pussy juice|妹汁|
|218|queen's blade|女王之刃|
|219|raw scan|扫描原图|
|220|re zero kara hajimeru isekai seikatsu|Re:从零开始的异世界生活|
|221|robe|长袍/礼服/睡袍|
|222|saenai heroine no sodatekata|路人女主的养成方法|
|223|sailor moon|美少女战士|
|224|sake|日本清酒|
|225|sample|样品图|
|226|sarashi|晒し/缠胸布|
|227|school swimsuit|学校泳衣|
|228|see through|透视|
|229|seifuku|制服|
|230|selfie|自拍|
|231|senran kagura|闪乱神乐|
|232|sex|性交|
|233|sheets|床单|
|234|shimapan|条纹胖次|
|235|shirt lift|衬衫掀起|
|236|shota|正太|
|237|silhouette|剪影/暗色轮廓/体形|
|238|sketch|素描|
|239|skirt lift|裙摆掀起|
|240|sling bikini|吊带比基尼|
|241|smoking|吸烟|
|242|soccer|足球|
|243|sono bisque doll wa koi wo suru|更衣人偶坠入爱河|
|244|spy x family|间谍过家家|
|245|ssss.gridman|SSSS.古立特|
|246|stick poster|海报|
|247|stockings|长筒袜|
|248|strike witches|强袭魔女|
|249|string panties|细绳胖次|
|250|summer dress|夏装|
|251|suzumiya haruhi no yuuutsu|凉宫春日的忧郁|
|252|sweater|毛衣|
|253|swimsuits|泳衣|
|254|sword|刀剑|
|255|sword art online|刀剑神域|
|256|symmetrical docking|乳乳相接|
|257|tagme|标签|
|258|tail|兽尾|
|259|tan lines|日晒线|
|260|tattoo|文身|
|261|tennis|网球|
|262|tentacles|触手|
|263|text|文本|
|264|the idolm@ster|偶像大师|
|265|the idolm@ster cinderella girls|偶像大师灰姑娘女孩|
|266|the idolm@ster million live!|偶像大师百万现场|
|267|the idolm@ster shiny colors|偶像大师闪耀色彩|
|268|thighhighs|过膝袜|
|269|thong|丁字裤|
|270|to aru kagaku no railgun|某科学的超电磁炮|
|271|to aru majutsu no index|魔法禁书目录|
|272|to heart (series)|To Heart 系列|
|273|to heart 2|To Heart 2|
|274|to love ru|出包王女|
|275|to love ru darkness|出包王女 Darkness|
|276|topless|上身露出|
|277|torn clothes|破衣|
|278|touhou|东方|
|279|towel|浴巾|
|280|translated|文字已翻译(英文)|
|281|transparent png|背景透明|
|282|trap|伪娘|
|283|tribadism|磨豆腐/交叉体位|
|284|tutorial|教程|
|285|uma musume pretty derby|赛马娘|
|286|umbrella|伞|
|287|uncensored|无码|
|288|underboob|南半球|
|289|underwear|内衣|
|290|undressing|脱衣|
|291|uniform|制服|
|292|valentine|情人节|
|293|vibrator|跳蛋|
|294|wa maid|和风女仆|
|295|waitress|女侍|
|296|wallpaper|壁纸|
|297|wardrobe malfunction|走光|
|298|weapon|武器|
|299|wedding dress|婚纱|
|300|wet|湿身|
|301|wet clothes|湿衣|
|302|wings|翅膀|
|303|witch|女巫|
|304|xenoblade|异度神剑|
|305|xenoblade chronicles 2|异度神剑 2|
|306|yahari ore no seishun lovecome wa machigatteiru.|我的青春恋爱喜剧果然有问题|
|307|yaoi|蔷薇/男同|
|308|yukata|浴衣|
|309|yuri|百合|
|310|zhanjianshaonv|战舰少女|

[img-version]: https://img.shields.io/github/package-json/v/coderzhaoziwei/yande-re-chinese-patch?style=flat-square
[img-license]: https://shields.io/badge/license-MIT-blue?style=flat-square
[img-stars]: https://img.shields.io/github/stars/coderzhaoziwei/yande-re-chinese-patch?label=star&style=social
[img-cover]: https://cdn.jsdelivr.net/gh/coderzhaoziwei/yande-re-chinese-patch/preview.png
