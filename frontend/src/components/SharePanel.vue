<template>
  <div class="fixed z-[60] w-screen h-full top-0 left-0 bg-black/20 flex items-end" @click.stop="collapse">
    <transition @after-leave="emit('collapse')">
      <div
        v-if="isShow"
        class="w-screen h-24 bg-white rounded-t-2xl relative flex justify-center items-center px-6 gap-x-4"
        @click.stop
      >
        <font-awesome-icon icon="fa-solid fa-xmark" class="absolute top-3 right-4 text-black" @click.stop="collapse" />
        <button class="flex flex-col items-center gap-y-1.5" @click="copyText">
          <div
            class="w-10 h-10 flex items-center justify-center rounded-full outline-none bg-indigo-400 border-none border-transparent"
          >
            <font-awesome-icon icon="fa-solid fa-link" class="text-white" />
          </div>
          <p class="text-xs scale-90">複製連結</p>
        </button>
        <button class="flex flex-col items-center gap-y-1.5" @click="share(SHARE_TYPE.TWITTER)">
          <div class="w-10 h-10 rounded-full overflow-hidden outline-none border-none border-transparent">
            <img src="@/assets/twitter.png" />
          </div>
          <p class="text-xs scale-90">Twitter</p>
        </button>
        <button class="flex flex-col items-center gap-y-1.5" @click="share(SHARE_TYPE.WHATSAPP)">
          <div class="w-10 h-10 rounded-full overflow-hidden outline-none border-none border-transparent">
            <img src="@/assets/whatsapp.png" />
          </div>
          <p class="text-xs scale-90">Whatsapp</p>
        </button>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Video } from '@/components/VideoWrapper.vue'

const props = defineProps<{
  video: Video
}>()

const emit = defineEmits<{
  (e: 'collapse'): void
}>()

const isShow = ref(false)
onMounted(() => {
  isShow.value = true
})
const collapse = () => {
  isShow.value = false
}

enum SHARE_TYPE {
  TWITTER = 0,
  WHATSAPP = 1,
}

const share = (shareType: SHARE_TYPE) => {
  const { title, play_url } = props.video

  let openedUrl = ''

  switch (shareType) {
    case SHARE_TYPE.TWITTER:
      openedUrl = `https://twitter.com/share?url=${play_url}&text=${title}`
      break
    case SHARE_TYPE.WHATSAPP:
      openedUrl = `whatsapp://send?text=${title}${play_url}`
      break
    default:
      throw new Error('unexpected share type')
  }

  window.open(openedUrl)
}

const copyText = () => {
  if (!navigator.clipboard) {
    const textArea = document.createElement('textarea')
    textArea.value = props.video.play_url

    // Avoid scrolling to bottom
    textArea.style.top = '0'
    textArea.style.left = '0'
    textArea.style.position = 'fixed'

    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()

    document.execCommand('copy')
    document.body.removeChild(textArea)

    return
  }
  // In safari it is not possible to copy text asynchronously, but it works in setTimeout
  setTimeout(() => {
    navigator.clipboard.writeText(props.video.play_url)
  }, 0)
}
</script>

<style scope>
.v-enter-active {
  transition: all 0.3s ease-out;
}

.v-leave-active {
  transition: all 0.3s ease-in;
}

.v-enter-from,
.v-leave-to {
  transform: translateY(96px);
  opacity: 0;
}
</style>
