import { createApp } from 'vue'
import App from './components/App.vue'
import router from './router'
import pinia from './stores'

import 'uno.css'

document.body.insertAdjacentHTML('afterbegin', '<div id="app"></div>')

const app = createApp(App)
app.use(router)
app.use(pinia)
app.mount('#app')
