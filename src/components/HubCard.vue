<script setup lang="ts">
/**
 * HUBCARD COMPONENT
 * 
 * Ce composant affiche une carte interactive dans le Hub.
 * Il intègre :
 * - Un carrousel automatique d'images (pour donner vie au hub)
 * - Un thème dynamique basé sur l'identifiant du personnage
 * - Un style spécifique pour les personnages décédés (N&B, grain prononcé, ruban)
 */
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { getCharColors } from '@/utils/colors.ts'
import { uiState } from '@/store/ui.ts'
import type { Character } from '@/types/character'

const props = defineProps<{
  char: Character
}>()

// Déclenche l'effet de couleur global au survol
const handleMouseEnter = () => {
  const color = props.char.cover.status === 'dead' ? '231, 76, 60' : charColors.value.accentRgb
  uiState.setAccent(color)
}
const handleMouseLeave = () => uiState.resetAccent()

// Récupération des couleurs d'accent calculées dynamiquement
// Si le personnage est mort, on ne surcharge pas les variables (le CSS global prend le relais)
const charColors = computed(() => {
  if (props.char.cover.status === 'dead') {
    return { accent: '', accent2: '', accentRgb: '', accent2Rgb: '' }
  }
  return getCharColors(props.char.id)
})

const photos = computed(() => props.char.cover.photos || [])
const currentPhotoIndex = ref(0)
let intervalId: ReturnType<typeof setInterval> | null = null
let timeoutId: ReturnType<typeof setTimeout> | null = null

onMounted(() => {
  // Logique du carrousel d'images
  if (photos.value.length > 1) {
    // Petit délai initial aléatoire pour éviter que toutes les cartes 
    // changent de photo exactement au même moment (plus naturel)
    const delay = Math.random() * 2000
    timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        currentPhotoIndex.value = (currentPhotoIndex.value + 1) % photos.value.length
      }, 3500)
    }, delay)
  }
})

// Nettoyage impératif des timers lors de la destruction du composant
onUnmounted(() => {
  if (timeoutId) clearTimeout(timeoutId)
  if (intervalId) clearInterval(intervalId)
})

/**
 * Fallback en cas d'image introuvable (Imgur down ou lien mort)
 */
const handleImgError = (event: Event) => {
  const target = event.target as HTMLImageElement
  if (target) {
    target.src = 'https://via.placeholder.com/400x600/1a1a1a/ffffff?text=Image+Error'
  }
}

// Extraction rapide des métadonnées pour l'affichage synthétique
const ageMeta = computed(() => props.char.cover.meta.find(m => m.key.toLowerCase().includes('âge'))?.value || '?')
const origineMeta = computed(() => props.char.cover.meta.find(m => m.key.toLowerCase().includes('origine'))?.value || '?')
</script>

<template>
  <RouterLink 
    :to="`/fiche/${char.id}`" 
    class="hub-card" 
    :class="{ 'hub-card--dead': char.cover.status === 'dead' }"
    :style="char.cover.status !== 'dead' ? { 
      '--accent': charColors.accent, 
      '--accent2': charColors.accent2,
      '--accent-rgb': charColors.accentRgb
    } : {}"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div class="hub-card-img-wrapper">
      <!-- CARROUSEL D'IMAGES -->
      <template v-if="photos.length > 0">
        <img
          v-for="(photo, index) in photos"
          :key="photo"
          :src="photo"
          :alt="char.cover.firstName"
          class="hub-card-img fade-img"
          :class="{ 'is-active': currentPhotoIndex === index }"
          @error="handleImgError"
        />
      </template>
      <div v-else class="hub-card-img-placeholder"></div>
      
      <!-- Ruban "DECEASED" si nécessaire -->
      <div v-if="char.cover.status === 'dead'" class="status-overlay">DECEASED</div>
      
      <!-- LOGO DU SERVEUR (Favicon automatique via Google API) -->
      <a
        v-if="char.cover.serverDomain"
        :href="`https://${char.cover.serverDomain}`"
        target="_blank"
        rel="noopener noreferrer"
        class="server-link-hub"
        @click.stop
      >
        <img
          :src="`https://www.google.com/s2/favicons?domain=${char.cover.serverDomain}&sz=128`"
          class="server-logo-hub"
          :alt="`Logo ${char.cover.serverDomain}`"
        />
      </a>
    </div>

    <!-- CONTENU TEXTUEL -->
    <div class="hub-card-content">
      <div class="hub-card-name">
        <span class="name-text">{{ char.cover.firstName }} {{ char.cover.lastName }}</span>
      </div>
      <div class="hub-card-alias" :class="{ 'hub-card-alias--dead': char.cover.status === 'dead' }">AKA "{{ char.cover.alias }}"</div>
      
      <div class="hub-card-meta">
        <div class="hub-card-meta-item">
          Âge <span>{{ ageMeta }}</span>
        </div>
        <div class="hub-card-meta-item">
          Origines <span>{{ origineMeta }}</span>
        </div>
      </div>
    </div>
  </RouterLink>
</template>

<style scoped>
/* 
 * Styles spécifiques au carrousel (fade-in/fade-out fluide)
 */
.fade-img {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  transition: opacity 1.2s ease-in-out, transform 0.5s ease;
}
.fade-img.is-active {
  opacity: 1;
}

/* 
 * Effet de grain analogique (bruit dynamique) 
 */
.hub-card-img-wrapper::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 5;
  pointer-events: none;
  opacity: 0.03;
  background-image: url('https://www.ui-layouts.com/noise.gif');
  transition: opacity 0.3s ease;
}

/* Accentuation du bruit pour les morts (effet vieille pellicule dégradée) */
.hub-card--dead .hub-card-img-wrapper::after {
  opacity: 0.12;
}
</style>
