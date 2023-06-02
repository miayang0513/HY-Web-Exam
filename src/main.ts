import { createApp } from 'vue'
import VueVideoPlayer from '@videojs-player/vue'
import 'video.js/dist/video-js.css'
import './style.css'
import App from './App.vue'

const app = createApp(App)

app.use(VueVideoPlayer).mount('#app')
