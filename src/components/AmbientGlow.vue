<template>
  <div
    class="ambient-glow"
    :style="{
      '--mx': `${mouse.x}px`,
      '--my': `${mouse.y}px`,
      'opacity': glowOpacity
    }"
  ></div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, onUnmounted, computed } from 'vue'
import { uiState } from '@/store/ui.ts'
import { useRoute } from 'vue-router'

const mouse = reactive({ x: 0, y: 0 })
const scrollY = ref(0)
const route = useRoute()

const handleMouseMove = (e: MouseEvent) => {
  mouse.x = e.clientX
  mouse.y = e.clientY
}

const handleScroll = () => {
  scrollY.value = window.scrollY
}

// Calcul de l'opacité selon le scroll et la page
const glowOpacity = computed(() => {
  // Sur le Hub, on laisse toujours (ou on peut ajuster)
  if (route.name === 'hub') return 1
  
  // Sur la fiche, on n'affiche que sous la ligne de flottaison (100vh)
  const threshold = window.innerHeight * 0.8 // On commence à apparaître un peu avant
  if (scrollY.value < threshold) return 0
  
  // Apparition progressive
  return Math.min((scrollY.value - threshold) / 200, 1)
})

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove)
  window.addEventListener('scroll', handleScroll)
  handleScroll() // Init
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.ambient-glow {
  position: fixed;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background: radial-gradient(
    1500px circle at var(--mx) var(--my),
    rgba(v-bind('uiState.activeAccentRgb'), 0.05),
    transparent 100%
  );
  transition: background 1.2s ease, opacity 0.8s ease-in-out;
}

/* On utilise un filtre de flou pour adoucir encore plus si nécessaire */
.ambient-glow::after {
  content: '';
  position: absolute;
  inset: 0;
  background: inherit;
  filter: blur(200px);
  opacity: 0.15;
}
</style>
