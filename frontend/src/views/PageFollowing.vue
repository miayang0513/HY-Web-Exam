<template>
  <video-wrapper v-if="!isFetchingData" :videoList="videoList" />
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import axios from '@/api'
import VideoWrapper from '@/components/VideoWrapper.vue'
import { Video } from '@/components/VideoWrapper.vue'

const isFetchingData = ref(false)
const videoList = ref<Video[]>([])

onBeforeMount(async () => {
  isFetchingData.value = true

  try {
    const { data } = await axios.get('/following_list')
    videoList.value = data.items
    isFetchingData.value = false
  } catch {
    // redirect to /error
  }
})
</script>
