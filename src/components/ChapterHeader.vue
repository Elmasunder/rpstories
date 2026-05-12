<script setup>
import { computed } from 'vue'

const props = defineProps({
  char: { type: Object, required: true }
})

const titleHTML = computed(() => {
  const lines = props.char.titleLines
  if (!lines || lines.length < 2) return lines?.[0] || ''
  const cls = lines[2] || 'text-accent'
  return `${lines[0]}<br><span class="${cls}">${lines[1]}</span>`
})
</script>

<template>
  <div>
    <div class="page-rule"></div>
    <div class="chapter-label">{{ char.label }}</div>
    <h1 class="chapter-title" v-html="titleHTML"></h1>
  </div>
</template>
