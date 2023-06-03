import { createApp } from 'vue'
import VueVideoPlayer from '@videojs-player/vue'
import 'video.js/dist/video-js.css'
import './style.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router).use(VueVideoPlayer).mount('#app')
