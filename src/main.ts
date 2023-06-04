import { createApp } from 'vue'
import VueVideoPlayer from '@videojs-player/vue'
import 'video.js/dist/video-js.css'
import './style.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPlay, faVolumeXmark, faShare, faLink, faXmark } from '@fortawesome/free-solid-svg-icons'

library.add(faPlay, faVolumeXmark, faShare, faLink, faXmark)

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.config.errorHandler = () => {
  router.push('/')
}

app.component('font-awesome-icon', FontAwesomeIcon).use(router).use(VueVideoPlayer).mount('#app')
