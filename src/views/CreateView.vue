<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { uiState } from '@/store/ui.ts'
import { getCharColors } from '@/utils/colors.ts'
import TheNavbar from '@/components/TheNavbar.vue'
import { CharacterSchema } from '@/types/character.schema'
import type { Character } from '@/types/character'
import { supabase } from '@/utils/supabase'
import { authState } from '@/store/auth'
import type { DbCharacter } from '@/utils/mappers'

const router = useRouter()
const route = useRoute()

// On génère une couleur d'accent pour le tunnel
const createColors = getCharColors('create-tunnel')

const isEditMode = ref(false)
const characterId = ref<number | null>(null)
const isLoadingEditData = ref(false)

const fetchCharacterForEdit = async (id: number) => {
  try {
    isLoadingEditData.value = true
    const { data, error } = await supabase
      .from('characters')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    if (data) {
      if (data.owner_id !== authState.user?.id) {
        uiState.showToast('Erreur', 'Vous n\'êtes pas le propriétaire de ce dossier', 'error')
        router.push({ name: 'hub' })
        return
      }
      
      formData.value.privacy = data.privacy || 'public'
      formData.value.firstName = data.first_name || ''
      formData.value.lastName = data.last_name || ''
      formData.value.status = data.status || 'alive'
      formData.value.serverDomain = data.server_domain || ''
      formData.value.discordUrl = data.discord_url || ''
      formData.value.reference = (data.ref || '').split('<br>')[0] || data.ref || ''
      formData.value.alias = data.alias || ''
      
      const panels = (data.chapter1?.identityPanels || []) as Array<Array<{ key: string; value: string; class?: string }>>
      const findValue = (key: string) => {
        for (const panel of panels) {
          const found = panel.find((item) => item.key.toLowerCase().trim() === key.toLowerCase().trim())
          if (found) return found.value
        }
        return ''
      }

      // Convert "12 / 10 / 1998" to "1998-10-12" for type="date" inputs
      const rawBirthDate = findValue('Date de naissance') || ''
      if (rawBirthDate.includes('/')) {
        const parts = rawBirthDate.split('/').map(p => p.trim())
        if (parts.length === 3) {
          formData.value.birthDate = `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`
        } else {
          formData.value.birthDate = rawBirthDate
        }
      } else {
        formData.value.birthDate = rawBirthDate
      }

      formData.value.birthPlace = findValue('Lieu de naissance') || ''
      formData.value.currentCity = findValue('Ville actuelle') || ''
      formData.value.origins = findValue('Origine(s)') || data.origines || ''

      // Strip " cm" and " kg" units so validators don't complain or double them
      const rawHeight = findValue('Taille') || data.taille || ''
      formData.value.height = rawHeight.replace(/\s*cm$/, '').trim()

      const rawWeight = findValue('Poids') || data.poids || ''
      formData.value.weight = rawWeight.replace(/\s*kg$/, '').trim()

      formData.value.specialSign = findValue('Signe particulier') || ''
      formData.value.father = findValue('Père') || ''
      formData.value.mother = findValue('Mère') || ''
      formData.value.past = findValue('Passé') || ''
      formData.value.passions = findValue('Passion(s)') || ''
      formData.value.vehicle = findValue('Véhicule') || data.vehicule_ref || ''
      formData.value.specialty = findValue('Spécialité') || ''

      // Strip quotes from alias if present
      if (formData.value.alias) {
        formData.value.alias = formData.value.alias.replace(/^"|"$/g, '')
      } else {
        const rawAlias = findValue('Surnom') || ''
        formData.value.alias = rawAlias.replace(/^"|"$/g, '')
      }

      formData.value.qualities = (data.chapter1?.profile?.qualités || []).join(', ')
      formData.value.flaws = (data.chapter1?.profile?.défauts || []).join(', ')
      formData.value.dossierNote = data.chapter1?.infoPlus?.text || ''

      formData.value.origins_story = (data.chapter2?.story1 || []).join('\n')
      formData.value.adult_story = (data.chapter3?.story1 || []).join('\n')
      formData.value.aptitudes_story = (data.chapter4?.story1 || []).join('\n')

      const socialGrp = data.chapter4?.skillsGroups?.find((g: { title: string }) => g.title.includes('sociales'))
      if (socialGrp && socialGrp.skills) {
        formData.value.skills_social = socialGrp.skills.map((s: { name: string; percent: number }) => ({ name: s.name, percent: s.percent }))
      }
      const techGrp = data.chapter4?.skillsGroups?.find((g: { title: string }) => g.title.includes('technique'))
      if (techGrp && techGrp.skills) {
        formData.value.skills_tech = techGrp.skills.map((s: { name: string; percent: number }) => ({ name: s.name, percent: s.percent }))
      }

      if (data.family && data.family.length > 0) {
        formData.value.relations = data.family.map((r: { name: string; relation: string; status?: 'alive' | 'dead' }) => ({ name: r.name, relation: r.relation, status: r.status || 'alive' }))
      } else {
        formData.value.relations = [{ name: '', relation: '', status: 'alive' }]
      }

      if (data.chapter6?.objectives) {
        const obj = data.chapter6.objectives
        formData.value.objectives_short = [obj.shortTerm?.[0] || '', obj.shortTerm?.[1] || '', obj.shortTerm?.[2] || '', obj.shortTerm?.[3] || ''].filter((o, i) => o || i < 3)
        formData.value.objectives_medium = [obj.mediumTerm?.[0] || '', obj.mediumTerm?.[1] || '', obj.mediumTerm?.[2] || '', obj.mediumTerm?.[3] || ''].filter((o, i) => o || i < 3)
        formData.value.objectives_long = [obj.longTerm?.[0] || '', obj.longTerm?.[1] || '', obj.longTerm?.[2] || '', obj.longTerm?.[3] || ''].filter((o, i) => o || i < 3)
      }

      formData.value.photos = data.photos || []
    }
  } catch (e) {
    console.error(e)
    uiState.showToast('Erreur', 'Impossible de charger les données du dossier', 'error')
    router.push({ name: 'hub' })
  } finally {
    isLoadingEditData.value = false
  }
}

