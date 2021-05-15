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

      params: new URLSearchParams(location.search),
      requestState: false,

      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,
    }
  },
  computed: {
    title() {
      return `共 ${this.imageList.length} 幅作品正在展示${this.requestState ? "（加载中...）" : ""}`
    },
    version() {
      return GM_info.script.version
    },
    imageSelected() {
      return this.imageList[this.imageSelectedIndex] || new Post()
    },
    imageSelectedWidth() {
      const width = parseInt(Math.min(this.innerWidth*0.9, this.imageSelected.width))
      const height = Math.min(this.innerHeight*0.9, this.imageSelected.height)
      const width2 = parseInt(height * this.imageSelected.aspectRatio)
      return Math.min(width, width2)
    },
    imageSelectedHeight() {
      const width = Math.min(this.innerWidth*0.9, this.imageSelected.width)
      const height = parseInt(Math.min(this.innerHeight*0.9, this.imageSelected.height))
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
  },
  methods: {
    async request() {
      this.requestState = true

      const url = location.origin + location.pathname + ".json?" + this.params.toString()

      const response = await new Promise(resolve => {
        console.log(url)
        jQuery.get(url, data => resolve(data))
      })
      if (response instanceof Array) {
        response.forEach(item => this.imageList.push(new Post(item)))
        const page = Number(this.params.get("page")) || 1
        this.params.set("page", page + 1)
      }
      // 延迟
      setTimeout(() => (this.requestState = false), 1000)
    },
    download(url, filename) {
      console.log(url)

      jQuery.ajax({
        url,
        xhrFields:{ responseType: 'blob' },
        success(data) {
          const element = document.createElement("a")
          element.href = URL.createObjectURL(data)
          element.download = filename
          const event = new MouseEvent('click')
          element.dispatchEvent(event)
        },
      })
    },
  },
  mounted() {
    // 自动加载数据
    setInterval(() => {
      const scrollTop = document.documentElement.scrollTop
      const scrollHeight = document.documentElement.scrollHeight
      const height = window.innerHeight
      if (scrollTop + height >= scrollHeight * 0.5) {
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
