<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import type { Character } from '@/types/character'
import { getCharColors } from '@/utils/colors.ts'
import { authState } from '@/store/auth'

const props = defineProps<{
  char: Character
  index?: number
}>()

// On s'assure que les couleurs sont calculées de manière réactive et stable
const charColors = computed(() => getCharColors(props.char.id, props.index || 0))
const router = useRouter()
const isOwner = computed(() => authState.user?.id === props.char.owner_id)

const goToEdit = (e: Event) => {
  e.preventDefault()
  e.stopPropagation()
  router.push({ name: 'edit', params: { id: props.char.id } })
}

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

const cleanRef = computed(() => {
  const parts = props.char.cover.ref.split('<br>')
  return parts[0].replace('DOSSIER REF: ', '')
})

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
    :to="{ name: 'fiche', params: { id: char.id }, query: { status: char.cover.status } }"
    class="group relative flex flex-col transition-all duration-500 hover:-translate-y-2"
  >
    <div
      class="flex flex-col h-full bg-panel border border-border border-t-2 rounded-lg overflow-hidden transition-all duration-500 hover:-translate-y-2"
      :style="
        !isDead
          ? {
              '--accent': charColors.accent,
              '--color-accent': charColors.accent,
              '--accent-rgb': charColors.accentRgb,
            }
          : {
              '--accent': '#e74c3c',
              '--color-accent': '#e74c3c',
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
      <div class="relative h-48 sm:h-64 overflow-hidden noise-overlay">
        <div
          class="absolute inset-0 z-10 bg-linear-to-t from-bg via-transparent to-transparent opacity-80"
        ></div>
        <img
          v-for="(img, idx) in char.cover.photos.slice(0, 3)"
          :key="img"
          :src="fixPath(img)"
          class="absolute inset-[-1%] w-[102%] h-[102%] object-cover transition-all duration-700"
          :class="[
            idx === currentImg ? 'opacity-100 scale-105' : 'opacity-0',
            isDead
              ? 'grayscale contrast-125 brightness-50 group-hover:brightness-75'
              : 'saturate-[0.9] group-hover:saturate-100 group-hover:brightness-110',
          ]"
          alt=""
        />

        <!-- FBI DECEASED STAMP -->
        <div
          v-if="isDead"
          class="absolute inset-0 z-15 flex items-center justify-center pointer-events-none overflow-hidden"
        >
          <div
            class="transform rotate-[-15deg] border-[3px] border-dead text-dead px-4 py-1.5 font-mono font-black text-3xl tracking-[8px] uppercase opacity-80 mix-blend-plus-lighter shadow-[0_0_20px_rgba(231,76,60,0.3)] bg-black/20 backdrop-blur-[1px]"
          >
            DECEASED
          </div>
        </div>

        <!-- Badges (Left status, Right privacy & edit) -->
        <div class="absolute inset-x-4 top-4 z-20 flex justify-between items-start">
          <div
            v-if="!isDead"
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
          <!-- Spacer to keep the portal link on the right if badge is hidden -->
          <div v-else class="w-20"></div>

          <div class="flex items-center gap-2">
            <!-- Privacy Badge (Owner only) -->
            <div
              v-if="isOwner && char.privacy"
              class="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border flex items-center gap-1.5"
              :class="{
                'border-white/10': char.privacy === 'public',
                'border-[#3498db]/40': char.privacy === 'followers',
                'border-[#e67e22]/40': char.privacy === 'private',
              }"
            >
              <!-- Public icon -->
              <svg v-if="char.privacy === 'public'" class="size-3 text-white/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
              <!-- Followers icon -->
              <svg v-else-if="char.privacy === 'followers'" class="size-3 text-[#3498db]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              <!-- Private icon -->
              <svg v-else class="size-3 text-[#e67e22]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              <span
                class="font-mono text-[8px] tracking-widest uppercase font-bold"
                :class="{
                  'text-white/50': char.privacy === 'public',
                  'text-[#3498db]': char.privacy === 'followers',
                  'text-[#e67e22]': char.privacy === 'private',
                }"
              >{{ char.privacy === 'public' ? 'Public' : char.privacy === 'followers' ? 'Abonnés' : 'Privé' }}</span>
            </div>

            <!-- Edit Picto (Owner only) -->
            <button
              v-if="isOwner"
              @click="goToEdit"
              class="size-8 bg-black/60 backdrop-blur-md rounded-full border border-white/10 p-1.5 hover:bg-accent/20 hover:border-accent/50 transition-all group/edit cursor-pointer"
              title="Modifier ce dossier"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="w-full h-full text-white/60 group-hover/edit:text-accent transition-colors"
              >
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Server Logo (Bottom right of the image) -->
        <a
          v-if="char.cover.serverDomain && char.cover.serverDomain !== 'nom-du-serveur.fr'"
          :href="`https://${char.cover.serverDomain}`"
          target="_blank"
          class="absolute bottom-4 right-4 z-20 size-8 bg-black/60 backdrop-blur-md rounded-full border border-white/10 p-1.5 hover:bg-accent/20 hover:border-accent/50 transition-all group/logo"
          @click.stop
        >
          <img
            :src="`https://www.google.com/s2/favicons?domain=${char.cover.serverDomain}&sz=64`"
            class="w-full h-full object-contain filter grayscale group-hover/logo:grayscale-0 transition-all"
            :alt="char.cover.serverDomain"
          />
        </a>
      </div>

      <!-- Content Area -->
      <div class="p-4 sm:p-6 relative z-20 flex flex-col grow">
        <div class="font-mono text-[9px] text-accent tracking-[3px] uppercase mb-1 opacity-70">
          {{ char.cover.eyebrow }}
        </div>
        <h3
          class="font-display font-black text-2xl text-white uppercase leading-[1.1] mb-4 group-hover:text-accent transition-colors tracking-tighter h-14 line-clamp-2"
        >
          {{ char.cover.firstName }} <span class="text-accent">{{ char.cover.lastName }}</span>
        </h3>

        <!-- Admin Meta Data -->
        <div class="space-y-3 mb-6">
          <div class="flex flex-col gap-0.5">
            <span class="font-mono text-[8px] text-accent uppercase tracking-[2px] opacity-60"
              >Dossier Reference</span
            >
            <span
              class="font-mono text-[10px] text-white uppercase tracking-wider font-bold leading-relaxed"
              >{{ cleanRef }}</span
            >
          </div>
          <div class="flex flex-col gap-0.5">
            <span class="font-mono text-[8px] text-accent uppercase tracking-[2px] opacity-60"
              >Statut</span
            >
            <span class="font-mono text-[10px] text-white uppercase tracking-wider font-bold">
              {{ isDead ? 'DEAD / CK' : 'ACTIF · EN SERVICE' }}
            </span>
          </div>
          <div class="flex flex-col gap-0.5">
            <span class="font-mono text-[8px] text-accent uppercase tracking-[2px] opacity-60"
              >Usage</span
            >
            <span class="font-mono text-[10px] text-white uppercase tracking-wider font-bold"
              >ROLEPLAY EXCLUSIF</span
            >
          </div>
        </div>

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