onMounted(() => {
  if (route.name === 'edit' && route.params.id) {
    isEditMode.value = true
    characterId.value = Number(route.params.id)
    document.title = 'RP/STORIES | Modifier Dossier'
    if (!isNaN(characterId.value)) {
      fetchCharacterForEdit(characterId.value)
    }
  } else {
    document.title = 'RP/STORIES | Nouveau Dossier'
  }

  const accent = (route.query.accent as string) || createColors.accent
  const accent2 = (route.query.accent2 as string) || createColors.accent2
  const accentRgb = (route.query.accentRgb as string) || createColors.accentRgb

  uiState.setColors(accent, accent2, accentRgb)
  window.scrollTo(0, 0)
})

const currentStep = ref(1)
const totalSteps = 7

const formData = ref({
  privacy: 'public' as 'public' | 'followers' | 'private',
  firstName: '',
  lastName: '',
  status: 'alive',
  serverDomain: '',
  discordUrl: '',
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
  qualities: '',
  flaws: '',
  dossierNote: '',
  // Chapitres & Histoire
  origins_story: '',
  adult_story: '',
  aptitudes_story: '',
  // Compétences (Pourcentages) - 4 compétences requises par défaut
  skills_social: [
    { name: 'Analyse comportementale', percent: 50 },
    { name: 'Discrétion & Infiltration', percent: 50 },
    { name: 'Sang-froid (Under Pressure)', percent: 50 },
    { name: 'Persuasion & Charisme', percent: 50 },
  ],
  skills_tech: [
    { name: 'Lockpicking Avancé', percent: 50 },
    { name: 'Bypass de Sécurité', percent: 50 },
    { name: 'Piratage de Systèmes', percent: 50 },
    { name: 'Combat au Corps à Corps', percent: 50 },
  ],
  // Relations
  relations: [{ name: '', relation: '', status: 'alive' }],
  // Objectifs - 3 objectifs requis par défaut
  objectives_short: ['', '', ''],
  objectives_medium: ['', '', ''],
  objectives_long: ['', '', ''],
  // Photos - Entre 3 et 6 photos
  photos: [] as string[],
})

watch(
  () => [formData.value.firstName, formData.value.lastName],
  ([newFirst, newLast]) => {
    if (isEditMode.value) return
    const p = newFirst ? newFirst.trim().charAt(0).toUpperCase() : 'X'
    const n = newLast ? newLast.trim().charAt(0).toUpperCase() : 'X'
    const randomId = String(Math.floor(Math.random() * 99) + 1).padStart(2, '0')
    formData.value.reference = `DOSSIER REF: 2026-${p}${n}-${randomId}`
  },
)

const errorMsg = ref('')

const calculateAge = (birthDateStr: string): string => {
  let birthDate: Date
  if (birthDateStr.includes('-')) {
    birthDate = new Date(birthDateStr)
  } else if (birthDateStr.includes('/')) {
    const parts = birthDateStr.split('/')
    birthDate = new Date(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0]))
  } else {
    return 'XX'
  }

  if (isNaN(birthDate.getTime())) return 'XX'
  const today = new Date()
  let age = today.getFullYear() - birthDate.getFullYear()
  const m = today.getMonth() - birthDate.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }
  return String(age)
}

