<script setup>
import { onMounted } from 'vue'
import { characters } from '@/data/characters.js'
import { getCharColors } from '@/utils/colors.js'
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
    <header class="hub-header">
      <div class="hub-tag" :style="{ color: hubColors.accent }">[ ALPHA — v0.1 ]</div>
      <h1 class="hub-title">RP/STORIES</h1>
      <p class="hub-description">
        <span :style="{ color: hubColors.accent }">// ÉCOSYSTÈME NARRATIF FIVE M //</span> <br>
        Optimisez vos <strong>White-lists</strong>, archivez vos <strong>héritages RP</strong> et forgez des backgrounds d'exception. 
        RP/STORIES centralise vos parcours et expertises pour devenir le standard de votre identité numérique.
      </p>
    </header>

    <main class="hub-grid">
      <HubCard v-for="char in charList" :key="char.id" :char="char" />
    </main>

    <footer class="footnote">
      HUB RP · RPSTORIES · v1.0
    </footer>
  </div>
</template>
