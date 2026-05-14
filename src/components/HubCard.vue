<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Character } from '@/types/character'
import { getCharColors } from '@/utils/colors.ts'

const props = defineProps<{
  char: Character
  index?: number
}>()

const charColors = getCharColors(props.char.id, props.index)
const currentImg = ref(0)
const isDead = computed(() => {
  const status = props.char.cover.status?.toLowerCase()
  return status === 'dead' || status === 'disparu'
})

const fixPath = (path: string) => {
  if (!path || path.startsWith('http') || path.startsWith('data:')) return path
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  return `${import.meta.env.BASE_URL}${cleanPath}`
}

// Cycle d'images au survol (optionnel si on veut garder du dynamisme)
let cycleInterval: ReturnType<typeof setInterval> | null = null
const startCycle = () => {
  cycleInterval = setInterval(() => {
    currentImg.value = (currentImg.value + 1) % Math.min(props.char.cover.photos.length, 3)
  }, 1500)
}
const stopCycle = () => {
  if (cycleInterval) {
    clearInterval(cycleInterval)
    cycleInterval = null
  }
  currentImg.value = 0
}
</script>

<template>
  <router-link
    :to="{ name: 'fiche', params: { id: char.id } }"
    class="group relative flex flex-col transition-all duration-500 hover:-translate-y-2"
  >
    <div
      class="flex flex-col h-full bg-panel border border-border border-t-2 rounded-lg overflow-hidden transition-all duration-500 hover:-translate-y-2"
      :style="
        !isDead
          ? {
              '--color-accent': charColors.accent,
              '--color-accent-alt': charColors.accent2,
              '--accent-rgb': charColors.accentRgb,
            }
          : {
              '--color-accent': '#e74c3c',
              '--color-accent-alt': '#e74c3c',
              '--accent-rgb': '231, 76, 60',
            }
      "
      :class="[
        'hover:border-accent hover:shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_20px_rgba(var(--accent-rgb),0.3)] shadow-xl',
      ]"
      @mouseenter="startCycle"
      @mouseleave="stopCycle"
    >
      <!-- Image Area -->
      <div class="relative h-64 overflow-hidden noise-overlay">
        <div
          class="absolute inset-0 z-10 bg-gradient-to-t from-bg via-transparent to-transparent opacity-80"
        ></div>
        <img
          v-for="(img, idx) in char.cover.photos.slice(0, 3)"
          :key="img"
          :src="fixPath(img)"
          class="absolute -inset-[1%] w-[102%] h-[102%] object-cover transition-all duration-700"
          :class="[
            idx === currentImg ? 'opacity-100 scale-105' : 'opacity-0',
            isDead
              ? 'grayscale contrast-125 brightness-50 group-hover:brightness-75'
              : 'saturate-[0.9] group-hover:saturate-100 group-hover:brightness-110',
          ]"
          alt=""
        />

        <!-- Badges -->
        <div class="absolute inset-x-4 top-4 z-20 flex justify-between items-start">
          <!-- Status Badge -->
          <div
            class="bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 flex items-center gap-2"
          >
            <span
              class="size-1.5 rounded-full"
              :class="char.cover.status === 'alive' ? 'bg-positive animate-pulse' : 'bg-dead'"
            ></span>
            <span class="font-mono text-[9px] text-white tracking-widest uppercase font-bold">{{
              char.cover.status
            }}</span>
          </div>

          <!-- Server Logo Link -->
          <a
            v-if="char.cover.serverDomain && char.cover.serverDomain !== 'nom-du-serveur.fr'"
            :href="`https://${char.cover.serverDomain}`"
            target="_blank"
            class="size-8 bg-black/60 backdrop-blur-md rounded-full border border-white/10 p-1.5 hover:bg-accent/20 hover:border-accent/50 transition-all group/logo"
            @click.stop
          >
            <img
              :src="`https://www.google.com/s2/favicons?domain=${char.cover.serverDomain}&sz=64`"
              class="w-full h-full object-contain filter grayscale group-hover/logo:grayscale-0 transition-all"
              :alt="char.cover.serverDomain"
            />
          </a>
        </div>
      </div>

      <!-- Content Area -->
      <div class="p-6 relative z-20 flex flex-col flex-grow">
        <div class="font-mono text-[9px] text-accent tracking-[3px] uppercase mb-1 opacity-70">
          {{ char.cover.eyebrow }}
        </div>
        <h3
          class="font-display font-black text-2xl text-white uppercase leading-[1.1] mb-4 group-hover:text-accent transition-colors tracking-tighter h-14 line-clamp-2"
        >
          {{ char.cover.firstName }} <span class="text-accent">{{ char.cover.lastName }}</span>
        </h3>

        <p class="font-mono text-[11px] text-muted leading-relaxed line-clamp-2 mb-6 h-8">
          {{ char.cover.subtitle }}
        </p>

        <div class="mt-auto flex justify-between items-center pt-4 border-t border-white/5">
          <span class="font-mono text-[10px] text-accent font-bold uppercase tracking-widest"
            >Voir le dossier</span
          >
          <span
            class="size-6 flex-none flex items-center justify-center rounded-full bg-accent/10 border border-accent/20 text-accent group-hover:bg-accent group-hover:text-black transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="size-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </span>
        </div>
      </div>
    </div>
  </router-link>
</template>
