<script setup lang="ts">
import { ref } from 'vue'

const isOpen = ref(false)

const toggleList = () => {
  isOpen.value = !isOpen.value
}

// Mock data pour la simulation UI/UX
const friends = [
  { name: 'Marcus Sterling', codename: 'MARCUS' },
  { name: 'Elena Volkov', codename: 'KRYPT' },
  { name: 'Larry Pils', codename: 'GHOST' },
  { name: 'Amari Davis', codename: 'APEX' },
  { name: 'Isabella Sterling', codename: 'NYX' }
]
</script>

<template>
  <div 
    class="hidden sm:block fixed bottom-8 right-6 z-40 group" 
    :class="isOpen ? 'opacity-100' : 'opacity-20 hover:opacity-100 transition-opacity duration-300'"
    @mouseleave="isOpen = false"
  >

    <!-- PANEL FRIEND LIST -->
    <transition
      enter-active-class="transition ease-out duration-300"
      enter-from-class="opacity-0 translate-y-4 scale-95"
      enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="opacity-100 translate-y-0 scale-100"
      leave-to-class="opacity-0 translate-y-4 scale-95"
    >
      <div v-if="isOpen" class="absolute bottom-12 right-0 pb-6 origin-bottom-right z-10 w-[300px]">
        <div class="relative w-full bg-bg/80 backdrop-blur-3xl border border-white/10 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col">
          <!-- Noise subtil pour le panel -->
          <div class="absolute inset-0 z-0 pointer-events-none mix-blend-overlay opacity-5" style="background-image: url('https://www.ui-layouts.com/noise.gif')"></div>

          <!-- Header -->
        <div class="relative z-10 px-6 py-4 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
          <span class="font-mono text-[10px] tracking-[4px] text-accent uppercase font-bold text-glow">Friend List</span>
        </div>

        <!-- List -->
        <div class="relative z-10 flex flex-col py-2 max-h-[380px] overflow-y-auto custom-scrollbar">
          <div
            v-for="friend in friends"
            :key="friend.codename"
            class="px-6 py-3 flex items-center gap-4 hover:bg-white/5 transition-colors duration-200 cursor-pointer group/item"
          >
            <!-- Info -->
            <div class="flex flex-col flex-1 min-w-0">
              <span 
                class="font-display font-bold text-[13px] tracking-wide text-white/80 group-hover/item:text-white transition-colors truncate"
              >
                {{ friend.name }}
              </span>
              <span 
                class="font-mono text-[9px] text-white/40 group-hover/item:text-accent tracking-wider uppercase mt-0.5 truncate transition-colors"
              >
                Codename: {{ friend.codename }}
              </span>
            </div>
            
            <!-- Action Button (View Hub) -->
            <div class="opacity-0 group-hover/item:opacity-100 transition-opacity duration-300">
              <div class="font-mono text-[8px] border border-white/10 group-hover/item:border-accent/50 group-hover/item:bg-accent/10 text-white px-2 py-1 rounded uppercase tracking-widest transition-all">
                View Hub
              </div>
            </div>
          </div>
        </div>
        
        <!-- Footer / Action -->
        <div class="relative z-10 px-6 py-3 border-t border-white/5 bg-black/20 hover:bg-white/5 transition-colors cursor-pointer flex items-center justify-center group/btn">
          <span class="font-mono text-[9px] text-white/40 group-hover/btn:text-white transition-colors uppercase tracking-[3px]">+ Invite Ally</span>
        </div>
        </div>
      </div>
    </transition>

    <!-- Bouton Toggle -->
    <button
      class="
        relative flex items-center justify-start
        h-12 group
        pl-3
        overflow-hidden rounded-full
        backdrop-blur-2xl
        transition-all duration-400 ease-out z-10
        active:scale-95
      "
      :class="[
        isOpen 
          ? 'w-44 bg-accent/10 border border-accent/40 text-accent shadow-[0_0_30px_rgba(var(--accent-rgb),0.3)]' 
          : 'w-12 hover:w-44 bg-[#050505]/90 border border-white/5 hover:border-white/10 text-white/35 hover:text-white/60 shadow-2xl'
      ]"
      @click="toggleList"
      title="Network"
    >
      <!-- Icône Portrait -->
      <div class="size-6 flex-none flex items-center justify-center transition-transform duration-300" :class="isOpen ? 'scale-110' : ''">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="size-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="12" cy="8" r="3.5" />
          <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
        </svg>
      </div>

      <!-- Séparateur + Label -->
      <div
        class="flex items-center gap-3 pl-3 whitespace-nowrap flex-none transition-all duration-300"
        :class="isOpen ? 'opacity-100 delay-0 translate-x-0' : 'opacity-0 delay-100 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'"
      >
        <div class="w-px h-4 flex-shrink-0 transition-colors duration-300" :class="isOpen ? 'bg-accent/40' : 'bg-white/10'"></div>
        <span class="font-mono text-[9px] tracking-[3px] uppercase font-bold">
          Friend List
        </span>
      </div>
    </button>

  </div>
</template>

<style scoped>
/* Scrollbar ultra discrète pour le panel Network */
.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { 
  background: rgba(255,255,255,0.1); 
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
</style>
