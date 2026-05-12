<script setup>
import { onMounted } from 'vue'
import { characters } from '@/data/characters.js'
import HubCard from '@/components/HubCard.vue'

const charList = Object.values(characters).sort((a, b) => {
  if (a.cover.status === 'alive' && b.cover.status !== 'alive') return -1
  if (a.cover.status !== 'alive' && b.cover.status === 'alive') return 1
  return 0
})

onMounted(() => {
  document.title = 'RP/STORIES | Hub'
})
</script>

<template>
  <div>
    <header class="hub-header">
      <div class="hub-tag">[ ALPHA — v0.1 ]</div>
      <h1 class="hub-title">RP/STORIES</h1>
      <p class="hub-description">
        // ARCHIVE NARRATIVE & TECHNIQUE // <br>
        Centralisation des dossiers de personnages évoluant dans l'écosystème Five M. 
        Ce répertoire documente les parcours, les expertises et les moments clés qui forgent chaque identité 
        au sein de votre histoire collective.
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
