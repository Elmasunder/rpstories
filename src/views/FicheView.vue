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
import FriendListBtn from '@/components/FriendListBtn.vue'

const route = useRoute()
const char = computed(() => characters[route.params.id as string])

const charColors = computed(() => {
  if (!char.value || char.value.cover.status === 'dead' || char.value.cover.status === 'disparu') {
    return { accent: '', accent2: '', accentRgb: '', accent2Rgb: '' }
  }

  // On récupère l'index de la fiche dans la liste triée pour que la couleur corresponde au Hub
  const sortedChars = Object.values(characters).sort((a, b) => {
    if (a.cover.status === 'alive' && b.cover.status !== 'alive') return -1
    if (a.cover.status !== 'alive' && b.cover.status === 'alive') return 1
    return 0
  })

  const charIndex = sortedChars.findIndex((c) => c.id === char.value?.id)
  return getCharColors(char.value.id, charIndex)
})

const fixPath = (path: string) => {
  if (!path || path.startsWith('http') || path.startsWith('data:')) return path
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  return `${import.meta.env.BASE_URL}${cleanPath}`
}

const updateAtmosphere = () => {
  if (char.value) {
    document.title =
      char.value.pageTitle ||
      `${char.value.cover.firstName} ${char.value.cover.lastName} | RP/Stories`

    // Application des couleurs via le Store Global
    if (char.value.cover.status === 'dead' || char.value.cover.status === 'disparu') {
      uiState.setColors('#e74c3c', '#e74c3c', '231, 76, 60')
    } else {
      uiState.setColors(
        charColors.value.accent,
        charColors.value.accent2,
        charColors.value.accentRgb,
      )
    }

    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        `Dossier RP de ${char.value.cover.firstName} ${char.value.cover.lastName} : ${char.value.cover.subtitle} sur ${char.value.cover.destination}.`,
      )
    }
  }
}

const handleImgError = (event: Event) => {
  const target = event.target as HTMLElement | null
  if (target) target.style.display = 'none'
}

// Appel immédiat pour éviter le flash de couleur par défaut
updateAtmosphere()

onMounted(() => {
  window.scrollTo(0, 0)
})

// On ne réinitialise plus les couleurs ici pour éviter le flash violet pendant la transition de sortie
watch(char, updateAtmosphere)

const scrollDown = () => {
  window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' })
}
</script>

