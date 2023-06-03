<template>
  <div class="overflow-hidden" :style="{ height: height + 'px' }">
    <div
      class="h-full"
      :style="{
        transform: `translate3d(0px, ${currentY}px, 0px)`,
      }"
      @touchstart="onTouchStart"
      @touchmove.prevent="onTouchMove"
      @touchend="onTouchEnd"
    >
      <div
        class="w-screen border-8 border-red-600"
        :style="{ height: height + 'px' }"
      >
        1
      </div>
      <div
        class="w-screen border-8 border-red-600"
        :style="{ height: height + 'px' }"
      >
        2
      </div>
      <div
        class="w-screen border-8 border-red-600"
        :style="{ height: height + 'px' }"
      >
        3
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  currentIndex: number
  coverList: string[] | undefined
  height: number
}>()

const emit = defineEmits<{
  (e: 'update:currentIndex', index: number): void
}>()

const startY = ref<number | null>(null)
const tempY = ref<number | null>(null)
const currentY = ref(0)

const onTouchStart = (event: TouchEvent) => {
  const touch = event.touches[0]
  startY.value = touch.clientY
  tempY.value = touch.clientY
}

const onTouchMove = (event: TouchEvent) => {
  if (!startY.value || !tempY.value) return

  const { currentIndex, coverList, height } = props
  const touch = event.touches[0]
  const deltaY = touch.clientY - startY.value

  // 在第一支影片的時候無法在向下滑動切換到上一支
  if (deltaY > 0 && currentIndex === 0) return

  // 在最後一支影片的時候無法在向上滑動切換到下一支
  if (deltaY < 0 && currentIndex === coverList.length - 1) return

  tempY.value = touch.clientY
  currentY.value = deltaY - currentIndex * height
}

const onTouchEnd = () => {
  if (!startY.value || !tempY.value) return

  const deltaY = tempY.value - startY.value
  if (deltaY === 0) {
    // 已在第一支或最後一支影片，因此在 onTouchMove 中直接 return，故 deltaY 為 0
    return
  }

  const halfScreenHeight = props.height / 2
  let currentIndex = props.currentIndex

  if (deltaY > 0 && Math.abs(deltaY) >= halfScreenHeight) {
    // 向下且過半，切到上一個
    currentIndex--
  } else if (deltaY < 0 && Math.abs(deltaY) >= halfScreenHeight) {
    // 向上且過半，切到下一個
    currentIndex++
  }

  currentY.value = -(currentIndex * props.height)
  emit('update:currentIndex', currentIndex)

  startY.value = null
  tempY.value = null
}
</script>
