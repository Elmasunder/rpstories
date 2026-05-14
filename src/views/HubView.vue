<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue'
import { characters } from '@/data/index.ts'
import { getCharColors } from '@/utils/colors.ts'
import { uiState } from '@/store/ui.ts'
import HubCard from '@/components/HubCard.vue'
import CreateCard from '@/components/CreateCard.vue'

const charList = computed(() => {
  return Object.values(characters).sort((a, b) => {
    if (a.cover.status === 'alive' && b.cover.status !== 'alive') return -1
    if (a.cover.status !== 'alive' && b.cover.status === 'alive') return 1
    return 0
  })
})

// Génération d'une couleur aléatoire pour le Hub à chaque chargement
const hubColors = getCharColors('hub-' + Date.now())

onMounted(() => {
  document.title = 'RP/STORIES | Hub'
  uiState.setColors(hubColors.accent, hubColors.accent2, hubColors.accentRgb)
})

onUnmounted(() => {
  // On ne réinitialise plus ici pour éviter le flash violet pendant la transition vers une fiche
})
</script>

<template>
  <div class="min-h-screen selection:bg-accent selection:text-white">
    <!-- Header -->
    <header class="relative z-10 pt-32 px-8 pb-20 text-center overflow-hidden">
      <!-- Background Effects & Trames -->
      <div class="absolute inset-0 -z-10 pointer-events-none select-none">
        <!-- Main Aura -->
        <div
          class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-radial-gradient from-accent/10 to-transparent blur-3xl opacity-50"
        ></div>

        <!-- Micro Dots Trame -->
        <div
          class="absolute inset-0 bg-dots-premium bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)] opacity-60"
        ></div>

        <!-- Large Tech Grid -->
        <div
          class="absolute inset-0 bg-grid-premium bg-[size:100px_100px] [mask-image:linear-gradient(to_bottom,black,transparent)] opacity-40"
        ></div>
      </div>

      <div class="max-w-[800px] mx-auto animate-fade-in">
        <div class="font-mono text-[10px] tracking-[6px] uppercase mb-4 font-bold text-accent">
          [ PLATFORME — v1.0 ]
        </div>

        <h1
          class="font-display font-black text-white uppercase mb-8 leading-[0.8] tracking-tighter text-6xl md:text-8xl lg:text-9xl drop-shadow-2xl"
        >
          *RP/STORIES
        </h1>

        <p
          class="font-mono text-[13px] md:text-sm text-white/70 max-w-[650px] mx-auto leading-[1.8] tracking-wide"
        >
          <span :style="{ color: hubColors.accent }" class="font-bold"
            >// ÉCOSYSTÈME NARRATIF ROLEPLAY //</span
          >
          <br />
          Archivez vos héritages, optimisez vos whitelists et forgez des backgrounds d'exception.
          *RP/STORIES centralise vos parcours pour devenir le standard de votre identité numérique.
          <br />
          <br />
          <span class="font-bold text-[10px] tracking-[8px] text-white"
            >COMPATIBLE <span :style="{ color: hubColors.accent }">FIVEM</span> & <span :style="{ color: hubColors.accent }">REDM</span></span
          >
        </p>
      </div>
    </header>

    <!-- Main Grid -->
    <main class="relative z-10 max-w-[1400px] mx-auto px-8 pb-32">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        <HubCard v-for="(char, idx) in charList" :key="char.id" :char="char" :index="idx" />
        <CreateCard @create="console.log('Action: Créer un personnage')" />
      </div>
    </main>

    <!-- Footer -->
    <footer class="relative z-10 py-12 border-t border-white/5 bg-black/20">
      <div
        class="max-w-[1400px] mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-6 opacity-40 hover:opacity-100 transition-opacity duration-500"
      >
        <div class="font-mono text-[10px] tracking-[4px] uppercase">HUB RP · RPSTORIES · 2024</div>
        <div class="font-mono text-[10px] tracking-[2px] uppercase">
          Design System by <span class="text-accent font-bold">ELMASUNDER</span>
        </div>
      </div>
    </footer>
  </div>
</template>
