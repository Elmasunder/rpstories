<script setup lang="ts">
import type { FamilyMember } from '@/types/character'
import { characters } from '@/data'
import ChapterHeader from './ChapterHeader.vue'

defineProps<{
  family?: FamilyMember[]
}>()

const getMemberPhoto = (member: FamilyMember) => {
  if (member.id && characters[member.id]) {
    // On prend la première photo de la liste de couverture
    return characters[member.id].cover.photos[0]
  }
  // Chemin vers ton futur placeholder
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
  <section v-if="family && family.length > 0" class="page family-section">
    <ChapterHeader :char="{ label: 'Entourage', titleLines: ['Relations &', 'Proches'] }" />
    
    <div class="family-tree-container">
      <div class="tree-grid">
        <div v-for="member in family" :key="member.name" class="node-wrapper">
          <!-- La ligne de connexion (décorative) -->
          <div class="tree-line"></div>
          
          <component 
            :is="member.id ? 'router-link' : 'div'" 
            :to="member.id ? { name: 'fiche', params: { id: member.id } } : undefined"
            class="family-node"
            :class="[`status-${member.status}`, { 'is-link': member.id }]"
          >
            <div class="node-header">
              <span class="node-relation">{{ truncateRelation(member.relation) }}</span>
              <span class="node-dot"></span>
            </div>
            
            <div class="node-body">
              <div class="node-info">
                <div class="node-name">{{ member.name }}</div>
              </div>
              <div class="node-avatar">
                <img :src="getMemberPhoto(member)" :alt="member.name" @error="handleImgError">
              </div>
            </div>
            
            <div class="node-footer">
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
.family-section {
  margin-top: 40px;
}

.family-tree-container {
  padding: 40px 0;
  display: flex;
  justify-content: center;
}

.tree-grid {
  display: grid;
  /* On définit des colonnes de 240px (la largeur de tes cartes) */
  grid-template-columns: repeat(auto-fit, 240px);
  gap: 40px 30px; /* On augmente un peu l'espace vertical */
  justify-content: center;
  width: 100%;
  max-width: 1100px; /* Pour éviter que ça s'étale trop sur très grand écran */
  position: relative;
}

.node-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Ligne de connexion style "Dossier" */
.tree-line {
  position: absolute;
  top: -20px;
  width: 2px;
  height: 20px;
  background: linear-gradient(to bottom, transparent, var(--accent, #666));
  opacity: 0.5;
}

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

.node-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.node-relation {
  font-family: 'Oswald', sans-serif;
  font-size: 0.7rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--accent, #aaa);
}

.node-dot {
  width: 4px;
  height: 4px;
  background: var(--accent, #666);
  border-radius: 50%;
}

.node-body {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}

.node-info {
  flex: 1;
}

.node-name {
  font-family: 'Oswald', sans-serif;
  font-size: 1.1rem;
  font-weight: 600;
  color: #fff;
  letter-spacing: 1px;
}

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

.node-footer {
  display: flex;
  align-items: center;
  gap: 8px;
  border-top: 1px solid rgba(255,255,255,0.05);
  padding-top: 10px;
}

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
.status-dead .node-name, 
.status-dead .node-relation,
.status-dead .status-text { color: var(--status-color) !important; }
.status-dead .node-avatar { border-color: var(--status-color); box-shadow: 0 0 15px rgba(231, 76, 60, 0.3); }

.status-missing .status-indicator { background: var(--status-color); box-shadow: 0 0 10px var(--status-color); }
.status-missing .status-text { color: var(--status-color); }
.status-missing { border-color: rgba(241, 196, 15, 0.4) !important; }
.status-missing .node-name, 
.status-missing .node-relation { color: var(--status-color) !important; }
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
