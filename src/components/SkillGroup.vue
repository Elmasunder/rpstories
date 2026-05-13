<script setup lang="ts">
import type { SkillsGroup } from '@/types/character'

defineProps<{
  group: SkillsGroup
}>()
</script>

<template>
  <div class="space-y-6">
    <div class="font-mono text-[10px] text-accent tracking-[3px] uppercase flex items-center gap-3">
      <span class="opacity-70">//</span>
      {{ group.title }}
    </div>
    
    <div class="space-y-5">
      <div v-for="skill in group.skills" :key="skill.name" class="group">
        <div class="flex justify-between items-end mb-1.5 px-1">
          <span class="font-display font-bold text-[13px] uppercase tracking-wide text-white/90 group-hover:text-white transition-colors">
            {{ skill.name }}
          </span>
          <span class="font-mono text-[10px] text-accent font-bold tabular-nums">
            {{ skill.percent }}%
          </span>
        </div>
        
        <div class="h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5 shadow-inner">
          <div 
            class="h-full bg-gradient-to-r from-accent to-accent-alt transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(var(--accent-rgb),0.3)]"
            :style="{ width: `${skill.percent}%` }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>
