<script setup lang="ts">
defineProps({
  group: { type: Object, required: true }
})
</script>

<template>
  <section>
    <h2 class="font-mono text-[11px] text-[var(--accent)] mb-6 tracking-[2px]">
      {{ group.title }}
    </h2>
    <ul class="list-none">
      <li v-for="skill in group.skills" :key="skill.name" class="mb-4">
        <div class="flex justify-between mb-1">
          <span class="font-display font-bold text-sm text-white uppercase">{{ skill.name }}</span>
          <span class="font-mono text-[11px] text-[var(--accent)]">{{ skill.percent }}%</span>
        </div>
        <div class="h-1 bg-border">
          <div
            class="h-full transition-[width] duration-1000 ease-out"
            :style="{ width: skill.percent + '%', background: `linear-gradient(90deg, var(--accent2), var(--accent))` }"
          ></div>
        </div>
      </li>
    </ul>
  </section>
</template>
