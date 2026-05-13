<script setup lang="ts">
/**
 * FICHEVIEW - MOTEUR DE RENDU DES DOSSIERS
 */
import { computed, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { characters } from '@/data/index.ts'
import { getCharColors } from '@/utils/colors.ts'
import { uiState } from '@/store/ui.ts'
import ChapterHeader from '@/components/ChapterHeader.vue'
import SkillGroup from '@/components/SkillGroup.vue'
import FamilyTree from '@/components/FamilyTree.vue'
import TheNavbar from '@/components/TheNavbar.vue'

const route = useRoute()

// Récupération du personnage via le paramètre :id de l'URL
const char = computed(() => characters[route.params.id as string])

/**
 * CALCUL DES COULEURS D'ACCENT
 */
const charColors = computed(() => {
  if (!char.value || char.value.cover.status === 'dead') {
    return { accent: '', accent2: '', accentRgb: '', accent2Rgb: '' }
  }
  return getCharColors(char.value.id)
})

/**
 * GESTION DU TITRE DU NAVIGATEUR ET DE L'ATMOSPHÈRE
 */
const updateAtmosphere = () => {
  if (char.value) {
    document.title = `${char.value.cover.firstName} ${char.value.cover.lastName} | RP/Stories`
    
    // Mise à jour de la Meta Description
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      metaDesc.setAttribute('content', `Dossier RP de ${char.value.cover.firstName} ${char.value.cover.lastName} : ${char.value.cover.subtitle} sur ${char.value.cover.destination}.`)
    }
    
    const color = char.value.cover.status === 'dead' ? '231, 76, 60' : charColors.value.accentRgb
    uiState.setAccent(color)
  }
}

// Handlers d'erreur images
const handleComplexImgError = (event: Event) => {
  const target = event.target as HTMLElement | null
  if (target && target.parentElement && target.parentElement.parentElement) {
    target.parentElement.parentElement.style.display = 'none'
  }
}

const handleSimpleImgError = (event: Event) => {
  const target = event.target as HTMLElement | null
  if (target) {
    target.style.display = 'none'
  }
}

onMounted(() => {
  updateAtmosphere()
  window.scrollTo(0, 0)
})

onUnmounted(() => {
  uiState.resetAccent()
})

watch(char, updateAtmosphere)
</script>

