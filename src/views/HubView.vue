<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { characters } from '@/data/index.ts'
import { getCharColors } from '@/utils/colors.ts'
import { uiState } from '@/store/ui.ts'
import HubCard from '@/components/HubCard.vue'

const charList = Object.values(characters).sort((a, b) => {
  if (a.cover.status === 'alive' && b.cover.status !== 'alive') return -1
  if (a.cover.status !== 'alive' && b.cover.status === 'alive') return 1
  return 0
})

// Génération d'une couleur aléatoire pour le Hub à chaque chargement
const hubColors = getCharColors('hub-' + Date.now())

onMounted(() => {
  document.title = 'RP/STORIES | Hub'
  uiState.setAccent(hubColors.accentRgb)
})

onUnmounted(() => {
  uiState.resetAccent()
})
</script>

<template>
  <div>
    <header class="pt-24 px-5 pb-16 text-center">
      <div
        class="font-mono text-[10px] tracking-[5px] uppercase mb-3 opacity-80"
        :style="{ color: hubColors.accent }"
      >
        [ ALPHA — v1.0 ]
      </div>
      <h1 class="font-display font-[900] text-white uppercase mb-6 hub-title tracking-[-3px]">
        RP/STORIES
      </h1>
      <p class="font-mono text-[13px] text-white/90 max-w-[650px] mx-auto leading-[1.8] tracking-[0.5px]">
        <span :style="{ color: hubColors.accent }">// ÉCOSYSTÈME NARRATIF ROLEPLAY //</span> <br />
        Optimisez vos <strong>whitelists</strong>, archivez vos <strong>héritages RP</strong> et
        forgez des backgrounds d'exception. RP/STORIES centralise vos parcours et expertises pour
        devenir le standard de votre identité numérique.
      </p>
    </header>

    <main class="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-[30px] px-10 pb-20 max-w-[1200px] mx-auto">
      <HubCard v-for="char in charList" :key="char.id" :char="char" />
    </main>

    <footer class="font-mono text-[10px] text-muted text-center mt-15 p-10 border-t border-border">
      HUB RP · RPSTORIES · v1.0
    </footer>
  </div>
</template>

<style scoped>
/* Le titre utilise clamp() qui n'a pas d'équivalent natif Tailwind */
.hub-title {
  font-size: clamp(42px, 6vw, 72px);
  line-height: 0.9;
}
</style>
