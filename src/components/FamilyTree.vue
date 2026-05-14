<script setup lang="ts">
import type { FamilyMember } from '@/types/character'
import { characters } from '@/data/index'
import ChapterHeader from '@/components/ChapterHeader.vue'

defineProps<{
  label?: string
  titleLines?: string[]
  family?: FamilyMember[]
}>()

const PLACEHOLDER_PATH = `${import.meta.env.BASE_URL}assets/placeholder_user.webp`

const getMemberPhoto = (member: FamilyMember) => {
  if (member.id && characters[member.id]) {
    return characters[member.id].cover.photos[0]
  }
  return PLACEHOLDER_PATH
}

const handleImgError = (e: Event) => {
  const img = e.target as HTMLImageElement
  if (img.src !== PLACEHOLDER_PATH) {
    img.src = PLACEHOLDER_PATH
  }
}

const statusLabel = (status: string) => {
  switch (status) {
    case 'alive':
      return 'VIVANT'
    case 'dead':
      return 'DÉCÉDÉ'
    case 'missing':
      return 'DISPARU'
    case 'unknown':
      return 'INCONNU'
    default:
      return status.toUpperCase()
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'alive':
      return 'text-accent border-accent'
    case 'dead':
      return 'text-dead border-dead'
    case 'missing':
      return 'text-yellow-500 border-yellow-500'
    default:
      return 'text-muted border-border'
  }
}
</script>

<template>
  <section v-if="family && family.length > 0" class="py-10">
    <ChapterHeader :char="{ label: label || 'Entourage', titleLines: titleLines || ['Relations &', 'proches'] }" />

    <div class="flex justify-center py-10">
      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-[1200px] w-full px-4"
      >
        <div v-for="member in family" :key="member.name" class="relative group">
          <!-- Carte de relation -->
          <component
            :is="member.id ? 'router-link' : 'div'"
            :to="member.id ? { name: 'fiche', params: { id: member.id } } : undefined"
            class="block bg-panel backdrop-blur-md border border-white/10 p-5 rounded-lg transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:bg-panel-hover overflow-hidden relative"
            :style="member.id && (characters[member.id]?.cover?.status === 'dead' || characters[member.id]?.cover?.status === 'disparu') ? { 
              '--color-accent': '#e74c3c', 
              '--accent-rgb': '231, 76, 60' 
            } : {}"
            :class="[
              member.id
                ? 'cursor-pointer border-b-2 border-b-accent'
                : 'opacity-60 grayscale-[0.5]',
            ]"
          >
            <!-- Header Relation -->
            <div class="flex justify-between items-start mb-4 h-8">
              <span class="font-mono text-[9px] tracking-[3px] uppercase text-accent font-bold leading-tight">
                {{ member.relation }}
              </span>
              <span
                class="size-1 rounded-full bg-accent animate-pulse shadow-[0_0_8px_rgba(var(--accent-rgb),1)] mt-1"
              ></span>
            </div>

            <!-- Member Info -->
            <div class="flex justify-between items-center gap-4 mb-4">
              <div class="flex-1">
                <div
                  class="font-display text-lg font-extrabold text-white tracking-tight leading-tight group-hover:text-accent transition-colors"
                >
                  {{ member.name }}
                </div>
              </div>
              <div
                class="size-14 rounded-full border-2 border-accent/30 overflow-hidden bg-black shadow-lg flex-none transition-transform group-hover:scale-110 duration-500"
              >
                <img
                  :src="getMemberPhoto(member)"
                  class="size-full object-cover transition-all"
                  :class="{ 'grayscale brightness-75': member.status !== 'alive' }"
                  :alt="member.name"
                  @error="handleImgError"
                />
              </div>
            </div>

            <!-- Status -->
            <div class="flex items-center gap-2 border-t border-white/5 pt-3 mt-1">
              <span
                class="size-1.5 rounded-full"
                :class="getStatusColor(member.status).split(' ')[1].replace('border', 'bg')"
              ></span>
              <span
                class="font-mono text-[9px] font-bold tracking-widest"
                :class="getStatusColor(member.status).split(' ')[0]"
              >
                {{ statusLabel(member.status) }}
              </span>
            </div>

            <!-- Glow Effect -->
            <div
              class="absolute inset-0 bg-radial-gradient from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
            ></div>
          </component>
        </div>
      </div>
    </div>
  </section>
</template>
