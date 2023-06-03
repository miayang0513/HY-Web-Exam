<template>
  <div v-if="!isLoading" class="relative">
    <cover-carousel
      class="relative z-10"
      :height="appHeight"
      v-model:currentIndex="currentIndex"
      :coverList="coverList"
    />
    <video-player
      id="video-player"
      class="absolute z-0 top-0 left-0 w-screen"
      :sources="sources"
      :muted="config.muted"
      :height="appHeight"
      :loop="config.loop"
      :autoplay="config.autoplay"
      :playsinline="config.playsinline"
      @mounted="handleMounted"
    >
    </video-player>
    <button
      v-if="config.muted"
      class="absolute z-20 px-4 py-2 rounded bg-white left-5 top-20"
      @click="toggleMuted"
    >
      Unmute
    </button>
  </div>
</template>

<script setup lang="ts">
import axios from '@/api'
import { ref, computed, onBeforeMount } from 'vue'
import { VideoJsPlayer } from 'video.js'
import { VideoPlayerProps, VideoPlayerState } from '@videojs-player/vue'
import CoverCarousel from '@/components/CoverCarousel.vue'

/**
 * 因為在手機版的 Chrome 和 Safari 上下會有 Address 等原生介面佔據空間，
 * 所以無法直接使用 100vh 來設定介面的高度
 *
 * 參考：https://dev.to/nirazanbasnet/dont-use-100vh-for-mobile-responsive-3o97
 */
const appHeight = ref(896) // iPhone XR Height
const documentHeight = () => {
  const doc = document.documentElement
  appHeight.value = window.innerHeight
  doc.style.setProperty('--doc-height', `${appHeight.value}px`)
}
window.addEventListener('resize', documentHeight)
documentHeight()

interface Video {
  title: string
  cover: string
  play_url: string
}

const isLoading = ref(false)
const videoList = ref<Video[]>()
const coverList = computed(() => videoList.value?.map((video) => video.cover))
onBeforeMount(async () => {
  isLoading.value = true
  /**
   * @todo: error handler
   */
  const { data } = await axios.get('/for_you_list')
  videoList.value = data.items
  isLoading.value = false
})

const config = ref<VideoPlayerProps>({
  loop: true,
  autoplay: true,
  muted: true,
  playsinline: true,
})

const currentIndex = ref(0)
const sources = computed(() => [
  /**
   * @todo: placeholder handler
   */
  {
    type: 'application/x-mpegURL',
    src: videoList.value
      ? videoList.value[currentIndex.value].play_url
      : 'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8',
  },
])

const player = ref<VideoJsPlayer>()
const state = ref<VideoPlayerState>()
const handleMounted = async (payload: any) => {
  player.value = payload.player
  state.value = payload.state
}

const toggleMuted = () => {
  config.value.muted = !config.value.muted
}
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
