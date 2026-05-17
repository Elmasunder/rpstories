<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { characters } from '@/data/index.ts'
import { uiState } from '@/store/ui.ts'
import { getCharColors } from '@/utils/colors.ts'
import TheNavbar from '@/components/TheNavbar.vue'

const router = useRouter()
const route = useRoute()

// On génère une couleur d'accent pour le tunnel
const createColors = getCharColors('create-tunnel')

onMounted(() => {
  document.title = 'RP/STORIES | Nouveau Dossier'

  const accent = (route.query.accent as string) || createColors.accent
  const accent2 = (route.query.accent2 as string) || createColors.accent2
  const accentRgb = (route.query.accentRgb as string) || createColors.accentRgb

  uiState.setColors(accent, accent2, accentRgb)
  window.scrollTo(0, 0)
})

const currentStep = ref(1)
const totalSteps = 7

const formData = ref({
  firstName: '',
  lastName: '',
  status: 'alive',
  serverDomain: '',
  reference: 'DOSSIER REF: 2026-AR-01', // Format fixe
  // Tableau d'informations
  alias: '',
  birthDate: '',
  birthPlace: '',
  currentCity: '',
  origins: '',
  height: '',
  weight: '',
  specialSign: '',
  father: '',
  mother: '',
  past: '',
  passions: '',
  vehicle: '',
  specialty: '',
  // Chapitres & Histoire
  origins_story: '',
  adult_story: '',
  aptitudes_story: '',
  // Compétences (Pourcentages)
  skills_social: [
    { name: 'Analyse comportementale', percent: 50 },
    { name: 'Discrétion & Infiltration', percent: 50 },
  ],
  skills_tech: [
    { name: 'Lockpicking Avancé', percent: 50 },
    { name: 'Bypass de Sécurité', percent: 50 },
  ],
  // Relations
  relations: [{ name: '', relation: '', status: 'alive' }],
  // Objectifs (Un par ligne demandé)
  objectives_short: [''],
  objectives_medium: [''],
  objectives_long: [''],
})

watch(
  () => [formData.value.firstName, formData.value.lastName],
  ([newFirst, newLast]) => {
    const p = newFirst ? newFirst.trim().charAt(0).toUpperCase() : 'X'
    const n = newLast ? newLast.trim().charAt(0).toUpperCase() : 'X'
    const nextId = String(Object.keys(characters).length + 1).padStart(2, '0')
    formData.value.reference = `DOSSIER REF: 2026-${p}${n}-${nextId}`
  },
)

const errorMsg = ref('')

const validateStep = (step: number) => {
  errorMsg.value = ''
  if (step === 1) {
    if (!formData.value.firstName.trim()) return 'Le prénom est requis.'
    if (!formData.value.lastName.trim()) return 'Le nom de famille est requis.'
    if (!formData.value.serverDomain.trim()) return 'Le domaine est requis.'
    if (!formData.value.status.trim()) return 'Le statut est requis.'
  }
  if (step === 2) {
    const fields = [
      'alias',
      'birthDate',
      'birthPlace',
      'currentCity',
      'origins',
      'height',
      'weight',
      'specialSign',
      'father',
      'mother',
      'past',
      'passions',
      'vehicle',
      'specialty',
    ] as const
    for (const field of fields) {
      if (!formData.value[field].trim()) return 'Tous les champs du profil détaillé sont requis.'
    }

    const dateRegex = /^\d{4}-\d{2}-\d{2}$|^\d{2}\/\d{2}\/\d{4}$/
    if (!dateRegex.test(formData.value.birthDate.trim()))
      return 'Sélectionnez une date de naissance valide.'

    const heightRegex = /^\d{3}$|^\d\.\d{2}$/
    if (!heightRegex.test(formData.value.height.trim()))
      return 'La taille doit être un nombre (ex: 185 ou 1.85).'

    const weightRegex = /^\d{2,3}$/
    if (!weightRegex.test(formData.value.weight.trim()))
      return 'Le poids doit être un nombre (ex: 75).'
  }
  if (step === 3) {
    if (!formData.value.origins_story.trim()) return 'Le récit des origines est requis.'
    if (!formData.value.adult_story.trim()) return "Le récit de la vie d'adulte est requis."
  }
  if (step === 4) {
    if (!formData.value.aptitudes_story.trim()) return 'La description des aptitudes est requise.'
    if (formData.value.skills_social.length === 0)
      return 'Au moins une aptitude sociale est requise.'
    for (const skill of formData.value.skills_social) {
      if (!skill.name.trim()) return 'Toutes les aptitudes sociales doivent avoir un nom.'
    }
    if (formData.value.skills_tech.length === 0)
      return 'Au moins une expertise technique est requise.'
    for (const skill of formData.value.skills_tech) {
      if (!skill.name.trim()) return 'Toutes les expertises techniques doivent avoir un nom.'
    }
  }
  if (step === 5) {
    if (formData.value.relations.length === 0) return 'Au moins une relation est requise.'
    for (const rel of formData.value.relations) {
      if (!rel.name.trim() || !rel.relation.trim() || !rel.status.trim())
        return 'Tous les champs des relations doivent être remplis.'
    }
  }
  if (step === 6) {
    if (
      formData.value.objectives_short.length === 0 ||
      formData.value.objectives_short.some((o) => !o.trim())
    )
      return 'Les objectifs à court terme doivent être remplis.'
    if (
      formData.value.objectives_medium.length === 0 ||
      formData.value.objectives_medium.some((o) => !o.trim())
    )
      return 'Les objectifs à moyen terme doivent être remplis.'
    if (
      formData.value.objectives_long.length === 0 ||
      formData.value.objectives_long.some((o) => !o.trim())
    )
      return 'Les objectifs à long terme doivent être remplis.'
  }
  return ''
}