const mapFormToCharacter = (): Character => {
  const p = formData.value.firstName ? formData.value.firstName.trim().charAt(0).toUpperCase() : 'X'
  const n = formData.value.lastName ? formData.value.lastName.trim().charAt(0).toUpperCase() : 'X'
  const randomId = String(Math.floor(Math.random() * 99) + 1).padStart(2, '0')
  const refCode = `2026-${p}${n}-${randomId}`
  const p3Padded = randomId.padStart(4, '0')

  const id = isEditMode.value && characterId.value ? characterId.value : 0 // ID will be generated by Supabase if 0
  const age = calculateAge(formData.value.birthDate)
  const photos = formData.value.photos.filter((url) => url.trim() !== '')

  return {
    id,
    pageTitle: `Dossier RP – ${formData.value.firstName} ${formData.value.lastName}`,
    cover: {
      status: formData.value.status as 'alive' | 'dead',
      serverDomain: formData.value.serverDomain.trim(),
      discordUrl: formData.value.discordUrl ? formData.value.discordUrl.trim() : undefined,
      eyebrow: `// DOSSIER RP #2026${p}${n}${p3Padded}`,
      firstName: formData.value.firstName.trim().toUpperCase(),
      lastName: formData.value.lastName.trim().toUpperCase(),
      alias: formData.value.alias.trim(),
      meta: [
        { key: 'Âge', value: age },
        { key: 'Taille', value: formData.value.height.trim().includes('cm') ? formData.value.height.trim() : `${formData.value.height.trim()} cm` },
        { key: 'Poids', value: formData.value.weight.trim().includes('kg') ? formData.value.weight.trim() : `${formData.value.weight.trim()} kg` },
        { key: 'Origines', value: formData.value.origins.trim() },
        { key: 'Véhicule de réf', value: formData.value.vehicle.trim() },
      ],
      ref: `DOSSIER REF: ${refCode}<br>STATUT: ACTIF · EN SERVICE<br>USAGE: ROLEPLAY EXCLUSIF`,
      photos,
    },
    chapter1: {
      label: 'Présentation du personnage',
      titleLines: ['Profil &', 'Identité'],
      identityPanels: [
        [
          { key: 'Nom', value: formData.value.lastName.trim() },
          { key: 'Prénom', value: formData.value.firstName.trim() },
          { key: 'Surnom', value: `"${formData.value.alias.trim()}"`, class: 'text-accent' },
          { key: 'Date de naissance', value: formData.value.birthDate.split('-').reverse().join(' / ') },
          { key: 'Lieu de naissance', value: formData.value.birthPlace.trim() },
          { key: 'Ville actuelle', value: formData.value.currentCity.trim(), class: 'text-accent-alt' },
          { key: 'Origine(s)', value: formData.value.origins.trim() },
          { key: 'Taille', value: formData.value.height.trim().includes('cm') ? formData.value.height.trim() : `${formData.value.height.trim()} cm` },
          { key: 'Poids', value: formData.value.weight.trim().includes('kg') ? formData.value.weight.trim() : `${formData.value.weight.trim()} kg` },
        ],
        [
          { key: 'Signe particulier', value: formData.value.specialSign.trim(), class: 'text-accent' },
          { key: 'Père', value: formData.value.father.trim(), class: formData.value.father.toLowerCase().includes('inconnu') ? 'text-muted' : '' },
          { key: 'Mère', value: formData.value.mother.trim(), class: formData.value.mother.toLowerCase().includes('inconnu') ? 'text-muted' : '' },
          { key: 'Passé', value: formData.value.past.trim() },
          { key: 'Passion(s)', value: formData.value.passions.trim() },
          { key: 'Véhicule', value: formData.value.vehicle.trim(), class: 'text-accent' },
          { key: 'Spécialité', value: formData.value.specialty.trim(), class: 'text-accent' },
        ],
      ],
      profile: {
        qualités: formData.value.qualities ? formData.value.qualities.split(',').map(s => s.trim()).filter(s => s) : ['Inconnu'],
        défauts: formData.value.flaws ? formData.value.flaws.split(',').map(s => s.trim()).filter(s => s) : ['Inconnu'],
      },
      infoPlus: {
        icon: '📝',
        title: 'Note de Dossier',
        text: formData.value.dossierNote.trim() || `Fiche créée le ${new Date().toLocaleDateString('fr-FR')}.`,
      },
    },
    chapter2: {
      label: 'Histoire',
      titleLines: ['Les', 'origines', 'text-accent-alt'],
      story1: [formData.value.origins_story.trim()],
    },
    chapter3: {
      label: 'Histoire',
      titleLines: ["La vie", "d'adulte", "text-accent"],
      story1: [formData.value.adult_story.trim()],
    },
    chapter4: {
      label: 'Aptitudes',
      titleLines: ['Spécialités &', 'compétences', 'text-accent'],
      story1: [formData.value.aptitudes_story.trim()],
      skillsGroups: [
        {
          title: '// Aptitudes sociales',
          skills: formData.value.skills_social.map((s) => ({ name: s.name.trim(), percent: s.percent })),
        },
        {
          title: '// Expertise technique',
          skills: formData.value.skills_tech.map((s) => ({ name: s.name.trim(), percent: s.percent })),
        },
      ],
      callout: `// PROFIL : Spécialiste avec expertise en ${formData.value.specialty.trim()}. //`,
    },
    chapter6: {
      label: 'Le futur',
      titleLines: ['Objectifs &', 'ambitions', 'text-accent'],
      objectives: {
        shortTerm: formData.value.objectives_short.map((o) => o.trim()).filter(Boolean),
        mediumTerm: formData.value.objectives_medium.map((o) => o.trim()).filter(Boolean),
        longTerm: formData.value.objectives_long.map((o) => o.trim()).filter(Boolean),
      },
      finaleStory: [`Le dossier de ${formData.value.firstName} ${formData.value.lastName} reste actif et sous surveillance.`],
      finaleQuote: `"${formData.value.alias.trim() || formData.value.firstName}. J'arrive à Los Santos."`,
    },
    family: formData.value.relations
      .filter((r) => r.name.trim() !== '')
      .map((r) => ({
        name: r.name.trim(),
        relation: r.relation.trim(),
        status: r.status as 'alive' | 'dead',
      })),
    footer: `DOSSIER RP — ${formData.value.firstName.toUpperCase()} ${formData.value.lastName.toUpperCase()} · ${formData.value.currentCity.toUpperCase()} · REF: ${refCode}<br>Document créé par RPStories — Five M · Personnage fictif · v2.2`,
  }
}

