<script setup lang="ts">
import { RouterView } from 'vue-router'
import AmbientGlow from '@/components/AmbientGlow.vue'
</script>

<template>
  <AmbientGlow />
  <RouterView v-slot="{ Component }">
    <transition name="fade-page" mode="out-in">
      <component :is="Component" />
    </transition>
  </RouterView>
</template>
