<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  char: { type: Object, required: true }
})

const titleHTML = computed(() => {
  const lines = props.char.titleLines
  if (!lines || lines.length < 2) return lines?.[0] || ''
  const cls = lines[2] || 'text-accent'
  return `${lines[0]}<br><span class="${cls}">${lines[1]}</span>`
})
</script>

<template>
  <div class="mb-10 group">
    <div class="font-mono text-[10px] text-accent tracking-[5px] uppercase mb-2 flex items-center gap-4">
      <span class="flex-none">{{ char.label }}</span>
      <div class="flex-1 h-px bg-gradient-to-r from-accent/40 to-transparent"></div>
    </div>
    
    <h1 class="font-display font-extrabold text-4xl md:text-5xl uppercase leading-[0.95] tracking-tighter text-white" 
        v-html="titleHTML">
    </h1>
  </div>
</template>

<style scoped>
@reference "../assets/main.css";

/* On garde uniquement les injections dynamiques qui ne peuvent pas être en Tailwind pur facilement sans plugin complexe */
:deep(.text-accent) {
  @apply text-accent;
}
:deep(.text-accent-alt) {
  @apply text-accent-alt;
}
</style>