const validateStep = (step: number) => {
  errorMsg.value = ''
  if (step === 1) {
    if (!formData.value.firstName.trim()) return 'Le prénom est requis.'
    if (!formData.value.lastName.trim()) return 'Le nom de famille est requis.'
    if (!formData.value.serverDomain.trim()) return 'Le domaine est requis.'
    if (!formData.value.status.trim()) return 'Le statut est requis.'
    if (formData.value.discordUrl && !formData.value.discordUrl.startsWith('http')) {
      return 'Le lien Discord doit être une URL valide (ex: https://...).'
    }
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

    const heightRegex = /^\d{3}$|^\d\.\d{2}$|^\d{3}\s*cm$/
    if (!heightRegex.test(formData.value.height.trim()))
      return 'La taille doit être un nombre (ex: 185 ou 1.85).'

    const weightRegex = /^\d{2,3}$|^\d{2,3}\s*kg$/
    if (!weightRegex.test(formData.value.weight.trim()))
      return 'Le poids doit être un nombre (ex: 75).'
  }
  if (step === 3) {
    if (!formData.value.origins_story.trim()) return 'Le récit des origines est requis.'
    if (!formData.value.adult_story.trim()) return "Le récit de la vie d'adulte est requis."
  }
  if (step === 4) {
    if (!formData.value.aptitudes_story.trim()) return 'La description des aptitudes est requise.'
    if (formData.value.skills_social.length < 4)
      return 'Au moins 4 aptitudes sociales sont requises.'
    for (const skill of formData.value.skills_social) {
      if (!skill.name.trim()) return 'Toutes les aptitudes sociales doivent avoir un nom.'
    }
    if (formData.value.skills_tech.length < 4)
      return 'Au moins 4 expertises techniques sont requises.'
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
      formData.value.objectives_short.length < 3 ||
      formData.value.objectives_short.some((o) => !o.trim())
    )
      return 'Au moins 3 objectifs à court terme remplis sont requis.'
    if (
      formData.value.objectives_medium.length < 3 ||
      formData.value.objectives_medium.some((o) => !o.trim())
    )
      return 'Au moins 3 objectifs à moyen terme remplis sont requis.'
    if (
      formData.value.objectives_long.length < 3 ||
      formData.value.objectives_long.some((o) => !o.trim())
    )
      return 'Au moins 3 objectifs à long terme remplis sont requis.'
  }
  if (step === 7) {
    const validPhotos = formData.value.photos.filter((p) => p.trim() !== '')
    if (validPhotos.length < 3 || validPhotos.length > 6) {
      return 'Vous devez fournir entre 3 et 6 URLs de photos pour la bannière.'
    }
  }
  return ''
}
const isSubmitting = ref(false)

