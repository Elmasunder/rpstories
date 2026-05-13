<script setup lang="ts">
import { onMounted } from 'vue'
import { characters } from '@/data/index.ts'
import { getCharColors } from '@/utils/colors.ts'
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
})
</script>

<template>
  <div>
    <header class="pt-20 px-5 pb-15 text-center">
      <div
        class="font-mono text-[10px] tracking-[4px] uppercase mb-2 opacity-80"
        :style="{ color: hubColors.accent }"
      >
        [ ALPHA — v0.1 ]
      </div>
      <h1 class="font-display font-[800] text-white uppercase mb-6 hub-title">
        RP/STORIES
      </h1>
      <p class="font-mono text-[13px] text-white max-w-[600px] mx-auto leading-[1.8] tracking-[0.5px]">
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
  font-size: clamp(34px, 5vw, 56px);
  letter-spacing: -1px;
  line-height: 1;
}
</style>