const nextStep = () => {
  // Désactivé temporairement pour le développement
  /*
  const error = validateStep(currentStep.value)
  if (error) {
    errorMsg.value = error
    return
  }
  */
  errorMsg.value = ''

  if (currentStep.value < totalSteps) {
    currentStep.value++
  } else {
    // Action finale (ex: Sauvegarder)
    console.log('Données sauvegardées:', formData.value)
    router.push({ name: 'hub' })
  }
}

const prevStep = () => {
  errorMsg.value = ''
  if (currentStep.value > 1) {
    currentStep.value--
  } else {
    router.push({ name: 'hub' })
  }
}

const addSkillSocial = () => {
  if (formData.value.skills_social.length < 5) {
    formData.value.skills_social.push({ name: '', percent: 50 })
  }
}
const removeSkillSocial = (index: number) => {
  formData.value.skills_social.splice(index, 1)
}
const addSkillTech = () => {
  if (formData.value.skills_tech.length < 5) {
    formData.value.skills_tech.push({ name: '', percent: 50 })
  }
}
const removeSkillTech = (index: number) => {
  formData.value.skills_tech.splice(index, 1)
}
const addRelation = () => {
  if (formData.value.relations.length < 8) {
    formData.value.relations.push({ name: '', relation: '', status: 'alive' })
  }
}
const removeRelation = (index: number) => {
  formData.value.relations.splice(index, 1)
}

const addObjectiveShort = () => {
  if (formData.value.objectives_short.length < 4) {
    formData.value.objectives_short.push('')
  }
}
const removeObjectiveShort = (index: number) => {
  formData.value.objectives_short.splice(index, 1)
}
const addObjectiveMedium = () => {
  if (formData.value.objectives_medium.length < 4) {
    formData.value.objectives_medium.push('')
  }
}
const removeObjectiveMedium = (index: number) => {
  formData.value.objectives_medium.splice(index, 1)
}
const addObjectiveLong = () => {
  if (formData.value.objectives_long.length < 4) {
    formData.value.objectives_long.push('')
  }
}
const removeObjectiveLong = (index: number) => {
  formData.value.objectives_long.splice(index, 1)
}
</script>

