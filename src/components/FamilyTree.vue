<script setup lang="ts">
import type { FamilyMember } from '@/types/character'
import { characters } from '@/data'
import ChapterHeader from './ChapterHeader.vue'

defineProps<{
  family?: FamilyMember[]
}>()

const getMemberPhoto = (member: FamilyMember) => {
  if (member.id && characters[member.id]) {
    return characters[member.id].cover.photos[0]
  }
  return 'assets/placeholder_user.webp'
}

const handleImgError = (e: Event) => {
  const img = e.target as HTMLImageElement
  img.src = 'assets/placeholder_user.webp'
}

const statusLabel = (status: string) => {
  switch (status) {
    case 'alive': return 'VIVANT'
    case 'dead': return 'DÉCÉDÉ'
    case 'missing': return 'DISPARU'
    case 'unknown': return 'INCONNU'
    default: return status.toUpperCase()
  }
}

const truncateRelation = (text: string) => {
  if (text.length <= 20) return text
  return text.substring(0, 17) + '...'
}
</script>

<template>
  <section v-if="family && family.length > 0" class="page mt-10">
    <ChapterHeader :char="{ label: 'Entourage', titleLines: ['Relations &', 'Proches'] }" />
    
    <div class="flex justify-center py-10">
      <div class="tree-grid">
        <div v-for="member in family" :key="member.name" class="relative flex flex-col items-center">
          <!-- Ligne de connexion décorative -->
          <div class="tree-line"></div>
          
          <component 
            :is="member.id ? 'router-link' : 'div'" 
            :to="member.id ? { name: 'fiche', params: { id: member.id } } : undefined"
            class="family-node"
            :class="[`status-${member.status}`, { 'is-link': member.id }]"
          >
            <div class="flex justify-between items-center mb-3">
              <span class="font-heading text-[0.7rem] tracking-[2px] uppercase text-[var(--accent)]">
                {{ truncateRelation(member.relation) }}
              </span>
              <span class="size-1 rounded-full bg-[var(--accent)]"></span>
            </div>
            
            <div class="flex justify-between items-center gap-2.5 mb-3">
              <div class="flex-1">
                <div class="font-heading text-[1.1rem] font-semibold text-white tracking-[1px]">
                  {{ member.name }}
                </div>
              </div>
              <div class="node-avatar">
                <img :src="getMemberPhoto(member)" :alt="member.name" @error="handleImgError">
              </div>
            </div>
            
            <div class="flex items-center gap-2 border-t border-white/5 pt-2.5">
              <span class="status-indicator"></span>
              <span class="status-text">{{ statusLabel(member.status) }}</span>
            </div>

            <!-- Effet de surbrillance au survol -->
            <div class="node-glow"></div>
          </component>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Grille — CSS Grid avec colonnes fixes pour un alignement parfait */
.tree-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, 240px);
  gap: 40px 30px;
  justify-content: center;
  width: 100%;
  max-width: 1100px;
  position: relative;
}

/* Ligne de connexion décorative */
.tree-line {
  position: absolute;
  top: -20px;
  width: 2px;
  height: 20px;
  background: linear-gradient(to bottom, transparent, var(--accent, #666));
  opacity: 0.5;
}

/* Carte de relation */
.family-node {
  width: 240px;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 15px;
  border-radius: 4px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  text-decoration: none;
  color: inherit;
  display: block;
}

.family-node.is-link {
  cursor: pointer;
  border-bottom: 2px solid var(--accent);
}

.family-node.is-link:hover {
  background: rgba(255, 255, 255, 0.07);
  transform: translateY(-5px);
  border-color: var(--accent);
}

.family-node:not(.is-link) {
  opacity: 0.5;
  filter: grayscale(0.8);
  cursor: default;
}

/* Avatar */
.node-avatar {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  border: 1px solid var(--accent, rgba(255,255,255,0.2));
  overflow: hidden;
  flex-shrink: 0;
  background: #111;
  box-shadow: 0 0 10px rgba(0,0,0,0.5);
}

.node-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Status indicators */
.status-indicator {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #666;
}

.status-text {
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 1px;
  color: rgba(255, 255, 255, 0.5);
}

/* Couleurs selon le statut */
.status-alive { --status-color: var(--accent, #3b82f6); }
.status-dead { --status-color: #e74c3c; }
.status-missing { --status-color: #f1c40f; }
.status-unknown { --status-color: #95a5a6; }

.status-alive .status-indicator { background: var(--status-color); box-shadow: 0 0 10px var(--status-color); }
.status-alive .status-text { color: var(--status-color); }
.status-alive.is-link { border-color: var(--status-color) !important; }

.status-dead .status-indicator { background: var(--status-color); box-shadow: 0 0 10px var(--status-color); }
.status-dead .status-text { color: var(--status-color); }
.status-dead { border-color: rgba(231, 76, 60, 0.4) !important; }
.status-dead .node-avatar { border-color: var(--status-color); box-shadow: 0 0 15px rgba(231, 76, 60, 0.3); }

.status-missing .status-indicator { background: var(--status-color); box-shadow: 0 0 10px var(--status-color); }
.status-missing .status-text { color: var(--status-color); }
.status-missing { border-color: rgba(241, 196, 15, 0.4) !important; }
.status-missing .node-avatar { border-color: var(--status-color); }

/* Avatar en noir et blanc pour les morts/disparus */
.status-dead .node-avatar img,
.status-missing .node-avatar img {
  filter: grayscale(1) contrast(1.1);
  opacity: 0.8;
}

/* Effet de Glow au survol */
.node-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at center, var(--accent) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.family-node:hover .node-glow {
  opacity: 0.1;
}
</style>
