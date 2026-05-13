<script setup lang="ts">
/**
 * FICHEVIEW - MOTEUR DE RENDU DES DOSSIERS (Version Utility-First)
 */
import { computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { characters } from '@/data/index.ts'
import { getCharColors } from '@/utils/colors.ts'
import { uiState } from '@/store/ui.ts'
import ChapterHeader from '@/components/ChapterHeader.vue'
import SkillGroup from '@/components/SkillGroup.vue'
import FamilyTree from '@/components/FamilyTree.vue'
import TheNavbar from '@/components/TheNavbar.vue'

const route = useRoute()
const char = computed(() => characters[route.params.id as string])

const charColors = computed(() => {
  if (!char.value || char.value.cover.status === 'dead') {
    return { accent: '', accent2: '', accentRgb: '', accent2Rgb: '' }
  }
  return getCharColors(char.value.id)
})

const fixPath = (path: string) => {
  if (!path || path.startsWith('http') || path.startsWith('data:')) return path
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  return `${import.meta.env.BASE_URL}${cleanPath}`
}

const updateAtmosphere = () => {
  if (char.value) {
    document.title = `${char.value.cover.firstName} ${char.value.cover.lastName} | RP/Stories`
    
    // Application des couleurs via le Store Global
    if (char.value.cover.status === 'dead' || char.value.cover.status === 'disparu') {
      uiState.setColors('#e74c3c', '#e74c3c', '231, 76, 60')
    } else {
      uiState.setColors(charColors.value.accent, charColors.value.accent2, charColors.value.accentRgb)
    }

    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      metaDesc.setAttribute('content', `Dossier RP de ${char.value.cover.firstName} ${char.value.cover.lastName} : ${char.value.cover.subtitle} sur ${char.value.cover.destination}.`)
    }
  }
}

const handleImgError = (event: Event) => {
  const target = event.target as HTMLElement | null
  if (target) target.style.display = 'none'
}

onMounted(() => {
  updateAtmosphere()
  window.scrollTo(0, 0)
})

// On ne réinitialise plus les couleurs ici pour éviter le flash violet pendant la transition de sortie
watch(char, updateAtmosphere)
</script>

