<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const isScrolled = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

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
          to="/"
          class="flex items-center gap-2 sm:gap-3 font-mono text-[10px] sm:text-[11px] text-white hover:text-accent transition-all group drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
        >
          <span class="opacity-50 group-hover:translate-x-[-4px] transition-transform">←</span>
          <span class="uppercase tracking-[2px] sm:tracking-[3px] font-bold">Retour Hub</span>
        </RouterLink>
      </div>

      <!-- CENTRE : ANCRES -->
      <div class="hidden lg:flex items-center gap-10 flex-1 justify-center">
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

      <!-- DROITE : AUTH / MOBILE MENU -->
      <div class="flex items-center flex-1 justify-end">
        <!-- Desktop Buttons -->
        <div class="hidden sm:flex items-center gap-4 sm:gap-8">
          <button
            class="font-mono text-[11px] text-white/80 hover:text-white transition-colors uppercase tracking-[3px] drop-shadow-[0_0_5px_rgba(255,255,255,0.2)]"
          >
            Login
          </button>
          <button
            class="font-mono text-[10px] bg-white text-black px-6 py-2.5 rounded-sm font-bold uppercase tracking-[2px] border border-transparent hover:border-accent transition-all shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:shadow-[0_0_20px_var(--accent)] active:scale-95"
          >
            Sign Up
          </button>
        </div>

        <!-- Mobile Hamburger -->
        <button class="sm:hidden p-2 text-white/60 hover:text-white transition-colors">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="size-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </div>
    </div>
  </nav>
</template>
