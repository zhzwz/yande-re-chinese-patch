import app from "./app"

export async function enterBrowseMode() {
  function getScript(url) {
    return new Promise(resolve => jQuery.getScript(url, () => resolve()))
  }

  await getScript("https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.min.js")
  await getScript("https://cdn.jsdelivr.net/npm/vuetify@2.5.0/dist/vuetify.min.js")
  await getScript("https://cdn.jsdelivr.net/npm/vue-masonry-css@1.0.3/dist/vue-masonry.min.js")
  await getScript("https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js")

  document.head.innerHTML = `[{ path: "source/html/head.html" }]`
  document.body.innerHTML = `[{ path: "source/html/body.html" }]`

  Vue.use(VueMasonry)

  new Vue({
    vuetify: new Vuetify({
      theme: { dark: true },
    }),
    render: h => h(app)
  }).$mount("#app")
}
