/*

approver_id: null
change: 4106973
frames: []
frames_pending: []
frames_pending_string: ""
frames_string: ""
has_children: false
is_held: false
is_note_locked: false
is_pending: false
is_rating_locked: false
is_shown_in_index: true
last_commented_at: 0
last_noted_at: 0
parent_id: null
status: "active"
*/

export default class Post {
  constructor(data) {
    if (typeof data !== "object") data = {}
    this.id = data.id || 0
    this.score = data.score || 0
    this.tags = data.tags || ""
    this.source = data.source || ""

    this.author = data.author || ""
    this.creatorId = data.creator_id || 0
    this.createdAt = data.created_at || 0
    this.updatedAt = data.updated_at || 0

    this.rating = data.rating || "s"
    // 文件
    this.fileUrl = data.file_url || ""
    this.fileExt = data.file_ext || ""
    this.fileSize = data.file_size || 0
    this.width = data.width || 0
    this.height = data.height || 0
    // 高清图
    this.jpegUrl = data.jpeg_url || ""
    this.jpegSize = data.jpeg_file_size || 0
    this.jpegWidth = data.jpeg_width || 0
    this.jpegHeight = data.jpeg_height || 0
    // 缩略图
    this.sampleUrl = data.sample_url
    this.sampleSize = data.sample_file_size || 0
    this.sampleWidth = data.sample_width || 0
    this.sampleHeight = data.sample_height || 0
    // 预览图 用作懒加载的占位图
    this.previewUrl = data.preview_url
    this.previewWidth = data.actual_preview_width || 0
    this.previewHeight = data.actual_preview_height || 0
  }
  // 全年龄 safe
  get isRatingS() {
    return this.rating === "s"
  }
  // 擦边球 questionable
  get isRatingQ() {
    return this.rating === "q"
  }
  // 成人向 explicit
  get isRatingE() {
    return this.rating === "e"
  }
  // 长宽比
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
    const date = new Date(this.createdAt * 1000)
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString("en-DE")}`
  }
  get updatedTime() {
    const date = new Date(this.updatedAt * 1000)
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString("en-DE")}`
  }

  // 解析图源 i.pximg.net => pixiv.net
  // https://i.pximg.net/img-original/img/2021/05/15/09/41/42/89846615_p0.jpg
  // https://www.pixiv.net/artworks/89846615
  get sourceUrl() {
    if (/^https:\/\/i\.pximg\.net\/img-original\/img\/[\d\/]{19}\/([\d]{1,})_p[\d]{1,}\.(jpg|png)$/.test(this.source)) {
      const pid = RegExp.$1
      return `https://pixiv.net/artworks/${pid}`
    }
    return this.source
  }
}