<template>
  <div v-if="char" class="relative min-h-screen bg-bg text-white">
    <TheNavbar />

    <!-- SECTION 1 : COVER -->
    <header class="relative h-[85vh] flex flex-col justify-end overflow-hidden">
      <!-- Background & Photos -->
      <div class="absolute inset-0 z-0">
        <div class="absolute inset-0 bg-gradient-to-t from-bg via-bg/70 to-transparent z-10"></div>
        <div class="grid grid-cols-3 h-full">
          <div
            v-for="photo in char.cover.photos.slice(0, 3)"
            :key="photo"
            class="bg-cover bg-center grayscale contrast-125 opacity-40 relative noise-overlay"
            :style="{ backgroundImage: `url('${fixPath(photo)}')` }"
          ></div>
        </div>
      </div>

      <!-- Content -->
      <div class="relative z-20 max-w-[1200px] mx-auto w-full px-12 pb-20">
        <div class="font-mono text-xs tracking-[5px] text-accent uppercase mb-3 opacity-80">
          {{ char.cover.eyebrow }}
        </div>
        <h1 class="font-display font-black text-6xl md:text-8xl lg:text-9xl uppercase leading-[0.85] tracking-tighter mb-6">
          {{ char.cover.firstName }}<br>
          <span class="text-accent">{{ char.cover.lastName }}</span>
        </h1>
        
        <div v-if="char.cover.status === 'dead'" class="inline-block bg-dead text-white px-4 py-1.5 font-mono text-xs font-bold tracking-widest uppercase mb-6 rounded">
          DECEASED // CK
        </div>
        
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 border-t border-white/10 pt-8 mt-4">
          <div class="font-mono text-sm tracking-[3px] uppercase">
            AKA <span class="text-accent2 font-bold">"{{ char.cover.alias }}"</span> 
            — {{ char.cover.subtitle }} <span class="text-accent2 opacity-80">{{ char.cover.destination }}</span>
          </div>
          
          <div class="flex gap-10">
            <div v-for="m in char.cover.meta" :key="m.key" class="flex flex-col">
              <span class="font-display font-bold text-2xl leading-none">{{ m.value }}</span>
              <span class="font-mono text-[10px] text-muted tracking-widest uppercase mt-1">{{ m.key }}</span>
            </div>
          </div>
        </div>
      </div>
    </header>

    <main class="max-w-[1080px] mx-auto px-8 md:px-12">
      <!-- CHAPITRE I : IDENTITÉ -->
      <section id="identite" class="py-10 scroll-mt-24 pt-14">
        <ChapterHeader :char="{ label: char.chapter1.label, titleLines: char.chapter1.titleLines }" />

        <!-- Section Identité -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 relative pl-8 overflow-hidden">
          <!-- Gradient Side Strip -->
          <div class="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-accent to-accent-alt opacity-80"></div>
          
          <dl v-for="(panel, pi) in char.chapter1.identityPanels" :key="pi" class="bg-panel border border-border border-t-2 border-t-accent p-7 rounded-lg shadow-xl">
            <div v-for="row in panel" :key="row.key" class="flex justify-between items-baseline py-2 border-b border-white/5 last:border-0">
              <dt class="font-mono text-[10px] text-muted uppercase tracking-wider">{{ row.key }}</dt>
              <dd :class="[row.class || 'text-white/80', 'font-mono text-[11px] text-right tracking-wide']">{{ row.value }}</dd>
            </div>
          </dl>
        </div>

        <div class="flex items-center gap-4 my-8">
          <div class="flex-1 h-px bg-gradient-to-r from-accent to-transparent opacity-30"></div>
          <div class="font-mono text-[10px] text-accent tracking-[4px] uppercase">Profil Psychologique</div>
          <div class="flex-1 h-px bg-gradient-to-l from-accent to-transparent opacity-30"></div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          <div class="bg-panel border border-border p-7 rounded-lg">
            <span class="font-mono text-[10px] text-muted uppercase block mb-4">Points Forts</span>
            <div class="flex flex-wrap gap-2">
              <span v-for="q in char.chapter1.profile.qualities" :key="q" class="font-mono text-[10px] px-3 py-1 border border-positive/40 text-positive uppercase tracking-wider bg-positive/5 rounded">{{ q }}</span>
            </div>
          </div>
          <div class="bg-panel border border-border p-7 rounded-lg">
            <span class="font-mono text-[10px] text-muted uppercase block mb-4">Points Faibles</span>
            <div class="flex flex-wrap gap-2">
              <span v-for="f in char.chapter1.profile.flaws" :key="f" class="font-mono text-[10px] px-3 py-1 border border-negative/40 text-negative uppercase tracking-wider bg-negative/5 rounded">{{ f }}</span>
            </div>
          </div>
        </div>

        <aside v-if="char.chapter1.specialInfo" class="bg-black/40 border border-accent border-l-4 border-l-accent p-6 rounded-r-lg flex gap-4 items-start shadow-inner">
          <div class="text-2xl">{{ char.chapter1.specialInfo.icon }}</div>
          <div class="font-mono text-xs leading-relaxed">
            <strong class="text-accent uppercase block mb-1">{{ char.chapter1.specialInfo.title }}</strong>
            {{ char.chapter1.specialInfo.text }}
          </div>
        </aside>
      </section>

      <!-- HISTOIRE -->
      <section id="histoire" class="scroll-mt-24 space-y-4">
        <!-- Chapitre 2 -->
        <div class="py-8">
          <ChapterHeader :char="{ label: char.chapter2.label, titleLines: char.chapter2.titleLines }" />
          <article class="bg-panel border border-border p-8 relative rounded-lg overflow-hidden group">
            <!-- Gradient Side Strip -->
            <div class="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-accent to-accent-alt opacity-80"></div>

            <aside v-if="char.chapter2.photo" class="lg:float-right lg:ml-8 lg:mb-6 w-full lg:w-[280px] mb-6">
              <figure class="border border-border rounded-lg overflow-hidden h-[360px] relative noise-overlay shadow-2xl">
                <img :src="fixPath(char.chapter2.photo.url)" class="w-full h-full object-cover saturate-[0.6] contrast-125 brightness-75 transition-all duration-700 group-hover:opacity-100 transition-all duration-700" :alt="char.chapter2.photo.alt" @error="handleImgError">
                <figcaption class="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm p-3 font-mono text-[10px] text-muted uppercase border-t border-white/10">{{ char.chapter2.photo.caption }}</figcaption>
              </figure>
            </aside>
            <div class="prose prose-invert max-w-none font-display text-[15px] leading-relaxed text-white/80 space-y-4">
              <p v-for="(p, i) in char.chapter2.story1" :key="i">{{ p }}</p>
              <p v-for="(p, i) in char.chapter2.story2" :key="i">{{ p }}</p>
            </div>
            <blockquote v-if="char.chapter2.quote" class="border-l-2 border-accent-alt pl-6 my-10 font-display font-black text-xl text-accent uppercase tracking-tighter leading-[1.1] shadow-accent/20 drop-shadow-sm">
              "{{ char.chapter2.quote }}"
            </blockquote>
          </article>
        </div>

        <!-- Chapitre 3 -->
        <div class="py-8">
          <ChapterHeader :char="{ label: char.chapter3.label, titleLines: char.chapter3.titleLines }" />
          <article class="bg-panel border border-border p-8 relative rounded-lg overflow-hidden group">
            <!-- Gradient Side Strip -->
            <div class="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-accent to-accent-alt opacity-80"></div>

            <aside v-if="char.chapter3.photo" class="lg:float-right lg:ml-8 lg:mb-6 w-full lg:w-[280px] mb-6">
              <figure class="border border-border rounded-lg overflow-hidden h-[360px] relative noise-overlay shadow-2xl">
                <img :src="fixPath(char.chapter3.photo.url)" class="w-full h-full object-cover saturate-[0.6] contrast-125 brightness-75 transition-all duration-700 group-hover:opacity-100 transition-all duration-700" :alt="char.chapter3.photo.alt" @error="handleImgError">
                <figcaption class="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm p-3 font-mono text-[10px] text-muted uppercase border-t border-white/10">{{ char.chapter3.photo.caption }}</figcaption>
              </figure>
            </aside>
            <div class="prose prose-invert max-w-none font-display text-[15px] leading-relaxed text-white/80 space-y-4">
              <p v-for="(p, i) in char.chapter3.story1" :key="i">{{ p }}</p>
              <p v-for="(p, i) in char.chapter3.story2" :key="i" v-html="p"></p>
            </div>
            <blockquote v-if="char.chapter3.quote" class="border-l-2 border-accent-alt pl-6 my-10 font-display font-black text-xl text-accent uppercase tracking-tighter leading-[1.1] shadow-accent/20 drop-shadow-sm">
              "{{ char.chapter3.quote }}"
            </blockquote>
          </article>
        </div>
      </section>

      <!-- APTITUDES -->
      <section v-if="char.chapter4" id="aptitudes" class="py-10 scroll-mt-24">
        <ChapterHeader :char="{ label: char.chapter4.label, titleLines: char.chapter4.titleLines }" />
        <article class="bg-panel border border-border p-8 relative rounded-lg mb-10 overflow-hidden group">
          <!-- Gradient Side Strip -->
          <div class="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-accent to-accent-alt opacity-80"></div>

          <aside v-if="char.chapter4.photo" class="lg:float-right lg:ml-8 lg:mb-6 w-full lg:w-[280px] mb-6">
            <figure class="border border-border rounded-lg overflow-hidden h-[360px] relative noise-overlay shadow-2xl">
              <img :src="fixPath(char.chapter4.photo.url)" class="w-full h-full object-cover saturate-[0.6] contrast-125 brightness-75 transition-all duration-700 group-hover:opacity-100 transition-all duration-700" :alt="char.chapter4.photo.alt" @error="handleImgError">
              <figcaption class="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm p-3 font-mono text-[10px] text-muted uppercase border-t border-white/10">{{ char.chapter4.photo.caption }}</figcaption>
            </figure>
          </aside>
          <div class="prose prose-invert max-w-none font-display text-[15px] leading-relaxed text-white/80">
            <p v-for="(p, i) in char.chapter4.story1" :key="i">{{ p }}</p>
          </div>
        </article>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <SkillGroup v-for="group in char.chapter4.skillsGroups" :key="group.title" :group="group" />
        </div>
      </section>
      
      <!-- CHAPITRE V (Final Point) -->
      <section v-if="char.chapter5" id="final-point" class="py-10 scroll-mt-24">
        <ChapterHeader :char="{ label: char.chapter5.label, titleLines: char.chapter5.titleLines }" />
        <article class="bg-panel border border-border p-8 relative rounded-lg overflow-hidden group">
          <div class="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-accent to-accent-alt opacity-80"></div>
          <div class="prose prose-invert max-w-none font-display text-[15px] leading-relaxed text-white/80 space-y-4">
            <p v-for="(p, i) in char.chapter5.story1" :key="i">{{ p }}</p>
          </div>
          <blockquote v-if="char.chapter5.quote" class="border-l-2 border-accent-alt pl-6 my-10 font-display font-black text-xl text-accent uppercase tracking-tighter leading-[1.1] shadow-accent/20 drop-shadow-sm">
            "{{ char.chapter5.quote }}"
          </blockquote>
        </article>
      </section>

      <!-- ENTOURAGE -->
      <FamilyTree id="entourage" :family="char.family" class="scroll-mt-24" />

      <!-- OBJECTIFS -->
      <section id="objectifs" class="py-10 scroll-mt-24">
        <ChapterHeader :char="{ label: char.chapter6.label, titleLines: char.chapter6.titleLines }" />
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          <div v-for="(list, term) in char.chapter6.objectives" :key="term">
            <h2 class="font-display font-extrabold text-base uppercase text-center py-2 mb-4 border border-border rounded-t bg-white/5" 
                :class="{'text-term-short border-term-short/40': term==='shortTerm', 'text-term-medium border-term-medium/40': term==='mediumTerm', 'text-term-long border-term-long/40': term==='longTerm'}">
              {{ term === 'shortTerm' ? 'Court terme' : term === 'mediumTerm' ? 'Moyen terme' : 'Long terme' }}
            </h2>
            <article v-for="(obj, i) in list" :key="i" 
              class="bg-panel border-l-2 border-border p-4 text-[13px] mb-3 rounded-r-lg shadow-sm transition-all duration-300"
              :class="{
                'hover:border-term-short': term === 'shortTerm',
                'hover:border-term-medium': term === 'mediumTerm',
                'hover:border-term-long': term === 'longTerm'
              }"
            >
              {{ obj }}
            </article>
          </div>
        </div>

        <article class="bg-panel border border-border p-8 relative rounded-lg border-l-4 border-l-accent overflow-hidden">
          <div class="prose prose-invert max-w-none font-display text-[15px] leading-relaxed text-white/80 space-y-4">
            <p v-for="(p, i) in char.chapter6.finaleStory" :key="i">{{ p }}</p>
          </div>
          <blockquote class="border-l-2 border-accent-alt pl-6 mt-8 font-display font-black text-xl text-accent uppercase tracking-tighter leading-[1.1] shadow-accent/20 drop-shadow-sm">
            "{{ char.chapter6.finaleQuote }}"
          </blockquote>
        </article>
      </section>
    </main>

    <footer class="mt-20 py-10 px-8 border-t border-border text-center font-mono text-[10px] text-muted tracking-widest uppercase" v-html="char.footer"></footer>
  </div>

  <div v-else class="min-h-screen bg-bg flex flex-col items-center justify-center text-center p-10">
    <h1 class="font-display font-black text-4xl mb-6">Dossier Introuvable</h1>
    <RouterLink to="/" class="font-mono text-accent hover:underline text-sm tracking-widest uppercase">← Revenir au Hub Central</RouterLink>
  </div>
</template>
