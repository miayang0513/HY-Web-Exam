<template>
  <div id="teleport-point" class="relative">
    <video-player
      ref="refVideoPlayer"
      id="video-player"
      class="absolute z-video-player top-0 left-0 w-screen h-full"
      :sources="sources"
      muted
      loop
      autoplay
      playsInline
      @mounted="handleMounted"
      @play="hasEverPlayed = true"
    >
      <template v-slot="{ player, state }: { player: VideoJsPlayer, state: VideoPlayerState }">
        <div class="absolute z-marquee bottom-5 w-1/2 overflow-hidden">
          <div class="whitespace-nowrap flex items-center gap-x-2 animation-marquee">
            <span v-for=" in 10">{{ videoList[currentIndex].title }}</span>
          </div>
        </div>
        <!--
          最新的 state 需要透過 template slot 的方式取得，但如果寫在這 DOM 的層級就會小於 video-player
          所以為了讓以下的內容可以優先被被點擊到，利用 teleport 的方式將內容傳到與 video-player 同層的位置
        -->
        <teleport v-if="state.readyState !== 0" to="#teleport-point">
          <cover-carousel
            ref="refCoverCarousel"
            class="relative z-cover-carousel"
            v-model:currentIndex="currentIndex"
            :coverList="coverList"
            @click="coverCarouselClickHandler(state)"
          />
          <progress-bar
            v-show="!isSwiping"
            class="absolute z-progress-bar bottom-0 left-1/2 transform -translate-x-1/2"
            :player="player"
            :state="state"
          />
          <font-awesome-icon
            icon="fa-solid fa-share"
            class="absolute bottom-8 z-progress-bar right-4 w-6 h-6 text-white"
            @click="isShowSharePanel = true"
          />
          <font-awesome-icon
            v-if="hasEverPlayed && !state.playing"
            icon="fa-solid fa-play"
            class="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 text-white w-16 h-16"
          />
          <button v-if="state.muted" class="absolute px-4 py-2 rounded bg-white left-5 top-20 shadow-lg">
            <font-awesome-icon icon="fa-solid fa-volume-xmark" class="text-black" />
            Unmute
          </button>
        </teleport>
        <teleport to="#app">
          <share-panel
            v-if="isShowSharePanel"
            :video="videoList[currentIndex]"
            @collapse="isShowSharePanel = false"
          ></share-panel>
        </teleport>
      </template>
    </video-player>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onActivated, onMounted } from 'vue'
import { VideoJsPlayer } from 'video.js'
import { VideoPlayer, VideoPlayerState } from '@videojs-player/vue'
import CoverCarousel from '@/components/CoverCarousel.vue'
import ProgressBar from '@/components/ProgressBar.vue'
import SharePanel from '@/components/SharePanel.vue'

export interface Video {
  title: string
  cover: string
  play_url: string
}

const props = defineProps<{
  videoList: Video[]
}>()

const coverList = computed(() => props.videoList.map((video) => video.cover))

const currentIndex = ref(0)
const sources = computed(() => [
  {
    type: 'application/x-mpegURL',
    src: props.videoList[currentIndex.value].play_url,
  },
])

const player = ref<VideoJsPlayer>()
const hasEverPlayed = ref(false)
const handleMounted = async (payload: any) => {
  player.value = payload.player
}

const refCoverCarousel = ref<typeof CoverCarousel>()
const isSwiping = computed<boolean>(() => refCoverCarousel.value?.isSwiping || false)
const coverCarouselClickHandler = (state: VideoPlayerState) => {
  if (state.muted) {
    player.value?.muted(false)
    return
  }

  state.playing ? player.value?.pause() : player.value?.play()
}

const refVideoPlayer = ref<typeof VideoPlayer>()

onMounted(() => {
  setTimeout(() => {
    /**
     * @magic 待釐清
     * Object-fit: fill does not work on safari for autoplay videos
     * 延遲設定即可解決，為了以防萬一底下 css 有預設 object-fit: cover
     */
    refVideoPlayer.value && (refVideoPlayer.value.$el.querySelector('video').style.objectFit = 'fill')
  }, 100)
})

onActivated(() => {
  // 在 onMounted 的時候也會被呼叫，所以要確保 player.value 有值 (表示 handleMounted 被呼叫過) 之後才去執行 play()
  player.value && player.value.play()
})

const isShowSharePanel = ref(false)
</script>

<style>
#video-player > video {
  @apply object-cover;
}

.animation-marquee {
  animation: marquee 4s linear infinite;
}

@keyframes marquee {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
}
</style>
