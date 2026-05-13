<template>
  <div
    class="ambient-glow"
    :style="{
      '--mx': `${mouse.x}px`,
      '--my': `${mouse.y}px`,
    }"
  ></div>
</template>

<script setup lang="ts">
import { reactive, onMounted, onUnmounted } from 'vue'
import { uiState } from '@/store/ui.ts'

const mouse = reactive({ x: 0, y: 0 })

const handleMouseMove = (e: MouseEvent) => {
  mouse.x = e.clientX
  mouse.y = e.clientY
}

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
})
</script>

<style scoped>
.ambient-glow {
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  background: radial-gradient(
    2000px circle at var(--mx) var(--my),
    rgba(v-bind('uiState.activeAccentRgb'), 0.04),
    transparent 100%
  );
  transition: background 1.2s ease;
}

/* On utilise un filtre de flou pour adoucir encore plus si nécessaire */
.ambient-glow::after {
  content: '';
  position: absolute;
  inset: 0;
  background: inherit;
  filter: blur(250px);
  opacity: 0.2;
}
</style>
