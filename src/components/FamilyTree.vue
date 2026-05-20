<script setup lang="ts">
import type { FamilyMember } from '@/types/character'
import ChapterHeader from '@/components/ChapterHeader.vue'

defineProps<{
  label?: string
  titleLines?: string[]
  family?: FamilyMember[]
}>()

const PLACEHOLDER_PATH = `${import.meta.env.BASE_URL}assets/placeholder_user.webp`

// Résout les chemins relatifs d'assets (même logique que dans FicheView)
const fixPath = (path: string | undefined) => {
  if (!path) return PLACEHOLDER_PATH
  if (path.startsWith('http') || path.startsWith('data:')) return path
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  return `${import.meta.env.BASE_URL}${cleanPath}`
}

// Retourne la vraie photo du membre s'il en a une, sinon le placeholder
const getMemberPhoto = (member: FamilyMember) => {
  return member.photo ? fixPath(member.photo) : PLACEHOLDER_PATH
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
    <ChapterHeader
      :char="{ label: label || 'Entourage', titleLines: titleLines || ['Relations &', 'proches'] }"
    />

    <div class="flex justify-center py-10">
      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-[1200px] w-full px-4"
      >
        <div v-for="member in family" :key="member.name" class="relative group">
          <!-- Carte de relation -->
          <component
            :is="member.id ? 'router-link' : 'div'"
            :to="member.id ? { name: 'fiche', params: { id: member.id }, query: { status: member.status } } : undefined"
            class="block bg-panel backdrop-blur-md border border-white/10 p-5 rounded-lg transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:bg-panel-hover overflow-hidden relative"
            :style="
              member.status === 'dead'
                ? {
                    '--color-accent': '#e74c3c',
                    '--accent-rgb': '231, 76, 60',
                  }
                : {}
            "
            :class="[
              member.id
                ? 'cursor-pointer border-b-2 border-b-accent'
                : 'opacity-60 grayscale-[0.5]',
            ]"
          >
            <!-- Header Relation -->
            <div class="flex justify-between items-start mb-4 h-8">
              <span
                class="font-mono text-[9px] tracking-[3px] uppercase text-accent font-bold leading-tight"
              >
                {{ member.relation }}
              </span>
              <span
                class="size-1 rounded-full bg-accent animate-pulse shadow-[0_0_8px_rgba(var(--accent-rgb),1)] mt-1"
              ></span>
            </div>

            <!-- Member Info -->
            <div class="flex justify-between items-center gap-4 mb-4">
              <div class="flex-1 min-w-0">
                <div
                  class="font-display text-lg font-extrabold text-white tracking-tight leading-tight group-hover:text-accent transition-colors break-words line-clamp-2"
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
        <!-- Bloc Référencement — Banner 2 colonnes -->
        <div class="relative group/invite col-span-1 sm:col-span-2">
          <div
            class="bg-panel backdrop-blur-md border border-white/10 border-b-2 border-b-accent p-5 rounded-lg transition-all duration-500 hover:border-accent/20 overflow-hidden relative flex items-center gap-6"
          >
            <!-- Fond gradient -->
            <div
              class="absolute inset-0 bg-linear-to-r from-accent/4 via-transparent to-transparent opacity-0 group-hover/invite:opacity-100 transition-opacity duration-700 pointer-events-none"
            ></div>

            <!-- GAUCHE : Texte -->
            <div class="flex-1 min-w-0 relative z-10">
              <div
                class="font-mono text-[8px] tracking-[4px] uppercase text-accent/30 font-bold mb-2 group-hover/invite:text-accent/50 transition-colors"
              >
                // RÉSEAU · EXPAND
              </div>
              <div
                class="font-display text-xl font-extrabold tracking-tight leading-tight text-white/40 group-hover/invite:text-white/70 transition-colors duration-300 mb-2"
              >
                Ton réseau est
                <span
                  class="text-accent/40 group-hover/invite:text-accent transition-colors duration-300"
                  >incomplet.</span
                >
              </div>
              <p
                class="font-mono text-[10px] text-white/20 leading-relaxed group-hover/invite:text-white/35 transition-colors duration-300 max-w-sm"
              >
                Chaque allié sur *RP/STORIES enrichit ton arbre de connexions inter-profils. Les
                relations liées à ton compte apparaissent directement ici.
              </p>
            </div>

            <!-- Séparateur vertical -->
            <div
              class="w-px self-stretch bg-white/5 group-hover/invite:bg-accent/10 transition-colors duration-500 hidden sm:block relative z-10"
            ></div>

            <!-- DROITE : Icône + CTA -->
            <div class="flex flex-col items-center gap-4 shrink-0 relative z-10">
              <!-- Icône -->
              <div
                class="size-14 rounded-full border-2 border-dashed border-white/10 flex items-center justify-center text-white/15 group-hover/invite:border-accent/30 group-hover/invite:text-accent/50 group-hover/invite:bg-accent/5 transition-all duration-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="size-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <circle cx="9" cy="7" r="3" />
                  <path d="M2 21c0-3.3 3.1-6 7-6" />
                  <line x1="19" y1="11" x2="19" y2="17" />
                  <line x1="16" y1="14" x2="22" y2="14" />
                </svg>
              </div>
              <!-- CTA -->
              <span
                class="font-mono text-[9px] font-bold tracking-widest text-white/20 group-hover/invite:text-accent transition-colors duration-300 uppercase whitespace-nowrap"
              >
                → Inviter un allié
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