const submitForm = async () => {
  if (!authState.user) {
    errorMsg.value = 'Vous devez être connecté pour archiver un dossier.'
    return
  }

  // Action finale : validation Zod globale et insertion Supabase
  try {
    isSubmitting.value = true
    const characterObj = mapFormToCharacter()
    const result = CharacterSchema.safeParse(characterObj)
    
    if (!result.success) {
      const firstError = result.error.issues[0]
      errorMsg.value = `${firstError.path.join('.')}: ${firstError.message}`
      console.error('Erreur de validation Zod:', result.error)
      isSubmitting.value = false
      return
    }

    const dbObj: Omit<DbCharacter, 'id' | 'created_at' | 'updated_at'> = {
      owner_id: authState.user.id,
      privacy: formData.value.privacy,
      first_name: characterObj.cover.firstName,
      last_name: characterObj.cover.lastName,
      alias: characterObj.cover.alias,
      status: characterObj.cover.status,
      server_domain: characterObj.cover.serverDomain,
      discord_url: characterObj.cover.discordUrl || null,
      eyebrow: characterObj.cover.eyebrow,
      ref: characterObj.cover.ref,
      photos: characterObj.cover.photos,
      
      age: parseInt(characterObj.cover.meta[0].value as string) || 0,
      taille: characterObj.cover.meta[1].value,
      poids: characterObj.cover.meta[2].value,
      origines: characterObj.cover.meta[3].value,
      vehicule_ref: characterObj.cover.meta[4].value,
      
      chapter1: characterObj.chapter1,
      chapter2: characterObj.chapter2,
      chapter3: characterObj.chapter3,
      chapter4: characterObj.chapter4 || null,
      chapter5: characterObj.chapter5 || null,
      chapter6: characterObj.chapter6,
      family: characterObj.family || null,
      footer: characterObj.footer
    }

    let saveError
    if (isEditMode.value && characterId.value) {
      console.log('Début de la mise à jour (UPDATE) dans Supabase...', { id: characterId.value, dbObj })
      const { error } = await supabase.from('characters').update(dbObj).eq('id', characterId.value)
      console.log('Mise à jour terminée. Erreur:', error)
      saveError = error
    } else {
      console.log('Début de la création (INSERT) dans Supabase...', dbObj)
      const { error } = await supabase.from('characters').insert(dbObj)
      console.log('Création terminée. Erreur:', error)
      saveError = error
    }
    
    if (saveError) {
      console.error('Erreur retournée par Supabase:', saveError)
      throw saveError
    }

    console.log('Données sauvegardées en BDD:', result.data)
    uiState.showToast('Succès', 'Dossier archivé avec succès', 'success')
    router.push({ name: 'hub' })
  } catch (e) {
    console.error(e)
    const msg = e instanceof Error ? e.message : String(e)
    errorMsg.value = `Erreur lors de la sauvegarde : ${msg}`
  } finally {
    isSubmitting.value = false
  }
}

const nextStep = async () => {
  const error = validateStep(currentStep.value)
  if (error) {
    errorMsg.value = error
    return
  }
  errorMsg.value = ''

  if (currentStep.value < totalSteps) {
    currentStep.value++
  } else {
    await submitForm()
  }
}

const saveDirectly = async () => {
  // En mode édition, valider toutes les étapes pour s'assurer que les données modifiées ou existantes sont correctes.
  // Si une étape a une erreur, on y redirige pour que l'utilisateur corrige.
  for (let s = 1; s <= totalSteps; s++) {
    const error = validateStep(s)
    if (error) {
      errorMsg.value = `Étape ${s} : ${error}`
      currentStep.value = s
      return
    }
  }
  errorMsg.value = ''
  await submitForm()
}

const prevStep = () => {
  errorMsg.value = ''
  if (currentStep.value > 1) {
    currentStep.value--
  } else {
    router.push({ name: 'hub' })
  }
}

const goToStep = (step: number) => {
  if (step === currentStep.value) return
  if (step < currentStep.value) {
    errorMsg.value = ''
    currentStep.value = step
    return
  }
  // Validation des étapes intermédiaires pour avancer
  for (let s = currentStep.value; s < step; s++) {
    const error = validateStep(s)
    if (error) {
      errorMsg.value = `Étape ${s} : ${error}`
      currentStep.value = s
      return
    }
  }
  errorMsg.value = ''
  currentStep.value = step
}

const addSkillSocial = () => {
  if (formData.value.skills_social.length < 5) {
    formData.value.skills_social.push({ name: '', percent: 50 })
  }
}
const removeSkillSocial = (index: number) => {
  if (formData.value.skills_social.length > 4) {
    formData.value.skills_social.splice(index, 1)
  }
}
const addSkillTech = () => {
  if (formData.value.skills_tech.length < 5) {
    formData.value.skills_tech.push({ name: '', percent: 50 })
  }
}
const removeSkillTech = (index: number) => {
  if (formData.value.skills_tech.length > 4) {
    formData.value.skills_tech.splice(index, 1)
  }
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
  if (formData.value.objectives_short.length > 3) {
    formData.value.objectives_short.splice(index, 1)
  }
}
const addObjectiveMedium = () => {
  if (formData.value.objectives_medium.length < 4) {
    formData.value.objectives_medium.push('')
  }
}
const removeObjectiveMedium = (index: number) => {
  if (formData.value.objectives_medium.length > 3) {
    formData.value.objectives_medium.splice(index, 1)
  }
}
const addObjectiveLong = () => {
  if (formData.value.objectives_long.length < 4) {
    formData.value.objectives_long.push('')
  }
}
const removeObjectiveLong = (index: number) => {
  if (formData.value.objectives_long.length > 3) {
    formData.value.objectives_long.splice(index, 1)
  }
}
const isDragging = ref(false)
const fileInput = ref<HTMLInputElement | null>(null)
const directUrlInput = ref('')

const handleDragOver = () => {
  isDragging.value = true
}
const handleDragLeave = () => {
  isDragging.value = false
}

const triggerFileInput = () => {
  fileInput.value?.click()
}

const processFiles = (files: FileList) => {
  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    if (!file.type.startsWith('image/')) continue
    if (formData.value.photos.length >= 6) {
      uiState.showToast('Limite d\'images', 'Maximum 6 photos autorisées', 'error')
      break
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      if (e.target?.result && typeof e.target.result === 'string') {
        formData.value.photos.push(e.target.result)
      }
    }
    reader.readAsDataURL(file)
  }
}

