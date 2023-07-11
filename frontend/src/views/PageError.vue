<template>
  <div class="w-full h-full bg-black flex flex-col justify-center items-center gap-y-4">
    <h1 class="text-white">非預期錯誤 或 伺服器連線異常</h1>
    <button class="text-white px-5 py-1 bg-red-500 rounded" @click="reload">重新載入</button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
const reload = async () => {
  await router.push('/')
  window.location.reload()
}
</script>
