<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/utils/supabase'
import { mapDbCharacterToFrontend } from '@/utils/mappers'
import type { Character } from '@/types/character'
import { authState } from '@/store/auth'
import { getCharColors } from '@/utils/colors.ts'
import { uiState } from '@/store/ui.ts'
import HubCard from '@/components/HubCard.vue'
import CreateCard from '@/components/CreateCard.vue'
import TheNavbar from '@/components/TheNavbar.vue'
import FriendListBtn from '@/components/FriendListBtn.vue'

const router = useRouter()

// État des données
const charList = ref<Character[]>([])
const isLoading = ref(true)
const activeTab = ref<'public' | 'my_fiches' | 'followed'>('public')

const fetchCharacters = async () => {
  try {
    isLoading.value = true
    charList.value = []

    let query = supabase.from('characters').select('*')

    if (activeTab.value === 'public') {
      query = query.eq('privacy', 'public')
    } else if (activeTab.value === 'my_fiches') {
      if (!authState.user) return
      query = query.eq('owner_id', authState.user.id)
    } else if (activeTab.value === 'followed') {
      if (!authState.user || authState.followingIds.length === 0) {
        charList.value = []
        return
      }
      query = query.in('owner_id', authState.followingIds).neq('privacy', 'private')
    }

    const { data, error } = await query

    if (error) throw error

    if (data) {
      charList.value = data.map(mapDbCharacterToFrontend).sort((a, b) => {
        if (a.cover.status === 'alive' && b.cover.status !== 'alive') return -1
        if (a.cover.status !== 'alive' && b.cover.status === 'alive') return 1
        return 0
      })
    }
  } catch (err) {
    console.error('Erreur lors du chargement des fiches:', err)
  } finally {
    isLoading.value = false
  }
}


watch(activeTab, () => {
  fetchCharacters()
  // Re-setup or disconnect observer based on the active tab since CreateCard is conditionally rendered
  setTimeout(() => {
    if (activeTab.value === 'my_fiches') {
      setupObserver()
    } else if (observer) {
      observer.disconnect()
      observer = null
      isCreateCardVisible.value = false
    }
  }, 100)
})

watch(() => authState.user, (newUser) => {
  if (!newUser && activeTab.value !== 'public') {
    activeTab.value = 'public' // triggers activeTab watcher
  } else if (newUser && activeTab.value === 'public') {
    activeTab.value = 'my_fiches' // triggers activeTab watcher
  } else {
    // Tab didn't change, trigger fetch manually
    fetchCharacters()
  }
})

// Logique pour masquer le FAB quand la CreateCard est visible
const createCardRef = ref<InstanceType<typeof CreateCard> | null>(null)
const isCreateCardVisible = ref(false)
let observer: IntersectionObserver | null = null

const setupObserver = () => {
  if (observer) {
    observer.disconnect()
  }
  const el = createCardRef.value?.$el || createCardRef.value
  if (!el) return

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        isCreateCardVisible.value = entry.isIntersecting
      })
    },
    { threshold: 0.1 },
  )

  observer.observe(el)
}

// Génération d'une couleur aléatoire pour le Hub à chaque chargement
const hubColors = getCharColors('hub-' + Date.now())

onMounted(() => {
  document.title = 'RP/STORIES | Hub'
  uiState.setColors(hubColors.accent, hubColors.accent2, hubColors.accentRgb)
  
  if (authState.user && activeTab.value !== 'my_fiches') {
    activeTab.value = 'my_fiches' // triggers activeTab watcher
  } else {
    fetchCharacters()
  }

  setTimeout(() => {
    setupObserver()
  }, 100)
})

onUnmounted(() => {
  if (observer) observer.disconnect()
})
</script>

