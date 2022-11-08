import Post from "./post"

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
      const width = parseInt(Math.min(this.innerWidth * 0.9, this.imageSelected.sampleWidth))
      const height = Math.min(this.innerHeight * 0.9, this.imageSelected.sampleHeight)
      const width2 = parseInt(height * this.imageSelected.aspectRatio)
      return Math.min(width, width2)
    },
    imageSelectedHeight() {
      const width = Math.min(this.innerWidth * 0.9, this.imageSelected.sampleWidth)
      const height = parseInt(Math.min(this.innerHeight * 0.9, this.imageSelected.sampleHeight))
      const height2 = parseInt(width / this.imageSelected.aspectRatio)
      return Math.min(height, height2)
    },
  },
  watch: {
    showRatingQ(value) {
      localStorage.setItem("showRatingQ", JSON.stringify(value))
    },
    showRatingE(value) {
      localStorage.setItem("showRatingE", JSON.stringify(value))
    },
    imageCountInRow(value) {
      localStorage.setItem("imageCountInRow", JSON.stringify(value))
    },
    imageQualityHigh(value) {
      localStorage.setItem("imageQualityHigh", JSON.stringify(value))
    },
    showFavoriteSuccess(value) {
      console.log('showFavoriteSuccess: ', value)
    },
    showImageSelected(value) {
      if (!value) {
        this.imageSelectedDetail = {}
        return
      }
      this.getPostDetail(this.imageSelected.id).then(res => {
        if (!res) return
        this.imageSelectedDetail = res
      })
    }
  },
  methods: {
    async request() {
      this.requestState = true
      const url = location.origin + location.pathname + ".json?" + this.params.toString()
      const response = await new Promise(resolve => {
        console.log(url)
        jQuery.get(url, data => resolve(data))
      })
      if (response instanceof Array && response.length > 0) {
        window.history.pushState("", "", location.pathname + "?" + this.params.toString())
        response.forEach(item => this.imageList.push(new Post(item)))
        const page = Number(this.params.get("page")) || 1
        this.params.set("page", page + 1)
        // 延迟
        setTimeout(() => (this.requestState = false), 1000)
      } else {
        this.requestStop = true
      }
    },
    download(src, filename) {
      // 添加文件后缀
      const match = src.match(/[.](?<extension>png|jpg|jpeg)$/)
      if (match) {
        const extension = match.groups.extension
        GM_download(src, filename + "." + extension)
      } else {
        GM_download(src, filename)
      }
    },
    // 添加收藏
    onFavorite(id) {
      $.ajax({
        method: 'POST',
        url: "https://yande.re/post/vote.json",
        beforeSend: xhr => xhr.setRequestHeader('x-csrf-token', window.csrfToken),
        data: { id, score: 3 },
        success: data => {
          if (data.success === true) {
            this.imageList[this.imageSelectedIndex].favorite = true // 更新收藏状态
            this.imageSelectedDetail.favorite = true
          }
        },
      })
    },
    async getPostDetail(id) {
      try {
        if (!id) return
        const response = await fetch(`/post.json?api_version=2&tags=id:${id}&include_tags=1&include_votes=1`)
        const result = await response.json()
        return {
          favorite: result.votes[id] == 3,
          artist: Object.keys(result.tags).find(k => result.tags[k] == 'artist')
        }
      } catch (error) {
        console.log('getPostDetail error:', error)
      }
    }
  },
  mounted() {
    // 自动加载数据
    const timeInterval = setInterval(() => {
      if (this.requestStop === true) {
        clearInterval(timeInterval)
        return
      }
      const scrollTop = document.documentElement.scrollTop
      const scrollHeight = document.documentElement.scrollHeight
      const height = window.innerHeight
      if (scrollTop + height >= scrollHeight * 0.75) {
        if (this.requestState === false) {
          this.request()
        }
      }
    }, 1000)
    // 记录窗口尺寸
    window.addEventListener("resize", () => {
      this.innerWidth = window.innerWidth
      this.innerHeight = window.innerHeight
    })
  },
}

export default App
