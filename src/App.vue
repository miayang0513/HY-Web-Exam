<template>
  <div class="font-bold">HY Web Exam</div>
</template>

<script setup lang="ts">
import axios from '@/api.ts'

axios.get('/for_you_list')
</script>
