<script setup lang="ts">
/**
 * HUBCARD COMPONENT
 *
 * Carte interactive dans le Hub avec :
 * - Carrousel automatique d'images
 * - Thème dynamique basé sur l'identifiant du personnage
 * - Style spécifique pour les personnages décédés (N&B, grain, ruban)
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
  if (photos.value.length > 1) {
    const delay = Math.random() * 2000
    timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        currentPhotoIndex.value = (currentPhotoIndex.value + 1) % photos.value.length
      }, 3500)
    }, delay)
  }
})

onUnmounted(() => {
  if (timeoutId) clearTimeout(timeoutId)
  if (intervalId) clearInterval(intervalId)
})

const handleImgError = (event: Event) => {
  const target = event.target as HTMLImageElement
  if (target) {
    target.src = 'https://via.placeholder.com/400x600/1a1a1a/ffffff?text=Image+Error'
  }
}

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

      <!-- Ruban "DECEASED" -->
      <div v-if="char.cover.status === 'dead'" class="status-overlay">DECEASED</div>

      <!-- LOGO DU SERVEUR -->
      <a
        v-if="char.cover.serverDomain"
        :href="`https://${char.cover.serverDomain}`"
        target="_blank"
        rel="noopener noreferrer"
        class="absolute top-3 right-3 z-10"
        @click.stop
      >
        <img
          :src="`https://www.google.com/s2/favicons?domain=${char.cover.serverDomain}&sz=128`"
          class="size-8 object-contain transition-all duration-300 drop-shadow-[0_0_5px_rgba(0,0,0,0.5)] hover:scale-110"
          :alt="`Logo ${char.cover.serverDomain}`"
        />
      </a>
    </div>

    <!-- CONTENU TEXTUEL -->
    <div class="p-6 flex-1">
      <div class="font-display font-[800] text-[32px] text-white">
        <span>{{ char.cover.firstName }} {{ char.cover.lastName }}</span>
      </div>
      <div
        class="font-mono text-[11px] text-[var(--accent)] uppercase mt-1"
        :class="{ 'hub-card-alias--dead': char.cover.status === 'dead' }"
      >
        AKA "{{ char.cover.alias }}"
      </div>

      <div class="flex gap-5 mt-4 border-t border-border pt-4">
        <div class="font-mono text-[10px] text-muted uppercase">
          Âge <span class="text-white block text-base font-display mt-1">{{ ageMeta }}</span>
        </div>
        <div class="font-mono text-[10px] text-muted uppercase">
          Origines <span class="text-white block text-base font-display mt-1">{{ origineMeta }}</span>
        </div>
      </div>
    </div>
  </RouterLink>
</template>

<style scoped>
/* Carrousel fade-in/fade-out — trop complexe pour Tailwind */
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

/* Effet de grain analogique (bruit dynamique) */
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

/* Accentuation du bruit pour les morts */
.hub-card--dead .hub-card-img-wrapper::after {
  opacity: 0.12;
}
</style>
