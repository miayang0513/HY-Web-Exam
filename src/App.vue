<template>
  <video-player
    id="video-player"
    class="w-screen h-full object-cover"
    :sources="sources"
    :options="playerOptions"
    :height="playerOptions.height"
    @mounted="handleMounted"
  >
  </video-player>
  <button @click="next">Next</button>
</template>

<script setup lang="ts">
// import axios from '@/api'
// axios.get('/for_you_list')
import { ref, computed } from 'vue'
import { VideoJsPlayer } from 'video.js'
import { VideoPlayerProps, VideoPlayerState } from '@videojs-player/vue'

const videos = [
  'http://192.168.1.214:3000/media/Rolls_Royce_Ghost.m3u8',
  'http://192.168.1.214:3000/media/Toyota_Camry_XV70.m3u8',
  'http://192.168.1.214:3000/media/Volkswagen_Golf_7.m3u8',
  // 'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8',
]
const currentVideoIndex = ref(0)

const playerOptions = ref<VideoPlayerProps>({
  loop: true,
  autoplay: true,
  muted: true,
  playsinline: true,
  height: 869,
})

const sources = computed(() => [
  {
    type: 'application/x-mpegURL',
    src: videos[currentVideoIndex.value],
  },
])

const player = ref<VideoJsPlayer>()
const state = ref<VideoPlayerState>()
const handleMounted = async (payload: any) => {
  player.value = payload.player
  state.value = payload.state
}

const next = () => {
  currentVideoIndex.value++
}

/**
 * 因為在手機版的 Chrome 和 Safari 上下會有 Address 等原生介面佔據空間，
 * 所以無法直接使用 100vh 來設定介面的高度
 *
 * 參考：https://dev.to/nirazanbasnet/dont-use-100vh-for-mobile-responsive-3o97
 */
const documentHeight = () => {
  const doc = document.documentElement
  doc.style.setProperty('--doc-height', `${window.innerHeight}px`)
}
window.addEventListener('resize', documentHeight)
documentHeight()
</script>

<style>
:root {
  --doc-height: 100%;
}

html,
body,
#app {
  padding: 0;
  margin: 0;
  height: 100vh; /* fallback for Js load */
  height: var(--doc-height);
}

#video-player > video {
  object-fit: cover;
}
</style>
