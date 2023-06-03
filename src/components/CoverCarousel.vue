<template>
  <div class="overflow-hidden" :style="{ height: mainHeight + 'px' }">
    <div
      class="h-full"
      :style="{
        transform: `translate3d(0px, ${currentY}px, 0px)`,
      }"
      @touchstart="onTouchStart"
      @touchmove.prevent="onTouchMove"
      @touchend="onTouchEnd"
    >
      <div v-for="cover in coverList" :key="cover" class="w-screen" :style="{ height: mainHeight + 'px' }">
        <img :src="cover" class="w-full h-full object-cover" :class="{ hidden: !isSwiping }" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref, inject } from 'vue'

const props = defineProps<{
  currentIndex: number
  coverList: string[]
}>()

const emit = defineEmits<{
  (e: 'update:currentIndex', index: number): void
}>()

const mainHeight = inject<Ref<number>>('mainHeight', ref(896))
const isSwiping = ref(false)

defineExpose({
  isSwiping,
})

const startY = ref<number | null>(null)
const tempY = ref<number | null>(null)
const currentY = ref(0)

const onTouchStart = (event: TouchEvent) => {
  const touch = event.touches[0]
  startY.value = touch.clientY
  tempY.value = touch.clientY
}

const onTouchMove = (event: TouchEvent) => {
  isSwiping.value = true
  if (!startY.value || !tempY.value) return

  const { currentIndex, coverList } = props
  const touch = event.touches[0]
  const deltaY = touch.clientY - startY.value

  // 在第一支影片的時候無法在向下滑動切換到上一支
  if (deltaY > 0 && currentIndex === 0) return

  // 在最後一支影片的時候無法在向上滑動切換到下一支
  if (deltaY < 0 && currentIndex === coverList.length - 1) return

  tempY.value = touch.clientY
  currentY.value = deltaY - currentIndex * mainHeight.value
}

const onTouchEnd = () => {
  isSwiping.value = false
  if (!startY.value || !tempY.value) return

  const deltaY = tempY.value - startY.value
  if (deltaY === 0) {
    // 已在第一支或最後一支影片，因此在 onTouchMove 中直接 return，故 deltaY 為 0
    return
  }

  const halfScreenHeight = mainHeight.value / 2
  let currentIndex = props.currentIndex

  if (deltaY > 0 && Math.abs(deltaY) >= halfScreenHeight) {
    // 向下且過半，切到上一個
    currentIndex--
  } else if (deltaY < 0 && Math.abs(deltaY) >= halfScreenHeight) {
    // 向上且過半，切到下一個
    currentIndex++
  }

  currentY.value = -(currentIndex * mainHeight.value)
  emit('update:currentIndex', currentIndex)

  startY.value = null
  tempY.value = null
}
</script>
