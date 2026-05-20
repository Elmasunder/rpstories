<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { authState } from '@/store/auth'

const isScrolled = ref(false)
const route = useRoute()
const router = useRouter()

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const isFicheView = computed(() => route.name === 'fiche')

const menuItems = [
  { name: 'Identité', id: 'identite' },
  { name: 'Histoire', id: 'histoire' },
  { name: 'Aptitudes', id: 'aptitudes' },
  { name: 'Entourage', id: 'entourage' },
  { name: 'Objectifs', id: 'objectifs' },
]

const scrollToSection = (id: string) => {
  const element = document.getElementById(id)
  if (element) {
    const offset = 100
    const bodyRect = document.body.getBoundingClientRect().top
    const elementRect = element.getBoundingClientRect().top
    const elementPosition = elementRect - bodyRect
    const offsetPosition = elementPosition - offset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    })
  }
}

const logout = async () => {
  await authState.signOut()
  router.push({ name: 'hub' })
}
</script>

<template>
  <nav
    class="fixed top-0 left-0 right-0 z-100 transition-all duration-500 border-b"
    :class="[
      isScrolled
        ? 'bg-bg/80 backdrop-blur-md py-3 border-white/10 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)]'
        : 'bg-transparent py-5 border-transparent',
    ]"
  >
    <div class="max-w-[1400px] mx-auto px-4 sm:px-8 flex items-center justify-between">
      <!-- GAUCHE : RETOUR HUB -->
      <div class="flex items-center justify-start flex-1">
        <RouterLink
          v-if="route.name !== 'hub'"
          to="/"
          class="flex items-center gap-2 sm:gap-3 font-mono text-[10px] sm:text-[11px] text-white hover:text-accent transition-all group drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
        >
          <span class="opacity-50 group-hover:translate-x-[-4px] transition-transform">←</span>
          <span class="uppercase tracking-[2px] sm:tracking-[3px] font-bold">Retour Hub</span>
        </RouterLink>
      </div>

      <!-- CENTRE : ANCRES (seulement sur la fiche personnage) -->
      <div v-if="isFicheView" class="hidden lg:flex items-center gap-10 flex-1 justify-center">
        <button
          v-for="item in menuItems"
          :key="item.name"
          @click="scrollToSection(item.id)"
          class="font-mono text-[11px] text-white/90 hover:text-white transition-all uppercase tracking-[4px] relative group cursor-pointer drop-shadow-[0_0_5px_rgba(255,255,255,0.2)] hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
        >
          {{ item.name }}
          <span
            class="absolute -bottom-1.5 left-0 w-0 h-px bg-accent transition-all group-hover:w-full shadow-[0_0_8px_var(--accent)]"
          ></span>
        </button>
      </div>
      <div v-else class="hidden lg:block flex-1"></div>

      <!-- DROITE : AUTH -->
      <div class="flex items-center flex-1 justify-end">
        <!-- Logged In State -->
        <div v-if="authState.user" class="flex items-center gap-4">
          <div class="flex items-center gap-2">
            <img
              v-if="authState.profile?.avatar_url"
              :src="authState.profile.avatar_url"
              class="size-7 rounded-full border border-white/20 object-cover"
            />
            <div
              v-else
              class="size-7 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center font-mono text-xs font-bold text-accent"
            >
              {{ authState.profile?.username?.charAt(0).toUpperCase() || 'U' }}
            </div>
            <span class="font-mono text-[9px] uppercase tracking-[2px] text-white/80 hidden sm:inline">
              {{ authState.profile?.username }}
            </span>
          </div>
          <button
            @click="logout"
            class="font-mono text-[9px] border border-white/10 hover:border-dead hover:text-dead px-3 py-2 rounded-lg transition-all uppercase tracking-[2px] cursor-pointer"
          >
            Déconnexion
          </button>
        </div>

        <!-- Logged Out State -->
        <div v-else class="flex items-center gap-4">
          <RouterLink
            to="/login?mode=register"
            class="font-mono text-[10px] text-white/80 hover:text-white px-6 py-2.5 rounded-sm font-bold uppercase tracking-[2px] border border-white/10 hover:border-accent/40 hover:bg-white/5 transition-all active:scale-95"
          >
            Inscription
          </RouterLink>
          <RouterLink
            to="/login"
            class="font-mono text-[10px] bg-white text-black px-6 py-2.5 rounded-sm font-bold uppercase tracking-[2px] border border-transparent transition-all shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:shadow-[0_0_20px_var(--accent)] active:scale-95 hover:bg-white hover:text-black hover:opacity-90"
          >
            Connexion
          </RouterLink>
        </div>
      </div>
    </div>
  </nav>
</template>