<template>
  <div
    class="min-h-screen text-white flex flex-col relative selection:bg-accent selection:text-white"
  >
    <!-- Background Effects -->
    <div class="fixed inset-0 z-0 pointer-events-none select-none">
      <div class="absolute inset-0 bg-bg"></div>
      <div class="absolute inset-0 bg-dots-premium bg-size-[32px_32px] opacity-30"></div>
      <div
        class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-radial-gradient from-accent/10 to-transparent blur-3xl opacity-40"
      ></div>
    </div>

    <TheNavbar />

    <main class="relative z-10 grow flex items-center justify-center p-4 pt-24 pb-20">
      <div class="w-full max-w-4xl animate-fade-in">
        <!-- Header du Tunnel -->
        <header
          class="mb-12 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <div class="font-mono text-[10px] tracking-[4px] text-accent uppercase mb-3 font-bold">
              // CRÉATION PERSONNAGE //
            </div>
            <h1
              class="font-display font-black text-4xl md:text-6xl uppercase tracking-tighter leading-none"
            >
              Nouveau <span class="text-white/40">Dossier</span>
            </h1>
          </div>

          <!-- Stepper Indicator -->
          <div class="flex gap-3 justify-center">
            <div v-for="step in totalSteps" :key="step" class="flex flex-col items-center gap-2">
              <div
                class="w-12 h-1 rounded-full transition-all duration-500"
                :class="
                  step <= currentStep
                    ? 'bg-accent shadow-[0_0_10px_rgba(var(--accent-rgb),0.5)]'
                    : 'bg-white/10'
                "
              ></div>
              <span
                class="font-mono text-[9px] font-bold tracking-widest transition-colors duration-500"
                :class="step <= currentStep ? 'text-accent' : 'text-white/20'"
              >
                0{{ step }}
              </span>
            </div>
          </div>
        </header>

        <!-- Formulaire principal -->
        <div
          class="bg-panel/80 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative"
        >
          <!-- Noise Overlay -->
          <div
            class="absolute inset-0 z-0 pointer-events-none mix-blend-overlay opacity-20 bg-noise"
          ></div>

          <div class="relative z-10 p-6 md:p-10 min-h-[400px] flex flex-col">
            <!-- STEP 1 : Identité -->
            <transition
              enter-active-class="transition duration-500 ease-out"
              enter-from-class="opacity-0 translate-x-8"
              enter-to-class="opacity-100 translate-x-0"
              leave-active-class="transition duration-300 ease-in absolute w-full left-0 px-6 md:px-10"
              leave-from-class="opacity-100 translate-x-0"
              leave-to-class="opacity-0 -translate-x-8"
            >
              <div v-if="currentStep === 1" class="space-y-8">
                <div>
                  <h2 class="font-display text-2xl font-bold uppercase tracking-tight mb-2">
                    Identité & Paramètres
                  </h2>
                  <p class="font-mono text-[11px] text-white/40">
                    Définissez les informations primaires et de connexion.
                  </p>
                </div>

                <!-- Identité -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="space-y-2">
                    <label
                      class="font-mono text-[10px] tracking-widest uppercase text-accent font-bold"
                      >Prénom</label
                    >
                    <input
                      v-model="formData.firstName"
                      type="text"
                      placeholder="Ex: John"
                      class="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 font-display text-lg text-white placeholder-white/20 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all"
                    />
                  </div>
                  <div class="space-y-2">
                    <label
                      class="font-mono text-[10px] tracking-widest uppercase text-accent font-bold"
                      >Nom</label
                    >
                    <input
                      v-model="formData.lastName"
                      type="text"
                      placeholder="Ex: Doe"
                      class="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 font-display text-lg text-white placeholder-white/20 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all"
                    />
                  </div>
                </div>

                <!-- Paramètres -->
                <div class="space-y-2">
                  <label
                    class="font-mono text-[10px] tracking-widest uppercase text-accent font-bold"
                    >Domaine du Serveur (URL)</label
                  >
                  <input
                    v-model="formData.serverDomain"
                    type="text"
                    placeholder="Ex: rp-server.com"
                    class="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 font-display text-lg text-white placeholder-white/20 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all"
                  />
                  <p class="font-mono text-[9px] text-white/30">
                    L'icône du serveur sera automatiquement récupérée.
                  </p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="space-y-2">
                    <label
                      class="font-mono text-[10px] tracking-widest uppercase text-accent font-bold"
                      >Statut Actuel</label
                    >
                    <div class="flex gap-4">
                      <button
                        @click="formData.status = 'alive'"
                        class="flex-1 py-3 px-4 rounded-lg border font-mono text-[10px] tracking-widest uppercase font-bold transition-all"
                        :class="
                          formData.status === 'alive'
                            ? 'bg-positive/20 border-positive text-positive'
                            : 'bg-black/40 border-white/10 text-white/40 hover:border-white/30'
                        "
                      >
                        En Vie
                      </button>
                      <button
                        @click="formData.status = 'dead'"
                        class="flex-1 py-3 px-4 rounded-lg border font-mono text-[10px] tracking-widest uppercase font-bold transition-all"
                        :class="
                          formData.status === 'dead'
                            ? 'bg-dead/20 border-dead text-dead'
                            : 'bg-black/40 border-white/10 text-white/40 hover:border-white/30'
                        "
                      >
                        Décédé
                      </button>
                    </div>
                  </div>

                  <div class="space-y-2">
                    <label
                      class="font-mono text-[10px] tracking-widest uppercase text-accent font-bold"
                      >Référence Dossier</label
                    >
                    <input
                      v-model="formData.reference"
                      type="text"
                      readonly
                      class="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 font-mono text-sm text-white/50 cursor-not-allowed focus:outline-none transition-all"
                    />
                  </div>
                </div>
              </div>
            </transition>

            <!-- STEP 2 : Profil Détaillé -->
            <transition
              enter-active-class="transition duration-500 ease-out delay-100"
              enter-from-class="opacity-0 translate-x-8"
              enter-to-class="opacity-100 translate-x-0"
              leave-active-class="transition duration-300 ease-in absolute w-full left-0 px-6 md:px-10"
              leave-from-class="opacity-100 translate-x-0"
              leave-to-class="opacity-0 -translate-x-8"
            >
              <div v-if="currentStep === 2" class="space-y-8">
                <div>
                  <h2 class="font-display text-2xl font-bold uppercase tracking-tight mb-2">
                    Profil Détaillé
                  </h2>
                  <p class="font-mono text-[11px] text-white/40">
                    Remplissez les informations du dossier (15 champs).
                  </p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="space-y-2">
                    <label
                      class="font-mono text-[10px] tracking-widest uppercase text-accent font-bold"
                      >Surnom / Alias</label
                    >
                    <input
                      v-model="formData.alias"
                      type="text"
                      placeholder="L'Ombre"
                      class="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 font-display text-lg text-white placeholder-white/20 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all"
                    />
                  </div>
                  <div class="space-y-2">
                    <label
                      class="font-mono text-[10px] tracking-widest uppercase text-accent font-bold"
                      >Date de Naissance</label
                    >
                    <input
                      v-model="formData.birthDate"
                      type="date"
                      style="color-scheme: dark"
                      class="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 font-display text-lg text-white placeholder-white/20 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all cursor-pointer"
                    />
                  </div>
                  <div class="space-y-2">
                    <label
                      class="font-mono text-[10px] tracking-widest uppercase text-accent font-bold"
                      >Lieu de Naissance</label
                    >
                    <input
                      v-model="formData.birthPlace"
                      type="text"
                      placeholder="Liberty City"
                      class="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 font-display text-lg text-white placeholder-white/20 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all"
                    />
                  </div>
                  <div class="space-y-2">
                    <label
                      class="font-mono text-[10px] tracking-widest uppercase text-accent font-bold"
                      >Ville Actuelle</label
                    >
                    <input
                      v-model="formData.currentCity"
                      type="text"
                      placeholder="Los Santos"
                      class="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 font-display text-lg text-white placeholder-white/20 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all"
                    />
                  </div>
                  <div class="space-y-2">
                    <label
                      class="font-mono text-[10px] tracking-widest uppercase text-accent font-bold"
                      >Origines</label
                    >
                    <input
                      v-model="formData.origins"
                      type="text"
                      placeholder="Italien / Américain"
                      class="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 font-display text-lg text-white placeholder-white/20 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all"
                    />
                  </div>
                  <div class="grid grid-cols-2 gap-4">
                    <div class="space-y-2">
                      <label
                        class="font-mono text-[10px] tracking-widest uppercase text-accent font-bold"
                        >Taille</label
                      >
                      <div class="relative">
                        <input
                          v-model="formData.height"
                          type="text"
                          placeholder="1.85"
                          class="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 font-display text-lg text-white placeholder-white/20 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all pr-8"
                        />
                        <span
                          class="absolute right-4 top-1/2 -translate-y-1/2 font-mono text-white/40"
                          >m</span
                        >
                      </div>
                    </div>
                    <div class="space-y-2">
                      <label
                        class="font-mono text-[10px] tracking-widest uppercase text-accent font-bold"
                        >Poids</label
                      >
                      <div class="relative">
                        <input
                          v-model="formData.weight"
                          type="text"
                          placeholder="75"
                          class="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 font-display text-lg text-white placeholder-white/20 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all pr-10"
                        />
                        <span
                          class="absolute right-4 top-1/2 -translate-y-1/2 font-mono text-white/40"
                          >kg</span
                        >
                      </div>
                    </div>
                  </div>
                  <div class="space-y-2">
                    <label
                      class="font-mono text-[10px] tracking-widest uppercase text-accent font-bold"
                      >Signes Distinctifs</label
                    >
                    <input
                      v-model="formData.specialSign"
                      type="text"
                      placeholder="Cicatrice à l'arcade"
                      class="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 font-display text-lg text-white placeholder-white/20 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all"
                    />
                  </div>
                  <div class="space-y-2">
                    <label
                      class="font-mono text-[10px] tracking-widest uppercase text-accent font-bold"
                      >Père</label
                    >
                    <input
                      v-model="formData.father"
                      type="text"
                      placeholder="Robert Davis"
                      class="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 font-display text-lg text-white placeholder-white/20 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all"
                    />
                  </div>
                  <div class="space-y-2">
                    <label
                      class="font-mono text-[10px] tracking-widest uppercase text-accent font-bold"
                      >Mère</label
                    >
                    <input
                      v-model="formData.mother"
                      type="text"
                      placeholder="Elena Davis"
                      class="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 font-display text-lg text-white placeholder-white/20 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all"
                    />
                  </div>

                  <div class="space-y-2">
                    <label
                      class="font-mono text-[10px] tracking-widest uppercase text-accent font-bold"
                      >Passé / Antécédents</label
                    >
                    <input
                      v-model="formData.past"
                      type="text"
                      placeholder="Militaire / Détective"
                      class="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 font-display text-lg text-white placeholder-white/20 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all"
                    />
                  </div>
                  <div class="space-y-2">
                    <label
                      class="font-mono text-[10px] tracking-widest uppercase text-accent font-bold"
                      >Passions / Hobbies</label
                    >
                    <input
                      v-model="formData.passions"
                      type="text"
                      placeholder="Musique, Boxe"
                      class="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 font-display text-lg text-white placeholder-white/20 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all"
                    />
                  </div>
                  <div class="space-y-2">
                    <label
                      class="font-mono text-[10px] tracking-widest uppercase text-accent font-bold"
                      >Véhicule</label
                    >
                    <input
                      v-model="formData.vehicle"
                      type="text"
                      placeholder="Albany Primo"
                      class="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 font-display text-lg text-white placeholder-white/20 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all"
                    />
                  </div>
                  <div class="space-y-2">
                    <label
                      class="font-mono text-[10px] tracking-widest uppercase text-accent font-bold"
                      >Spécialité</label
                    >
                    <input
                      v-model="formData.specialty"
                      type="text"
                      placeholder="Infiltration / Hack"
                      class="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 font-display text-lg text-white placeholder-white/20 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all"
                    />
                  </div>
                </div>
              </div>
            </transition>

            <!-- STEP 3 : Histoire & Parcours -->
            <transition
              enter-active-class="transition duration-500 ease-out delay-100"
              enter-from-class="opacity-0 translate-x-8"
              enter-to-class="opacity-100 translate-x-0"
              leave-active-class="transition duration-300 ease-in absolute w-full left-0 px-6 md:px-10"
              leave-from-class="opacity-100 translate-x-0"
              leave-to-class="opacity-0 -translate-x-8"
            >
              <div v-if="currentStep === 3" class="space-y-8">
                <div>
                  <h2 class="font-display text-2xl font-bold uppercase tracking-tight mb-2">
                    Histoire du Sujet
                  </h2>
                  <p class="font-mono text-[11px] text-white/40">
                    Rédigez le parcours de vie du personnage.
                  </p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="space-y-2">
                    <div class="flex justify-between items-center">
                      <label
                        class="font-mono text-[10px] tracking-widest uppercase text-accent font-bold"
                        >Les Origines (Enfance)</label
                      >
                      <span class="font-mono text-[9px] text-white/30"
                        >{{ formData.origins_story.length }}/900</span
                      >
                    </div>
                    <textarea
                      v-model="formData.origins_story"
                      rows="12"
                      maxlength="900"
                      class="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 font-mono text-sm text-white placeholder-white/20 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all"
                      placeholder="Né à Liberty City, dans un quartier difficile..."
                    ></textarea>
                  </div>
                  <div class="space-y-2">
                    <div class="flex justify-between items-center">
                      <label
                        class="font-mono text-[10px] tracking-widest uppercase text-accent font-bold"
                        >La Vie d'Adulte</label
                      >
                      <span class="font-mono text-[9px] text-white/30"
                        >{{ formData.adult_story.length }}/900</span
                      >
                    </div>
                    <textarea
                      v-model="formData.adult_story"
                      rows="12"
                      maxlength="900"
                      class="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 font-mono text-sm text-white placeholder-white/20 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all"
                      placeholder="Après avoir quitté l'école, il s'est dirigé vers..."
                    ></textarea>
                  </div>
                </div>
              </div>
            </transition>

            <!-- STEP 4 : Aptitudes & Compétences -->
            <transition
              enter-active-class="transition duration-500 ease-out delay-100"
              enter-from-class="opacity-0 translate-x-8"
              enter-to-class="opacity-100 translate-x-0"
              leave-active-class="transition duration-300 ease-in absolute w-full left-0 px-6 md:px-10"
              leave-from-class="opacity-100 translate-x-0"
              leave-to-class="opacity-0 -translate-x-8"
            >
              <div v-if="currentStep === 4" class="space-y-8">
                <div>
                  <h2 class="font-display text-2xl font-bold uppercase tracking-tight mb-2">
                    Aptitudes & Compétences
                  </h2>
                  <p class="font-mono text-[11px] text-white/40">
                    Décrivez les compétences et définissez les pourcentages.
                  </p>
                </div>

                <!-- Description Textarea on Top -->
                <div class="space-y-2">
                  <label
                    class="font-mono text-[10px] tracking-widest uppercase text-accent font-bold"
                    >Description des Aptitudes</label
                  >
                  <textarea
                    v-model="formData.aptitudes_story"
                    rows="6"
                    class="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 font-mono text-sm text-white placeholder-white/20 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all"
                    placeholder="Ex: Expert en crochetage, conduite sportive..."
                  ></textarea>
                </div>

                <!-- Skills Grid Below -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <!-- Aptitudes Sociales -->
                  <div class="space-y-4">
                    <div class="flex justify-between items-center">
                      <h3 class="font-display text-lg font-bold uppercase">Aptitudes Sociales</h3>
                      <button
                        @click="addSkillSocial"
                        :disabled="formData.skills_social.length >= 5"
                        class="font-mono text-[10px] font-bold uppercase transition-colors"
                        :class="
                          formData.skills_social.length >= 5
                            ? 'text-white/20 cursor-not-allowed'
                            : 'text-accent hover:text-white'
                        "
                      >
                        + Ajouter (Max 5)
                      </button>
                    </div>
                    <div
                      v-for="(skill, index) in formData.skills_social"
                      :key="index"
                      class="space-y-2 bg-black/20 p-4 rounded-lg border border-white/5"
                    >
                      <div class="flex justify-between gap-2">
                        <input
                          v-model="skill.name"
                          type="text"
                          placeholder="Nom de la compétence"
                          class="bg-transparent border-b border-white/10 focus:border-accent outline-none font-mono text-xs py-1 text-white flex-1"
                        />
                        <button
                          @click="removeSkillSocial(index)"
                          class="text-white/30 hover:text-dead transition-colors"
                        >
                          ✕
                        </button>
                      </div>
                      <div class="flex items-center gap-4">
                        <input
                          v-model.number="skill.percent"
                          type="range"
                          min="0"
                          max="100"
                          class="flex-1 accent-accent"
                        />
                        <span class="font-mono text-xs text-accent w-8 text-right"
                          >{{ skill.percent }}%</span
                        >
                      </div>
                    </div>
                  </div>

                  <!-- Expertise Technique -->
                  <div class="space-y-4">
                    <div class="flex justify-between items-center">
                      <h3 class="font-display text-lg font-bold uppercase">Expertise Technique</h3>
                      <button
                        @click="addSkillTech"
                        :disabled="formData.skills_tech.length >= 5"
                        class="font-mono text-[10px] font-bold uppercase transition-colors"
                        :class="
                          formData.skills_tech.length >= 5
                            ? 'text-white/20 cursor-not-allowed'
                            : 'text-accent hover:text-white'
                        "
                      >
                        + Ajouter (Max 5)
                      </button>
                    </div>
                    <div
                      v-for="(skill, index) in formData.skills_tech"
                      :key="index"
                      class="space-y-2 bg-black/20 p-4 rounded-lg border border-white/5"
                    >
                      <div class="flex justify-between gap-2">
                        <input
                          v-model="skill.name"
                          type="text"
                          placeholder="Nom de la compétence"
                          class="bg-transparent border-b border-white/10 focus:border-accent outline-none font-mono text-xs py-1 text-white flex-1"
                        />
                        <button
                          @click="removeSkillTech(index)"
                          class="text-white/30 hover:text-dead transition-colors"
                        >
                          ✕
                        </button>
                      </div>
                      <div class="flex items-center gap-4">
                        <input
                          v-model.number="skill.percent"
                          type="range"
                          min="0"
                          max="100"
                          class="flex-1 accent-accent"
                        />
                        <span class="font-mono text-xs text-accent w-8 text-right"
                          >{{ skill.percent }}%</span
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </transition>

            <!-- STEP 7 : Relations & Proches -->
            <transition
              enter-active-class="transition duration-500 ease-out delay-100"
              enter-from-class="opacity-0 translate-x-8"
              enter-to-class="opacity-100 translate-x-0"
              leave-active-class="transition duration-300 ease-in absolute w-full left-0 px-6 md:px-10"
              leave-from-class="opacity-100 translate-x-0"
              leave-to-class="opacity-0 -translate-x-8"
            >
              <div v-if="currentStep === 5" class="space-y-8">
                <div>
                  <h2 class="font-display text-2xl font-bold uppercase tracking-tight mb-2">
                    Relations & Proches
                  </h2>
                  <p class="font-mono text-[11px] text-white/40">
                    Définissez l'entourage du personnage.
                  </p>
                </div>

                <div class="space-y-4">
                  <div class="flex justify-between items-center">
                    <h3 class="font-display text-lg font-bold uppercase">Entourage</h3>
                    <button
                      @click="addRelation"
                      :disabled="formData.relations.length >= 8"
                      class="font-mono text-[10px] font-bold uppercase transition-colors"
                      :class="
                        formData.relations.length >= 8
                          ? 'text-white/20 cursor-not-allowed'
                          : 'text-accent hover:text-white'
                      "
                    >
                      + Ajouter (Max 8)
                    </button>
                  </div>

                  <div
                    v-for="(relation, index) in formData.relations"
                    :key="index"
                    class="grid grid-cols-1 md:grid-cols-3 gap-4 bg-black/20 p-4 rounded-lg border border-white/5 relative"
                  >
                    <button
                      @click="removeRelation(index)"
                      class="absolute top-2 right-2 text-white/30 hover:text-dead transition-colors"
                    >
                      ✕
                    </button>

                    <div class="space-y-1">
                      <label class="font-mono text-[9px] uppercase text-white/40">Nom</label>
                      <input
                        v-model="relation.name"
                        type="text"
                        placeholder="Ex: Elena Davis"
                        class="w-full bg-black/40 border border-white/10 rounded px-3 py-2 font-mono text-xs text-white focus:outline-none focus:border-accent"
                      />
                    </div>
                    <div class="space-y-1">
                      <label class="font-mono text-[9px] uppercase text-white/40">Relation</label>
                      <input
                        v-model="relation.relation"
                        type="text"
                        placeholder="Ex: Mère"
                        class="w-full bg-black/40 border border-white/10 rounded px-3 py-2 font-mono text-xs text-white focus:outline-none focus:border-accent"
                      />
                    </div>
                    <div class="space-y-1">
                      <label class="font-mono text-[9px] uppercase text-white/40">Statut</label>
                      <select
                        v-model="relation.status"
                        class="w-full bg-black/40 border border-white/10 rounded px-3 py-2 font-mono text-xs text-white focus:outline-none focus:border-accent"
                      >
                        <option value="alive">En Vie</option>
                        <option value="dead">Décédé</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </transition>

            <!-- STEP 8 : Objectifs & Ambitions -->
            <transition
              enter-active-class="transition duration-500 ease-out delay-100"
              enter-from-class="opacity-0 translate-x-8"
              enter-to-class="opacity-100 translate-x-0"
              leave-active-class="transition duration-300 ease-in absolute w-full left-0 px-6 md:px-10"
              leave-from-class="opacity-100 translate-x-0"
              leave-to-class="opacity-0 -translate-x-8"
            >
              <div v-if="currentStep === 6" class="space-y-8">
                <div>
                  <h2 class="font-display text-2xl font-bold uppercase tracking-tight mb-2">
                    Objectifs & Ambitions
                  </h2>
                  <p class="font-mono text-[11px] text-white/40">
                    Définissez les buts de votre personnage.
                  </p>
                </div>

                <div class="space-y-6">
                  <!-- Court Terme -->
                  <div class="space-y-2">
                    <div class="flex justify-between items-center">
                      <label
                        class="font-mono text-[10px] tracking-widest uppercase text-accent font-bold"
                        >À Court Terme</label
                      >
                      <button
                        @click="addObjectiveShort"
                        :disabled="formData.objectives_short.length >= 4"
                        class="font-mono text-[9px] font-bold uppercase transition-colors"
                        :class="
                          formData.objectives_short.length >= 4
                            ? 'text-white/20 cursor-not-allowed'
                            : 'text-accent hover:text-white'
                        "
                      >
                        + Ajouter (Max 4)
                      </button>
                    </div>
                    <div
                      v-for="(obj, index) in formData.objectives_short"
                      :key="index"
                      class="flex gap-2"
                    >
                      <input
                        v-model="formData.objectives_short[index]"
                        type="text"
                        placeholder="Ex: Trouver une planque"
                        class="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 font-mono text-xs text-white focus:outline-none focus:border-accent transition-all"
                      />
                      <button
                        @click="removeObjectiveShort(index)"
                        class="text-white/30 hover:text-dead transition-colors"
                      >
                        ✕
                      </button>
                    </div>
                  </div>

                  <!-- Moyen Terme -->
                  <div class="space-y-2">
                    <div class="flex justify-between items-center">
                      <label
                        class="font-mono text-[10px] tracking-widest uppercase text-accent font-bold"
                        >À Moyen Terme</label
                      >
                      <button
                        @click="addObjectiveMedium"
                        :disabled="formData.objectives_medium.length >= 4"
                        class="font-mono text-[9px] font-bold uppercase transition-colors"
                        :class="
                          formData.objectives_medium.length >= 4
                            ? 'text-white/20 cursor-not-allowed'
                            : 'text-accent hover:text-white'
                        "
                      >
                        + Ajouter (Max 4)
                      </button>
                    </div>
                    <div
                      v-for="(obj, index) in formData.objectives_medium"
                      :key="index"
                      class="flex gap-2"
                    >
                      <input
                        v-model="formData.objectives_medium[index]"
                        type="text"
                        placeholder="Ex: Développer un réseau"
                        class="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 font-mono text-xs text-white focus:outline-none focus:border-accent transition-all"
                      />
                      <button
                        @click="removeObjectiveMedium(index)"
                        class="text-white/30 hover:text-dead transition-colors"
                      >
                        ✕
                      </button>
                    </div>
                  </div>

                  <!-- Long Terme -->
                  <div class="space-y-2">
                    <div class="flex justify-between items-center">
                      <label
                        class="font-mono text-[10px] tracking-widest uppercase text-accent font-bold"
                        >À Long Terme</label
                      >
                      <button
                        @click="addObjectiveLong"
                        :disabled="formData.objectives_long.length >= 4"
                        class="font-mono text-[9px] font-bold uppercase transition-colors"
                        :class="
                          formData.objectives_long.length >= 4
                            ? 'text-white/20 cursor-not-allowed'
                            : 'text-accent hover:text-white'
                        "
                      >
                        + Ajouter (Max 4)
                      </button>
                    </div>
                    <div
                      v-for="(obj, index) in formData.objectives_long"
                      :key="index"
                      class="flex gap-2"
                    >
                      <input
                        v-model="formData.objectives_long[index]"
                        type="text"
                        placeholder="Ex: Devenir incontournable"
                        class="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 font-mono text-xs text-white focus:outline-none focus:border-accent transition-all"
                      />
                      <button
                        @click="removeObjectiveLong(index)"
                        class="text-white/30 hover:text-dead transition-colors"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </transition>

            <!-- STEP 9 : Visuels -->
            <transition
              enter-active-class="transition duration-500 ease-out delay-100"
              enter-from-class="opacity-0 translate-x-8"
              enter-to-class="opacity-100 translate-x-0"
              leave-active-class="transition duration-300 ease-in absolute w-full left-0 px-6 md:px-10"
              leave-from-class="opacity-100 translate-x-0"
              leave-to-class="opacity-0 -translate-x-8"
            >
              <div v-if="currentStep === 7" class="space-y-8">
                <div>
                  <h2 class="font-display text-2xl font-bold uppercase tracking-tight mb-2">
                    Visuels
                  </h2>
                  <p class="font-mono text-[11px] text-white/40">
                    Uploadez les photos de couverture.
                    <span class="text-accent font-bold">(Minimum 3, Maximum 6 images)</span>
                  </p>
                </div>

                <div
                  class="border-2 border-dashed border-white/10 rounded-xl bg-black/20 hover:bg-black/40 hover:border-accent/50 transition-all duration-300 p-12 flex flex-col items-center justify-center gap-4 cursor-pointer group"
                >
                  <div
                    class="size-16 rounded-full bg-white/5 flex items-center justify-center text-white/30 group-hover:text-accent group-hover:scale-110 transition-all duration-500"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="size-8"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="17 8 12 3 7 8"></polyline>
                      <line x1="12" y1="3" x2="12" y2="15"></line>
                    </svg>
                  </div>
                  <div class="text-center">
                    <div
                      class="font-mono text-[10px] tracking-widest text-white/50 uppercase font-bold group-hover:text-accent transition-colors"
                    >
                      Glissez vos images ici
                    </div>
                    <div class="font-mono text-[9px] text-white/30 mt-1">
                      PNG, JPG, WEBP jusqu'à 5MB (Min 3, Max 6)
                    </div>
                  </div>
                </div>
              </div>
            </transition>

            <!-- Navigation Footer -->
            <div class="mt-auto pt-10 flex justify-between items-center relative z-20">
              <button
                @click="prevStep"
                class="font-mono text-[10px] tracking-[3px] uppercase font-bold text-white/40 hover:text-white transition-colors flex items-center gap-2 px-4 py-2"
              >
                ← {{ currentStep === 1 ? 'Annuler' : 'Précédent' }}
              </button>

              <transition
                enter-active-class="transition duration-300 ease-out"
                enter-from-class="opacity-0 translate-y-2"
                enter-to-class="opacity-100 translate-y-0"
                leave-active-class="transition duration-200 ease-in"
                leave-from-class="opacity-100 translate-y-0"
                leave-to-class="opacity-0 translate-y-2"
              >
                <div
                  v-if="errorMsg"
                  class="absolute -top-6 left-1/2 -translate-x-1/2 text-red-500 font-mono text-[10px] uppercase font-bold tracking-widest text-center whitespace-nowrap bg-black/80 px-4 py-1 rounded border border-red-500/30"
                >
                  ⚠ {{ errorMsg }}
                </div>
              </transition>

              <button
                @click="nextStep"
                class="bg-white text-black font-mono text-[10px] tracking-[3px] uppercase font-bold px-8 py-3 rounded-lg hover:bg-accent hover:shadow-[0_0_20px_rgba(var(--accent-rgb),0.4)] transition-all flex items-center gap-2"
              >
                {{ currentStep === totalSteps ? 'Terminer' : 'Suivant' }} →
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