<template>
  <div v-if="char" class="relative min-h-screen text-white">
    <TheNavbar />

    <!-- SECTION 1 : COVER -->
    <header class="relative z-10 h-screen flex flex-col justify-end overflow-hidden">
      <!-- Background & Photos -->
      <div class="absolute inset-0 z-0">
        <div class="absolute inset-0 bg-linear-to-t from-bg via-bg/70 to-transparent z-10"></div>
        <div class="grid grid-cols-3 h-full">
          <div
            v-for="photo in char.cover.photos.slice(0, 3)"
            :key="photo"
            class="bg-cover bg-center grayscale contrast-125 opacity-40 relative"
            :style="{ backgroundImage: `url('${fixPath(photo)}')` }"
          ></div>
        </div>

        <!-- GLOBAL NOISE OVERLAY (z-15, under text z-20) -->
        <div
          class="absolute inset-0 z-15 pointer-events-none mix-blend-overlay transition-opacity duration-700"
          :class="char.cover.status === 'dead' ? 'opacity-20' : 'opacity-5'"
          style="background-image: url('https://www.ui-layouts.com/noise.gif')"
        ></div>
      </div>

      <!-- Content -->
      <div class="relative z-20 max-w-[1200px] mx-auto w-full px-4 sm:px-12 pb-12 sm:pb-20">
        <div class="font-mono text-xs tracking-[5px] text-accent uppercase mb-3 opacity-80">
          {{ char.cover.eyebrow }}
        </div>
        <h1
          class="font-display font-black text-6xl md:text-8xl lg:text-9xl uppercase leading-[0.85] tracking-tighter"
        >
          {{ char.cover.firstName }}<br />
          <span class="text-accent">{{ char.cover.lastName }}</span>
        </h1>

        <!-- Codename, Server Badge & Scroll Hint -->
        <div class="mt-6 flex items-end justify-between animate-fade-in delay-200">
          <div class="flex items-center gap-6 flex-wrap">
            <div class="flex items-center gap-4">
              <div
                class="px-2 py-0.5 bg-accent text-bg font-black text-[10px] uppercase tracking-widest"
              >
                Codename
              </div>
              <div
                class="font-display font-black text-2xl lg:text-3xl text-white uppercase tracking-tighter italic"
              >
                "{{ char.cover.alias }}"
              </div>
            </div>

            <!-- SEPARATOR & DECEASED BADGE -->
            <template v-if="char.cover.status === 'dead'">
              <div class="hidden sm:block h-8 w-px bg-white/10 mx-1 md:mx-2"></div>
              <div
                class="flex items-center bg-dead text-white px-3 py-1 font-mono text-[10px] font-bold tracking-widest uppercase rounded"
              >
                DECEASED // CK
              </div>
            </template>

            <!-- SEPARATOR BEFORE PORTAL -->
            <div
              v-if="char.cover.serverDomain && char.cover.serverDomain !== 'nom-du-serveur.fr'"
              class="hidden sm:block h-8 w-px bg-white/10 mx-1 md:mx-2"
            ></div>

            <!-- Server Link -->
            <a
              v-if="char.cover.serverDomain && char.cover.serverDomain !== 'nom-du-serveur.fr'"
              :href="`https://${char.cover.serverDomain}`"
              target="_blank"
              class="flex items-center gap-3 group/server"
            >
              <div
                class="size-8 bg-white/5 backdrop-blur-md rounded-lg border border-white/10 p-1.5 group-hover/server:border-accent/50 group-hover/server:bg-accent/10 transition-all"
              >
                <img
                  :src="`https://www.google.com/s2/favicons?domain=${char.cover.serverDomain}&sz=64`"
                  class="w-full h-full object-contain filter grayscale group-hover/server:grayscale-0 transition-all"
                  :alt="char.cover.serverDomain"
                />
              </div>
              <div class="flex flex-col">
                <span class="font-mono text-[9px] text-muted uppercase tracking-[2px]">Portal</span>
                <span
                  class="font-mono text-[10px] text-white/80 group-hover/server:text-accent transition-colors"
                  >{{ char.cover.serverDomain }}</span
                >
              </div>
            </a>

            <!-- Discord Link (Optional) -->
            <a
              v-if="char.cover.discordUrl"
              :href="char.cover.discordUrl"
              target="_blank"
              class="flex items-center gap-3 group/discord"
            >
              <div
                class="size-8 bg-white/5 backdrop-blur-md rounded-lg border border-white/10 flex items-center justify-center group-hover/discord:border-[#5865F2]/50 group-hover/discord:bg-[#5865F2]/10 transition-all"
              >
                <svg
                  viewBox="0 0 24 24"
                  class="size-5 fill-white/60 group-hover/discord:fill-[#5865F2] transition-all"
                >
                  <g transform="scale(0.9)" transform-origin="center">
                    <path
                      d="M19.27 4.51a19.93 19.93 0 00-4.83-1.51.07.07 0 00-.07.03 12.63 12.63 0 00-.56 1.15 18.33 18.33 0 00-5.63 0 12.63 12.63 0 00-.56-1.15.07.07 0 00-.07-.03 19.93 19.93 0 00-4.83 1.51.07.07 0 00-.03.03C-.24 10.09-.67 15.42.5 18.06a.07.07 0 00.03.05 19.9 19.9 0 005.98 3.03.07.07 0 00.08-.03c.46-.63.87-1.3 1.22-2a.07.07 0 00-.04-.1 13.11 13.11 0 01-1.87-.89.07.07 0 01-.01-.12c.12-.09.25-.19.37-.29a.07.07 0 01.07-.01 16.52 16.52 0 0011.29 0 .07.07 0 01.07.01c.12.1.25.2.37.29a.07.07 0 01-.01.12 13.11 13.11 0 01-1.87.89.07.07 0 00-.04.1c.36.7.76 1.37 1.22 2a.07.07 0 00.08.03 19.9 19.9 0 005.98-3.03.07.07 0 00.03-.05c1.4-4.54.3-9.87-2.3-13.52a.07.07 0 00-.03-.03zM8.02 15.33c-1.18 0-2.15-1.08-2.15-2.42s.97-2.42 2.15-2.42 2.15 1.08 2.15 2.42-.97 2.42-2.15 2.42zm7.97 0c-1.18 0-2.15-1.08-2.15-2.42s.97-2.42 2.15-2.42 2.15 1.08 2.15 2.42-.97 2.42-2.15 2.42z"
                    />
                  </g>
                </svg>
              </div>
              <div class="flex flex-col">
                <span class="font-mono text-[9px] text-muted uppercase tracking-[2px]"
                  >Community</span
                >
                <span
                  class="font-mono text-[10px] text-white/80 group-hover/discord:text-[#5865F2] transition-colors"
                  >Join Discord</span
                >
              </div>
            </a>
          </div>

          <!-- SCROLL HINT — Tout à droite -->
          <div
            class="hidden sm:flex flex-col items-center gap-2 opacity-50 hover:opacity-100 transition-opacity duration-300 cursor-pointer"
            @click="scrollDown"
          >
            <span
              class="font-mono text-[8px] font-bold tracking-[4px] uppercase text-accent leading-none"
              >Scroll</span
            >
            <div class="flex flex-col items-center">
              <div class="w-px h-6 bg-linear-to-b from-transparent to-accent/40"></div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="size-4 text-accent animate-bounce mt-1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
          </div>
        </div>

        <!-- Bottom Content Bar (Rebalanced) -->
        <div
          class="flex flex-col lg:flex-row lg:items-end justify-between gap-12 border-t border-white/10 pt-8 mt-12"
        >
          <!-- Administrative Ref -->
          <div class="flex flex-col gap-2">
            <div class="font-mono text-[10px] text-accent font-bold uppercase tracking-[3px]">
              Dossier Reference
            </div>
            <div
              class="font-mono text-[11px] text-white/60 leading-relaxed uppercase tracking-widest"
              v-html="char.cover.ref"
            ></div>
          </div>

          <!-- Quick Meta Data Unites -->
          <div class="flex flex-wrap items-center gap-x-10 gap-y-6">
            <div
              v-for="m in char.cover.meta"
              :key="m.key"
              class="group relative flex flex-col border-l-2 border-accent/40 pl-5 py-1 transition-all duration-500 hover:border-accent cursor-default select-none"
            >
              <div
                class="absolute inset-0 bg-accent/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10"
              ></div>
              <span
                class="font-mono text-[9px] text-accent uppercase tracking-[4px] mb-1.5 opacity-70"
              >
                {{ m.key }}
              </span>
              <span
                class="font-display font-black text-2xl lg:text-3xl text-white uppercase leading-none tracking-tighter whitespace-nowrap"
              >
                {{ m.value }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>

    <main class="relative z-10 max-w-[1080px] mx-auto px-4 sm:px-12">
      <!-- CHAPITRE I : IDENTITÉ -->
      <section id="identite" class="py-10 scroll-mt-24 pt-14">
        <ChapterHeader
          :char="{ label: char.chapter1.label, titleLines: char.chapter1.titleLines }"
        />

        <!-- Section Identité -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 relative pl-0 md:pl-8 overflow-hidden">
          <!-- Gradient Side Strip -->
          <div
            class="absolute top-0 left-0 w-1 h-full bg-linear-to-b from-accent to-accent-alt opacity-80"
          ></div>

          <dl
            v-for="(panel, pi) in char.chapter1.identityPanels"
            :key="pi"
            class="bg-panel border border-border border-t-2 border-t-accent p-7 rounded-lg shadow-xl"
          >
            <div
              v-for="row in panel"
              :key="row.key"
              class="flex justify-between items-baseline py-2 border-b border-white/5 last:border-0"
            >
              <dt class="font-mono text-[10px] text-muted uppercase tracking-wider">
                {{ row.key }}
              </dt>
              <dd
                :class="[
                  row.class || 'text-white/80',
                  'font-mono text-[11px] text-right tracking-wide',
                ]"
              >
                {{ row.value }}
              </dd>
            </div>
          </dl>
        </div>

        <div class="flex items-center gap-4 my-8">
          <div class="flex-1 h-px bg-linear-to-r from-accent to-transparent opacity-30"></div>
          <div class="font-mono text-[10px] text-accent tracking-[4px] uppercase">
            Profil Psychologique
          </div>
          <div class="flex-1 h-px bg-linear-to-l from-accent to-transparent opacity-30"></div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          <div class="bg-panel border border-border p-7 rounded-lg">
            <span class="font-mono text-[10px] text-muted uppercase block mb-4">Qualités</span>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="q in char.chapter1.profile.qualités"
                :key="q"
                class="font-mono text-[10px] px-3 py-1 border border-positive/40 text-positive uppercase tracking-wider bg-positive/5 rounded"
                >{{ q }}</span
              >
            </div>
          </div>
          <div class="bg-panel border border-border p-7 rounded-lg">
            <span class="font-mono text-[10px] text-muted uppercase block mb-4">Défauts</span>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="f in char.chapter1.profile.défauts"
                :key="f"
                class="font-mono text-[10px] px-3 py-1 border border-negative/40 text-negative uppercase tracking-wider bg-negative/5 rounded"
                >{{ f }}</span
              >
            </div>
          </div>
        </div>

        <aside
          v-if="char.chapter1.infoPlus"
          class="bg-black/40 border border-accent border-l-4 border-l-accent p-6 rounded-r-lg flex gap-4 items-start shadow-inner"
        >
          <div class="text-2xl">{{ char.chapter1.infoPlus.icon }}</div>
          <div class="font-mono text-xs leading-relaxed">
            <strong class="text-accent uppercase block mb-1">{{
              char.chapter1.infoPlus.title
            }}</strong>
            {{ char.chapter1.infoPlus.text }}
          </div>
        </aside>
      </section>

      <!-- HISTOIRE -->
      <section id="histoire" class="scroll-mt-24 space-y-4">
        <!-- Chapitre 2 -->
        <div class="py-8">
          <ChapterHeader
            :char="{ label: char.chapter2.label, titleLines: char.chapter2.titleLines }"
          />
          <article
            class="bg-panel border border-border p-8 relative rounded-lg overflow-hidden group"
          >
            <!-- Gradient Side Strip -->
            <div
              class="absolute top-0 left-0 w-1 h-full bg-linear-to-b from-accent to-accent-alt opacity-80"
            ></div>

            <aside
              v-if="char.chapter2.photo"
              class="lg:float-right lg:ml-8 lg:mb-6 w-full lg:w-[280px] mb-6"
            >
              <figure
                class="border border-border rounded-xl overflow-hidden h-[360px] relative noise-overlay shadow-2xl"
              >
                <img
                  :src="fixPath(char.chapter2.photo.url)"
                  class="w-full h-full object-cover saturate-[0.6] contrast-125 brightness-75 transition-all duration-700 group-hover:opacity-100"
                  :alt="char.chapter2.photo.alt"
                  @error="handleImgError"
                />
                <figcaption
                  class="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm p-3 font-mono text-[10px] text-muted uppercase border-t border-white/10 rounded-b-xl"
                >
                  {{ char.chapter2.photo.caption }}
                </figcaption>
              </figure>
            </aside>
            <div
              class="prose prose-invert max-w-none font-display text-[15px] leading-relaxed text-white/80 space-y-4"
            >
              <p v-for="(p, i) in char.chapter2.story1" :key="i">{{ p }}</p>
              <p v-for="(p, i) in char.chapter2.story2" :key="i">{{ p }}</p>
            </div>
            <blockquote
              v-if="char.chapter2.quote"
              class="border-l-2 border-accent-alt pl-6 my-10 font-display font-black text-xl text-accent uppercase tracking-tighter leading-[1.1] shadow-accent/20 drop-shadow-sm"
            >
              "{{ char.chapter2.quote }}"
            </blockquote>
          </article>
        </div>

        <!-- Chapitre 3 -->
        <div class="py-8">
          <ChapterHeader
            :char="{ label: char.chapter3.label, titleLines: char.chapter3.titleLines }"
          />
          <article
            class="bg-panel border border-border p-8 relative rounded-lg overflow-hidden group"
          >
            <!-- Gradient Side Strip -->
            <div
              class="absolute top-0 left-0 w-1 h-full bg-linear-to-b from-accent to-accent-alt opacity-80"
            ></div>

            <aside
              v-if="char.chapter3.photo"
              class="lg:float-right lg:ml-8 lg:mb-6 w-full lg:w-[280px] mb-6"
            >
              <figure
                class="border border-border rounded-xl overflow-hidden h-[360px] relative noise-overlay shadow-2xl"
              >
                <img
                  :src="fixPath(char.chapter3.photo.url)"
                  class="w-full h-full object-cover saturate-[0.6] contrast-125 brightness-75 transition-all duration-700 group-hover:opacity-100"
                  :alt="char.chapter3.photo.alt"
                  @error="handleImgError"
                />
                <figcaption
                  class="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm p-3 font-mono text-[10px] text-muted uppercase border-t border-white/10 rounded-b-xl"
                >
                  {{ char.chapter3.photo.caption }}
                </figcaption>
              </figure>
            </aside>
            <div
              class="prose prose-invert max-w-none font-display text-[15px] leading-relaxed text-white/80 space-y-4"
            >
              <p v-for="(p, i) in char.chapter3.story1" :key="i">{{ p }}</p>
              <p v-for="(p, i) in char.chapter3.story2" :key="i" v-html="p"></p>
            </div>
            <blockquote
              v-if="char.chapter3.quote"
              class="border-l-2 border-accent-alt pl-6 my-10 font-display font-black text-xl text-accent uppercase tracking-tighter leading-[1.1] shadow-accent/20 drop-shadow-sm"
            >
              "{{ char.chapter3.quote }}"
            </blockquote>
          </article>
        </div>
      </section>

      <!-- APTITUDES -->
      <section v-if="char.chapter4" id="aptitudes" class="py-10 scroll-mt-24">
        <ChapterHeader
          :char="{ label: char.chapter4.label, titleLines: char.chapter4.titleLines }"
        />
        <article
          class="bg-panel border border-border p-8 relative rounded-lg mb-10 overflow-hidden group"
        >
          <!-- Gradient Side Strip -->
          <div
            class="absolute top-0 left-0 w-1 h-full bg-linear-to-b from-accent to-accent-alt opacity-80"
          ></div>

          <aside
            v-if="char.chapter4.photo"
            class="lg:float-right lg:ml-8 lg:mb-6 w-full lg:w-[280px] mb-6"
          >
            <figure
              class="border border-border rounded-xl overflow-hidden h-[360px] relative noise-overlay shadow-2xl"
            >
              <img
                :src="fixPath(char.chapter4.photo.url)"
                class="w-full h-full object-cover saturate-[0.6] contrast-125 brightness-75 transition-all duration-700 group-hover:opacity-100"
                :alt="char.chapter4.photo.alt"
                @error="handleImgError"
              />
              <figcaption
                class="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm p-3 font-mono text-[10px] text-muted uppercase border-t border-white/10 rounded-b-xl"
              >
                {{ char.chapter4.photo.caption }}
              </figcaption>
            </figure>
          </aside>
          <div
            class="prose prose-invert max-w-none font-display text-[15px] leading-relaxed text-white/80"
          >
            <p v-for="(p, i) in char.chapter4.story1" :key="i">{{ p }}</p>
          </div>
        </article>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <SkillGroup
            v-for="group in char.chapter4.skillsGroups"
            :key="group.title"
            :group="group"
          />
        </div>
      </section>

      <!-- ENTOURAGE -->
      <FamilyTree
        id="entourage"
        :label="char.chapter5?.label"
        :titleLines="char.chapter5?.titleLines"
        :family="char.family"
        class="scroll-mt-24"
      />

      <!-- OBJECTIFS -->
      <section id="objectifs" class="py-10 scroll-mt-24">
        <ChapterHeader
          :char="{ label: char.chapter6.label, titleLines: char.chapter6.titleLines }"
        />

        <div class="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          <div v-for="(list, term) in char.chapter6.objectives" :key="term">
            <h2
              class="font-display font-extrabold text-base uppercase text-center py-2 mb-4 border border-border rounded-t bg-white/5"
              :class="{
                'text-term-short border-term-short/40': term === 'shortTerm',
                'text-term-medium border-term-medium/40': term === 'mediumTerm',
                'text-term-long border-term-long/40': term === 'longTerm',
              }"
            >
              {{
                term === 'shortTerm'
                  ? 'Court terme'
                  : term === 'mediumTerm'
                    ? 'Moyen terme'
                    : 'Long terme'
              }}
            </h2>
            <article
              v-for="(obj, i) in list"
              :key="i"
              class="bg-panel border-l-2 border-border p-4 text-[13px] mb-3 rounded-r-lg shadow-sm transition-all duration-300"
              :class="{
                'hover:border-term-short': term === 'shortTerm',
                'hover:border-term-medium': term === 'mediumTerm',
                'hover:border-term-long': term === 'longTerm',
              }"
            >
              {{ obj }}
            </article>
          </div>
        </div>

        <article
          class="bg-panel border border-border p-8 relative rounded-lg border-l-4 border-l-accent overflow-hidden"
        >
          <div
            class="prose prose-invert max-w-none font-display text-[15px] leading-relaxed text-white/80 space-y-4"
          >
            <p v-for="(p, i) in char.chapter6.finaleStory" :key="i">{{ p }}</p>
          </div>
          <blockquote
            class="border-l-2 border-accent-alt pl-6 mt-8 font-display font-black text-xl text-accent uppercase tracking-tighter leading-[1.1] shadow-accent/20 drop-shadow-sm"
          >
            "{{ char.chapter6.finaleQuote }}"
          </blockquote>
        </article>
      </section>
    </main>

    <footer
      class="mt-20 py-10 px-8 border-t border-border text-center font-mono text-[10px] text-muted tracking-widest uppercase"
      v-html="char.footer"
    ></footer>

    <!-- Friend List Button (placeholder) -->
    <FriendListBtn />
  </div>

  <div v-else class="min-h-screen bg-bg flex flex-col items-center justify-center text-center p-10">
    <h1 class="font-display font-black text-4xl mb-6">Dossier Introuvable</h1>
    <RouterLink
      to="/"
      class="font-mono text-accent hover:underline text-sm tracking-widest uppercase"
      >← Revenir au Hub Central</RouterLink
    >
  </div>
</template>
