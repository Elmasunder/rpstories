<script setup lang="ts">
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

<style scoped>
.chapter-label {
  font-family: var(--font-mono);
  font-size: 10px;
  color: var(--accent);
  letter-spacing: 5px;
  text-transform: uppercase;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.chapter-label::after {
  content: '';
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, var(--accent), transparent);
  opacity: 0.3;
}

.chapter-title {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: clamp(32px, 5vw, 54px);
  text-transform: uppercase;
  color: var(--color-white);
  line-height: 1;
  letter-spacing: -1px;
  margin-bottom: 24px;
}

/* Les classes text-accent/text-accent-alt sont injectées dynamiquement via v-html */
.chapter-title :deep(.text-accent) {
  color: var(--accent);
}

.chapter-title :deep(.text-accent-alt) {
  color: var(--accent2);
}
</style>
