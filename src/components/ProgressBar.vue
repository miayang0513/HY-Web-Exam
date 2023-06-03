<template>
  <div class="w-full h-6 flex items-end">
    <slider
      v-if="duration !== 0"
      :modelValue="state.currentTime"
      :step="1"
      lazy
      :handleScale="2"
      tooltip
      tooltipText="0:%v"
      :max="duration"
      @dragStart="dragStart"
      @dragEnd="dragEnd"
    />
  </div>
</template>

<script setup lang="ts">
import slider from 'vue3-slider'
import { computed, toRefs } from 'vue'
import { VideoJsPlayer } from 'video.js'
import { VideoPlayerState } from '@videojs-player/vue'

const props = defineProps<{
  player: VideoJsPlayer
  state: VideoPlayerState
}>()

const { player, state } = toRefs(props)

/**
 * Video player 載入影片時需要處理時間，因此在一開始的時候並不會所有屬性都有期望的值
 * 參考：Videojs-Player 作者 example 的 source code 處理方式
 * https://github.com/surmon-china/surmon-china.github.io/blob/source/examples/videojs-player/01-advanced-player/advanced.vue
 */

const duration = computed(() => {
  const duration = props.state.duration
  if (!duration || isNaN(duration) || duration === Infinity) {
    return 0
  } else {
    return duration
  }
})

const dragStart = () => {
  player.value.pause()
}

const dragEnd = (value: number) => {
  player.value.currentTime(value)
  player.value.play()
}
</script>