const handleDrop = (e: DragEvent) => {
  isDragging.value = false
  if (e.dataTransfer?.files) {
    processFiles(e.dataTransfer.files)
  }
}

const handleFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (target.files) {
    processFiles(target.files)
  }
}

const addDirectUrl = () => {
  const url = directUrlInput.value.trim()
  if (!url) return
  if (formData.value.photos.length >= 6) {
    uiState.showToast('Limite d\'images', 'Maximum 6 photos autorisées', 'error')
    return
  }
  formData.value.photos.push(url)
  directUrlInput.value = ''
}

const removePhoto = (index: number) => {
  formData.value.photos.splice(index, 1)
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
              {{ isEditMode ? '// MODIFICATION PERSONNAGE //' : '// CRÉATION PERSONNAGE //' }}
            </div>
            <h1
              class="font-display font-black text-4xl md:text-6xl uppercase tracking-tighter leading-none"
            >
              {{ isEditMode ? 'Modifier' : 'Nouveau' }} <span class="text-white/40">Dossier</span>
            </h1>
          </div>

          <!-- Stepper Indicator -->
          <div class="flex gap-3 justify-center">
            <button
              v-for="step in totalSteps"
              :key="step"
              @click="goToStep(step)"
              class="flex flex-col items-center gap-2 group cursor-pointer focus:outline-none"
              :title="`Aller à l'étape ${step}`"
            >
              <div
                class="w-12 h-1 rounded-full transition-all duration-500 group-hover:bg-accent/50"
                :class="
                  step <= currentStep
                    ? 'bg-accent shadow-[0_0_10px_rgba(var(--accent-rgb),0.5)]'
                    : 'bg-white/10'
                "
              ></div>
              <span
                class="font-mono text-[9px] font-bold tracking-widest transition-colors duration-500 group-hover:text-accent"
                :class="step <= currentStep ? 'text-accent' : 'text-white/20'"
              >
                0{{ step }}
              </span>
            </button>
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
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  <div class="space-y-2">
                    <label
                      class="font-mono text-[10px] tracking-widest uppercase text-accent font-bold"
                      >Lien Discord du Serveur (Optionnel)</label
                    >
                    <input
                      v-model="formData.discordUrl"
                      type="text"
                      placeholder="Ex: https://discord.gg/invite"
                      class="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 font-display text-lg text-white placeholder-white/20 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all"
                    />
                    <p class="font-mono text-[9px] text-white/30">
                      Lien d'invitation vers le Discord du serveur.
                    </p>
                  </div>
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

                <!-- Confidentialité -->
                <div class="space-y-3 pt-2 border-t border-white/5">
                  <label class="font-mono text-[10px] tracking-widest uppercase text-accent font-bold">Confidentialité du Dossier</label>
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <!-- Public -->
                    <button
                      type="button"
                      @click="formData.privacy = 'public'"
                      class="relative flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-300 overflow-hidden group cursor-pointer"
                      :class="formData.privacy === 'public' ? 'bg-white/10 border-accent shadow-[0_0_15px_rgba(var(--accent-rgb),0.2)]' : 'bg-black/40 border-white/10 hover:border-white/30 hover:bg-white/5'"
                    >
                      <div class="absolute inset-0 bg-linear-to-b from-accent/20 to-transparent opacity-0 transition-opacity duration-300" :class="{'opacity-100': formData.privacy === 'public'}"></div>
                      <div class="size-8 rounded-full mb-3 flex items-center justify-center transition-all duration-300 relative z-10" :class="formData.privacy === 'public' ? 'bg-accent text-black' : 'bg-white/10 text-white/50 group-hover:text-white group-hover:bg-white/20'">
                        <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
                      </div>
                      <span class="font-mono text-[11px] font-bold uppercase tracking-widest relative z-10" :class="formData.privacy === 'public' ? 'text-accent' : 'text-white/70 group-hover:text-white'">Public</span>
                      <span class="font-mono text-[9px] text-white/40 mt-2 text-center relative z-10">Visible par tout le monde dans les archives</span>
                    </button>

                    <!-- Followers -->
                    <button
                      type="button"
                      @click="formData.privacy = 'followers'"
                      class="relative flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-300 overflow-hidden group cursor-pointer"
                      :class="formData.privacy === 'followers' ? 'bg-[#3498db]/10 border-[#3498db] shadow-[0_0_15px_rgba(52,152,219,0.2)]' : 'bg-black/40 border-white/10 hover:border-white/30 hover:bg-white/5'"
                    >
                      <div class="absolute inset-0 bg-linear-to-b from-[#3498db]/20 to-transparent opacity-0 transition-opacity duration-300" :class="{'opacity-100': formData.privacy === 'followers'}"></div>
                      <div class="size-8 rounded-full mb-3 flex items-center justify-center transition-all duration-300 relative z-10" :class="formData.privacy === 'followers' ? 'bg-[#3498db] text-black' : 'bg-white/10 text-white/50 group-hover:text-white group-hover:bg-white/20'">
                        <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                      </div>
                      <span class="font-mono text-[11px] font-bold uppercase tracking-widest relative z-10" :class="formData.privacy === 'followers' ? 'text-[#3498db]' : 'text-white/70 group-hover:text-white'">Abonnés</span>
                      <span class="font-mono text-[9px] text-white/40 mt-2 text-center relative z-10">Visible uniquement par vos abonnés</span>
                    </button>

                    <!-- Private -->
                    <button
                      type="button"
                      @click="formData.privacy = 'private'"
                      class="relative flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-300 overflow-hidden group cursor-pointer"
                      :class="formData.privacy === 'private' ? 'bg-[#e67e22]/10 border-[#e67e22] shadow-[0_0_15px_rgba(230,126,34,0.2)]' : 'bg-black/40 border-white/10 hover:border-white/30 hover:bg-white/5'"
                    >
                      <div class="absolute inset-0 bg-linear-to-b from-[#e67e22]/20 to-transparent opacity-0 transition-opacity duration-300" :class="{'opacity-100': formData.privacy === 'private'}"></div>
                      <div class="size-8 rounded-full mb-3 flex items-center justify-center transition-all duration-300 relative z-10" :class="formData.privacy === 'private' ? 'bg-[#e67e22] text-black' : 'bg-white/10 text-white/50 group-hover:text-white group-hover:bg-white/20'">
                        <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                      </div>
                      <span class="font-mono text-[11px] font-bold uppercase tracking-widest relative z-10" :class="formData.privacy === 'private' ? 'text-[#e67e22]' : 'text-white/70 group-hover:text-white'">Privé</span>
                      <span class="font-mono text-[9px] text-white/40 mt-2 text-center relative z-10">Uniquement visible sur votre Hub</span>
                    </button>
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
                    Remplissez les informations du dossier (18 champs).
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
                  
                  <div class="col-span-1 md:col-span-2 mt-4 border-t border-white/5 pt-6">
                    <h3 class="font-display text-sm font-bold uppercase text-white/50 mb-4">Profil Psychologique</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div class="space-y-2">
                        <label
                          class="font-mono text-[10px] tracking-widest uppercase text-accent font-bold"
                          >Qualités (Séparées par des virgules)</label
                        >
                        <input
                          v-model="formData.qualities"
                          type="text"
                          placeholder="Déterminé, Discret, Ingénieux..."
                          class="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 font-display text-lg text-white placeholder-white/20 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all"
                        />
                      </div>
                      <div class="space-y-2">
                        <label
                          class="font-mono text-[10px] tracking-widest uppercase text-accent font-bold"
                          >Défauts (Séparés par des virgules)</label
                        >
                        <input
                          v-model="formData.flaws"
                          type="text"
                          placeholder="Méfiant, Paranoïaque..."
                          class="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 font-display text-lg text-white placeholder-white/20 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div class="col-span-1 md:col-span-2 mt-4 border-t border-white/5 pt-6">
                    <h3 class="font-display text-sm font-bold uppercase text-white/50 mb-4">Note de Dossier</h3>
                    <div class="space-y-2">
                      <label
                        class="font-mono text-[10px] tracking-widest uppercase text-accent font-bold"
                        >Commentaire Libre (Optionnel)</label
                      >
                      <textarea
                        v-model="formData.dossierNote"
                        placeholder="Ex: Fiche créée le 20/05/2026. Suspect sous surveillance depuis l'incident du port."
                        rows="2"
                        class="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 font-display text-lg text-white placeholder-white/20 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all resize-none"
                      ></textarea>
                    </div>
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
                      v-for="(_, index) in formData.objectives_short"
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
                      v-for="(_, index) in formData.objectives_medium"
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
                      v-for="(_, index) in formData.objectives_long"
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
                    Générez la bannière de profil en glissant vos fichiers ou en collant des URLs.
                    <span class="text-accent font-bold">(Minimum 3, Maximum 6 images)</span>
                  </p>
                </div>

                <div class="space-y-6">
                  <!-- Drag and Drop Slot -->
                  <div
                    @dragover.prevent="handleDragOver"
                    @dragenter.prevent="handleDragOver"
                    @dragleave.prevent="handleDragLeave"
                    @drop.prevent="handleDrop"
                    @click="triggerFileInput"
                    :class="[
                      'relative border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer flex flex-col items-center justify-center min-h-[220px]',
                      isDragging
                        ? 'border-accent bg-accent/5 shadow-[0_0_25px_rgba(var(--accent-rgb),0.1)] scale-[0.99]'
                        : 'border-white/10 bg-black/20 hover:border-accent hover:bg-accent/5'
                    ]"
                  >
                    <!-- Upload icon -->
                    <div
                      :class="[
                        'size-14 rounded-full flex items-center justify-center mb-4 transition-all duration-300',
                        isDragging ? 'bg-accent text-black scale-110 shadow-[0_0_15px_rgba(var(--accent-rgb),0.4)]' : 'bg-white/5 border border-white/10 text-white/40'
                      ]"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="size-6"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="17 8 12 3 7 8" />
                        <line x1="12" y1="3" x2="12" y2="15" />
                      </svg>
                    </div>

                    <p class="font-mono text-xs uppercase tracking-wider text-white/60 mb-2">
                      Glissez-déposez vos images ici
                    </p>
                    <p class="font-mono text-[9px] text-white/30 uppercase tracking-[2px] mb-4">
                      ou
                    </p>
                    <button
                      type="button"
                      class="px-4 py-2 font-mono text-[10px] bg-white text-black uppercase font-bold rounded-sm hover:bg-accent hover:shadow-[0_0_15px_rgba(var(--accent-rgb),0.3)] transition-all"
                    >
                      Parcourir les fichiers
                    </button>

                    <input
                      ref="fileInput"
                      type="file"
                      multiple
                      accept="image/*"
                      class="hidden"
                      @change="handleFileChange"
                    />
                  </div>

                  <!-- Direct URL Input -->
                  <div class="bg-black/20 p-4 rounded-xl border border-white/5 space-y-2">
                    <label class="block font-mono text-[9px] text-accent uppercase tracking-[2px] font-bold">
                      Ajouter via URL directe ou chemin d'asset local (ex: assets/amari_davis/amari1.webp)
                    </label>
                    <div class="flex gap-2">
                      <input
                        v-model="directUrlInput"
                        type="text"
                        placeholder="Collez une URL d'image ou un chemin et appuyez sur Entrée"
                        class="grow bg-black/40 border border-white/10 rounded px-3 py-2 font-mono text-xs text-white focus:outline-none focus:border-accent"
                        @keydown.enter.prevent="addDirectUrl"
                      />
                      <button
                        type="button"
                        @click="addDirectUrl"
                        class="px-4 bg-accent text-black font-mono text-[10px] uppercase font-bold rounded-sm hover:shadow-[0_0_15px_rgba(var(--accent-rgb),0.3)] transition-all cursor-pointer"
                      >
                        Ajouter
                      </button>
                    </div>
                  </div>

                  <!-- Gallery / Previews -->
                  <div v-if="formData.photos.length > 0" class="space-y-4">
                    <div class="flex justify-between items-center border-b border-white/5 pb-2">
                      <h4 class="font-display text-xs uppercase tracking-wider text-white/50 font-bold">
                        Images Sélectionnées ({{ formData.photos.length }} / 6)
                      </h4>
                      <span
                        v-if="formData.photos.length < 3"
                        class="font-mono text-[9px] text-[#e74c3c] uppercase tracking-wider animate-pulse font-bold"
                      >
                        ! Minimum 3 photos requises
                      </span>
                    </div>

                    <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      <div
                        v-for="(photo, index) in formData.photos"
                        :key="index"
                        class="relative group rounded-xl overflow-hidden aspect-video bg-black/40 border border-white/10"
                      >
                        <img
                          :src="photo"
                          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <!-- Overlay & Delete button -->
                        <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
                          <span class="font-mono text-[8px] text-white/40">#0{{ index + 1 }}</span>
                          <button
                            type="button"
                            @click="removePhoto(index)"
                            class="self-center bg-[#e74c3c] hover:bg-white hover:text-black text-white p-2 rounded-full hover:shadow-[0_0_15px_rgba(231,76,60,0.5)] transition-all"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              class="size-4"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="2.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            >
                              <polyline points="3 6 5 6 21 6" />
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                              <line x1="10" y1="11" x2="10" y2="17" />
                              <line x1="14" y1="11" x2="14" y2="17" />
                            </svg>
                          </button>
                          <div class="w-full"></div>
                        </div>
                      </div>
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

              <div class="flex items-center gap-4">
                <!-- Terminer directement (uniquement en mode édition et si ce n'est pas la dernière étape) -->
                <button
                  v-if="isEditMode && currentStep < totalSteps"
                  @click="saveDirectly"
                  :disabled="isSubmitting"
                  class="border border-white/20 hover:border-accent text-white font-mono text-[10px] tracking-[3px] uppercase font-bold px-6 py-3 rounded-lg hover:bg-accent/10 hover:shadow-[0_0_15px_rgba(var(--accent-rgb),0.2)] transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  title="Enregistrer les modifications et terminer directement"
                >
                  {{ isSubmitting ? 'Sauvegarde...' : 'Terminer' }} ⚡
                </button>

                <button
                  @click="nextStep"
                  :disabled="isSubmitting"
                  class="bg-white text-black font-mono text-[10px] tracking-[3px] uppercase font-bold px-8 py-3 rounded-lg hover:bg-accent hover:shadow-[0_0_20px_rgba(var(--accent-rgb),0.4)] transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {{ currentStep === totalSteps ? (isSubmitting ? 'Traitement...' : 'Terminer') : 'Suivant' }} →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
