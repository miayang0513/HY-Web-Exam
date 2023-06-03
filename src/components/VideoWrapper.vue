<template>
  <div id="teleport-point" class="relative">
    <cover-carousel
      ref="refCoverCarousel"
      v-if="coverList.length > 0"
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
      <template v-slot="{ player, state }: { player: VideoJsPlayer, state: VideoPlayerState }">
        <!--
          最新的 state 需要透過 template slot 的方式取得，但 DOM 的層級就會小於 cover-carousel，
          不管怎麼設 z-index 都無用，因為 video-player 本身就小於 cover-carousel 了 (z-0 < z-10)，
          所以為了讓 progress-bar 可被點擊到，利用 teleport 的方式將 progress-bar 傳到與 cover-carousel 同層的位置
        -->
        <teleport v-if="state.readyState !== 0" to="#teleport-point">
          <progress-bar
            v-show="!isSwiping"
            class="z-30 absolute bottom-0 left-1/2 transform -translate-x-1/2"
            :player="player"
            :state="state"
          />
        </teleport>
      </template>
    </video-player>
    <button
      v-if="config.muted"
      class="absolute z-20 px-4 py-2 rounded bg-white left-5 top-20 shadow-lg"
      @click="toggleMuted"
    >
      Unmute
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, inject, computed, Ref, onActivated } from 'vue'
import { VideoJsPlayer } from 'video.js'
import { VideoPlayerProps, VideoPlayerState } from '@videojs-player/vue'
import CoverCarousel from '@/components/CoverCarousel.vue'
import ProgressBar from '@/components/ProgressBar.vue'

export interface Video {
  title: string
  cover: string
  play_url: string
}

const props = defineProps<{
  videoList: Video[]
}>()

const appHeight = inject<Ref<number>>('appHeight', ref(896))

const coverList = computed(() => props.videoList?.map((video) => video.cover) || [])

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
    src: props.videoList
      ? props.videoList[currentIndex.value].play_url
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

const refCoverCarousel = ref<typeof CoverCarousel>()
const isSwiping = computed(() => refCoverCarousel.value?.isSwiping || false)

onActivated(() => {
  // 在 onMounted 的時候也會被呼叫，所以要確保 player.value 有值 (表示 handleMounted 被呼叫過) 之後才去執行 play()
  player.value && player.value.play()
})
</script>

<style>
#video-player > video {
  @apply object-cover;
}
</style>