<template>
  <div 
    v-if="char" 
    :class="{ 'theme-dead': char.cover.status === 'dead' }"
    :style="char.cover.status !== 'dead' ? { 
      '--accent': charColors.accent, 
      '--accent2': charColors.accent2,
      '--accent-rgb': charColors.accentRgb
    } : {}"
    class="relative"
  >
    <!-- BARRE DE NAVIGATION PREMIUM -->
    <TheNavbar />

    <!-- SECTION 1 : COVER -->
    <header class="cover">
      <div class="cover-bg"></div>
      <div class="cover-photo-strip">
        <div
          v-for="photo in char.cover.photos"
          :key="photo"
          class="cover-photo"
          :style="{ backgroundImage: `url('${photo}')` }"
        ></div>
      </div>

      <div class="cover-content">
        <div class="cover-eyebrow">{{ char.cover.eyebrow }}</div>
        <div class="cover-name" :class="{ 'name--dead': char.cover.status === 'dead' }">
          {{ char.cover.firstName }}<br><span class="last">{{ char.cover.lastName }}</span>
        </div>
        
        <div v-if="char.cover.status === 'dead'" class="cover-status-badge">DECEASED // CK</div>
        
        <div class="cover-alias-row">
          <div class="cover-alias">
            Surnommé <span>"{{ char.cover.alias }}"</span> — {{ char.cover.subtitle }} <span>{{char.cover.destination }}</span>
          </div>
          <a
            v-if="char.cover.serverDomain"
            :href="`https://${char.cover.serverDomain}`"
            target="_blank"
            rel="noopener noreferrer"
            class="server-link-fiche"
          >
            <img
              :src="`https://www.google.com/s2/favicons?domain=${char.cover.serverDomain}&sz=128`"
              class="server-logo-fiche"
              :alt="`Logo ${char.cover.serverDomain}`"
            />
          </a>
        </div>
        
        <div class="cover-meta-row">
          <div v-for="m in char.cover.meta" :key="m.key" class="cover-meta">
            <span class="cover-meta-val">{{ m.value }}</span>
            <span class="cover-meta-key">{{ m.key }}</span>
          </div>
          <div class="cover-ref" v-html="char.cover.ref"></div>
        </div>
      </div>
    </header>

    <main>
      <!-- CHAPITRE I : IDENTITÉ -->
      <section id="identite" class="page scroll-mt-24 pt-14">
        <ChapterHeader :char="{ label: char.chapter1.label, titleLines: char.chapter1.titleLines }" />

        <div class="identity-grid">
          <dl v-for="(panel, pi) in char.chapter1.identityPanels" :key="pi" class="identity-panel">
            <div v-for="row in panel" :key="row.key" class="identity-row">
              <dt class="identity-key">{{ row.key }}</dt>
              <dd class="identity-value" :class="row.class || ''">{{ row.value }}</dd>
            </div>
          </dl>
        </div>

        <div class="divider">
          <div class="divider-line"></div>
          <div class="divider-label">Profil Psychologique</div>
          <div class="divider-line divider-line--right"></div>
        </div>

        <div class="identity-grid">
          <div class="identity-panel">
            <div class="identity-row identity-row--stacked">
              <span class="identity-key">Points Forts</span>
              <ul class="tags">
                <li v-for="q in char.chapter1.profile.qualities" :key="q" class="tag tag--positive">{{ q }}</li>
              </ul>
            </div>
          </div>
          <div class="identity-panel">
            <div class="identity-row identity-row--stacked">
              <span class="identity-key">Points Faibles</span>
              <ul class="tags">
                <li v-for="f in char.chapter1.profile.flaws" :key="f" class="tag tag--negative">{{ f }}</li>
              </ul>
            </div>
          </div>
        </div>

        <aside v-if="char.chapter1.specialInfo" class="field-note">
          <div class="field-note-icon">{{ char.chapter1.specialInfo.icon }}</div>
          <div class="field-note-content">
            <strong>{{ char.chapter1.specialInfo.title }}</strong><br>
            {{ char.chapter1.specialInfo.text }}
          </div>
        </aside>
      </section>

      <!-- CHAPITRES NARRATIFS (Histoire) -->
      <section id="histoire" class="scroll-mt-24">
        <div class="page">
          <ChapterHeader :char="{ label: char.chapter2.label, titleLines: char.chapter2.titleLines }" />
          <article class="story clearfix">
            <aside v-if="char.chapter2.photo" class="photo-inset">
              <figure class="photo-frame">
                <img :src="char.chapter2.photo.url" :alt="char.chapter2.photo.alt" @error="handleComplexImgError">
                <figcaption class="photo-caption">{{ char.chapter2.photo.caption }}</figcaption>
              </figure>
            </aside>
            <p v-for="(p, i) in char.chapter2.story1" :key="i">{{ p }}</p>
            <p v-for="(p, i) in char.chapter2.story2" :key="i">{{ p }}</p>
            <blockquote class="quote">{{ char.chapter2.quote }}</blockquote>
          </article>
        </div>

        <div class="page">
          <ChapterHeader :char="{ label: char.chapter3.label, titleLines: char.chapter3.titleLines }" />
          <article class="story clearfix">
            <aside v-if="char.chapter3.photo" class="photo-inset">
              <figure class="photo-frame">
                <img :src="char.chapter3.photo.url" :alt="char.chapter3.photo.alt" @error="handleComplexImgError">
                <figcaption class="photo-caption">{{ char.chapter3.photo.caption }}</figcaption>
              </figure>
            </aside>
            <p v-for="(p, i) in char.chapter3.story1" :key="i">{{ p }}</p>
            <p v-for="(p, i) in char.chapter3.story2" :key="i" v-html="p"></p>
            <blockquote class="quote">{{ char.chapter3.quote }}</blockquote>
          </article>
        </div>
      </section>

      <!-- CHAPITRE IV : APTITUDES -->
      <section id="aptitudes" class="page scroll-mt-24">
        <ChapterHeader :char="{ label: char.chapter4.label, titleLines: char.chapter4.titleLines }" />
        <article class="story clearfix mb-10">
          <aside v-if="char.chapter4.photo" class="photo-inset">
            <figure class="photo-frame">
              <img :src="char.chapter4.photo.url" :alt="char.chapter4.photo.alt" @error="handleSimpleImgError">
              <figcaption class="photo-caption">{{ char.chapter4.photo.caption }}</figcaption>
            </figure>
          </aside>
          <p v-for="(p, i) in char.chapter4.story1" :key="i">{{ p }}</p>
        </article>
        
        <div class="identity-grid mb-10">
          <SkillGroup v-for="group in char.chapter4.skillsGroups" :key="group.title" :group="group" />
        </div>
      </section>

      <!-- ENTOURAGE -->
      <FamilyTree id="entourage" :family="char.family" class="scroll-mt-24" />

      <!-- CHAPITRE VI : OBJECTIFS -->
      <section id="objectifs" class="page scroll-mt-24">
        <ChapterHeader :char="{ label: char.chapter6.label, titleLines: char.chapter6.titleLines }" />
        
        <div class="objective-grid mb-10">
          <section>
            <h2 class="objective-title term-short">Court terme</h2>
            <article v-for="(obj, i) in char.chapter6.objectives.shortTerm" :key="i" class="objective-card term-short">{{ obj }}</article>
          </section>
          <section>
            <h2 class="objective-title term-medium">Moyen terme</h2>
            <article v-for="(obj, i) in char.chapter6.objectives.mediumTerm" :key="i" class="objective-card term-medium">{{ obj }}</article>
          </section>
          <section>
            <h2 class="objective-title term-long">Long terme</h2>
            <article v-for="(obj, i) in char.chapter6.objectives.longTerm" :key="i" class="objective-card term-long">{{ obj }}</article>
          </section>
        </div>

        <article class="story">
          <p v-for="(p, i) in char.chapter6.finaleStory" :key="i">{{ p }}</p>
          <blockquote class="quote">{{ char.chapter6.finaleQuote }}</blockquote>
        </article>
      </section>
    </main>

    <footer class="footnote" v-html="char.footer"></footer>
  </div>

  <div v-else class="page-error" style="color: var(--white); text-align: center; padding: 100px 20px;">
    <h1>Dossier Introuvable</h1>
    <RouterLink to="/" style="color: var(--accent); display: block; margin-top: 20px;">← Revenir au Hub Central</RouterLink>
  </div>
</template>
