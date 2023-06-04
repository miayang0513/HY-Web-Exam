<template>
  <nav
    v-if="$route.name !== 'Error'"
    class="fixed z-nav-bar top-8 left-1/2 transform -translate-x-1/2 flex items-center gap-x-3"
  >
    <router-link to="/following" class="text-lg" :class="[$route.name === 'Following' ? activeClass : inactiveClass]"
      >Following
    </router-link>
    <div class="w-px h-4 bg-black" />
    <router-link to="/foryou" class="text-lg" :class="[$route.name === 'ForYou' ? activeClass : inactiveClass]"
      >For You
    </router-link>
  </nav>
  <main :style="{ height: mainHeight + 'px' }">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </main>
  <nav class="w-full h-8 grid grid-cols-2 items-center bg-black justify-items-center">
    <div class="text-sm text-white">Home</div>
    <div class="text-sm text-neutral-600">Discover</div>
  </nav>
</template>

<script setup lang="ts">
import { ref, provide } from 'vue'

/**
 * 因為在手機版的 Chrome 和 Safari 上下會有 Address 等原生介面佔據空間，
 * 所以無法直接使用 100vh 來設定介面的高度
 *
 * 參考：https://dev.to/nirazanbasnet/dont-use-100vh-for-mobile-responsive-3o97
 */
const BOTTOM_BAR_HEIGHT = 32
const mainHeight = ref(896 - BOTTOM_BAR_HEIGHT) // 896 is the height of iPhone XR
provide('mainHeight', mainHeight)

const documentHeight = () => {
  const doc = document.documentElement
  mainHeight.value = window.innerHeight - BOTTOM_BAR_HEIGHT
  doc.style.setProperty('--doc-height', `${window.innerHeight}px`)
}
window.addEventListener('resize', documentHeight)
documentHeight()

const activeClass = 'text-white font-bold underline underline-offset-8 decoration-black'
const inactiveClass = 'text-neutral-200'
</script>

<style>
:root {
  --doc-height: 100%;
}

html,
body,
#app {
  @apply p-0 m-0 h-screen;
  height: var(--doc-height);
}
</style>
