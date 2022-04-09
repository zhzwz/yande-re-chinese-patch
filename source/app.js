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
      requestStop: false,

      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,

      // :cols="{ default: 16, 2100: 14, 1800: 12, 1500: 10, 1200: 8, 900: 6, 600: 4, 300: 2 }"
      columnCount: {
        300: 1,
        450: 2,
        600: 3,
        750: 4,
        900: 5,
        1050: 6,
        1200: 7,
        1350: 8,
        1500: 9,
        1650: 10,
        1800: 11,
        1950: 12,
        2100: 13,
        2250: 14,
        2400: 15,
        2550: 16,
        2700: 17,
        2850: 18,
        3000: 19,
        default: 20,
      },
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
      console.log(src)

      window.open(src)

      // 由于跨域的问题，这个方法行不通了。
      // jQuery.ajax({
      //   url,
      //   xhrFields:{
      //     responseType: "blob",
      //   },
      //   success(data) {
      //     const element = document.createElement("a")
      //     element.href = URL.createObjectURL(data)
      //     element.download = filename
      //     const event = new MouseEvent("click")
      //     element.dispatchEvent(event)
      //   },
      // })

      // 试了这个方法也不行啊，还是会有 files.yande.re 的跨域问题
      // const image = new Image()
      // image.crossOrigin = "Anonymous"
      // image.onload = () => {
      //   const canvas = document.createElement("canvas")
      //   canvas.width = image.width
      //   canvas.height = image.height
      //   const context = canvas.getContext("2d")
      //   context.drawImage(image, 0, 0, image.width, image.height)
      //   canvas.toBlob(blob => {
      //     console.log(blob)
      //   })
      //   const url = canvas.toDataURL("image/png") // base64 图片
      //   const a = document.createElement("a")
      //   const event = new MouseEvent("click")
      //   a.download = filename || "qrcode.jpg"
      //   a.href = url
      //   a.dispatchEvent(event)
      // }
      // image.src = src

      // fetch(src, {
      //   method: "GET",
      //   mode: "no-cors", // 请求模式 cors / no-cors / same-origin
      //   referrer: "https://yande.re/",
      //   referrerPolicy: "no-referrer",
      // }).then(response => {
      //   console.log(response)
      //   return response.blob()
      // }).then(blob => {
      //   const url = URL.createObjectURL(blob)
      //   console.log(url)
      // })
    },
    // play() {
    //   this.imageSelectedIndex ++
    // },
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