<template>
  <div class="min-h-screen selection:bg-accent selection:text-white">
    <TheNavbar />
    <!-- Header -->
    <header
      class="relative z-10 pt-20 md:pt-32 px-4 md:px-8 pb-12 md:pb-20 text-center overflow-hidden"
    >
      <!-- Background Effects & Trames -->
      <div class="absolute inset-0 -z-10 pointer-events-none select-none">
        <!-- Main Aura -->
        <div
          class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-radial-gradient from-accent/10 to-transparent blur-3xl opacity-50"
        ></div>

        <!-- Micro Dots Trame -->
        <div
          class="absolute inset-0 bg-dots-premium bg-size-[32px_32px] mask-[radial-gradient(ellipse_at_center,black,transparent_80%)] opacity-60"
        ></div>

        <!-- Large Tech Grid -->
        <div
          class="absolute inset-0 bg-grid-premium bg-size-[100px_100px] mask-[linear-gradient(to_bottom,black,transparent)] opacity-40"
        ></div>
      </div>

      <div class="max-w-[800px] mx-auto animate-fade-in">
        <div
          class="font-mono text-[9px] md:text-[10px] tracking-[3px] md:tracking-[6px] uppercase mb-4 font-bold text-accent"
        >
          [ PLATFORME — v1.0 ]
        </div>

        <h1
          class="font-display font-black text-white uppercase mb-8 leading-[0.8] tracking-tighter text-4xl sm:text-6xl md:text-8xl lg:text-9xl drop-shadow-2xl"
        >
          *RP/STORIES
        </h1>

        <p
          class="font-mono text-[11px] md:text-sm text-white/70 max-w-[650px] mx-auto leading-[1.8] tracking-wide px-2"
        >
          <span :style="{ color: hubColors.accent }" class="font-bold"
            >// ÉCOSYSTÈME NARRATIF ROLEPLAY //</span
          >
          <br />
          Archivez vos héritages, optimisez vos whitelists et forgez des backgrounds d'exception.
          *RP/STORIES centralise vos parcours pour devenir le standard de votre identité numérique.
          <br />
          <br />
          <span
            class="font-bold text-[9px] md:text-[10px] tracking-[3px] md:tracking-[8px] text-white"
            >COMPATIBLE <span :style="{ color: hubColors.accent }">FIVEM</span> &
            <span :style="{ color: hubColors.accent }">REDM</span></span
          >
        </p>
      </div>
    </header>

    <!-- Main Grid -->
    <main class="relative z-10 max-w-[1400px] mx-auto px-4 md:px-8 pb-16 md:pb-32">
      <!-- Tab Switcher -->
      <div class="flex flex-wrap items-center justify-center gap-4 mb-10 max-w-[800px] mx-auto border-b border-white/5 pb-6">
        <button
          @click="activeTab = 'public'"
          class="font-mono text-[10px] tracking-[2px] uppercase px-4 py-2 rounded-lg transition-all cursor-pointer font-bold"
          :class="activeTab === 'public' ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.2)]' : 'text-white/40 hover:text-white hover:bg-white/5'"
        >
          // Archives Publiques
        </button>

        <button
          v-if="authState.user"
          @click="activeTab = 'my_fiches'"
          class="font-mono text-[10px] tracking-[2px] uppercase px-4 py-2 rounded-lg transition-all cursor-pointer font-bold"
          :class="activeTab === 'my_fiches' ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.2)]' : 'text-white/40 hover:text-white hover:bg-white/5'"
        >
          // Mes Dossiers
        </button>

        <button
          v-if="authState.user"
          @click="activeTab = 'followed'"
          class="font-mono text-[10px] tracking-[2px] uppercase px-4 py-2 rounded-lg transition-all cursor-pointer font-bold"
          :class="activeTab === 'followed' ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.2)]' : 'text-white/40 hover:text-white hover:bg-white/5'"
        >
          // Suivis
        </button>
      </div>

      <div v-if="isLoading" class="py-20 flex justify-center items-center">
        <div class="size-10 border-2 border-accent border-t-transparent rounded-full animate-spin"></div>
      </div>
      
      <div v-else-if="charList.length === 0 && activeTab !== 'my_fiches'" class="py-20 text-center flex flex-col items-center">
        <div class="font-mono text-[10px] text-accent tracking-[3px] uppercase font-bold mb-2">0 RÉSULTAT</div>
        <div class="text-white/40 text-sm max-w-md">Aucun dossier ne correspond à votre niveau d'accréditation ou aucune fiche n'a encore été archivée.</div>
      </div>

      <div v-else :class="charList.length === 0 ? 'flex justify-center py-10' : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8'">
        <CreateCard
          v-if="activeTab === 'my_fiches'"
          :class="charList.length === 0 ? 'w-full max-w-[310px]' : ''"
          ref="createCardRef"
          @create="
            router.push({
              name: 'create',
              query: {
                accent: hubColors.accent,
                accent2: hubColors.accent2,
                accentRgb: hubColors.accentRgb,
              },
            })
          "
        />
        <HubCard v-for="(char, idx) in charList" :key="char.id" :char="char" :index="idx" />
      </div>
    </main>

    <!-- Mobile Floating Action Button (FAB) - GHOST PROTOCOL EDITION -->
    <Transition name="fab-fade">
      <button
        v-if="!isCreateCardVisible"
        class="sm:hidden fixed bottom-8 right-6 z-50 flex items-center gap-4 pl-6 pr-2 py-2 rounded-full bg-[#050505]/90 backdrop-blur-2xl border border-white/5 text-white/40 shadow-2xl active:scale-95 transition-all group overflow-hidden"
        @click="
          router.push({
            name: 'create',
            query: {
              accent: hubColors.accent,
              accent2: hubColors.accent2,
              accentRgb: hubColors.accentRgb,
            },
          })
        "
      >
        <!-- Scanning Light Effect -->
        <div
          class="absolute inset-0 bg-linear-to-r from-transparent via-accent/10 to-transparent -translate-x-full group-active:animate-scan pointer-events-none"
        ></div>

        <span
          class="font-mono text-[9px] tracking-[4px] uppercase group-active:text-white transition-colors relative z-10"
          >New Archive</span
        >

        <div
          class="size-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/30 group-active:bg-accent group-active:text-black group-active:border-accent transition-all duration-500 relative z-10"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="size-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </div>
      </button>
    </Transition>

    <!-- Friend List Button (placeholder) -->
    <FriendListBtn />

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
