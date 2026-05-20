import { z } from 'zod'

/**
 * RÈGLES DE VALIDATION RPSTORIES (STANDARD v2.1)
 * Ce schéma sert de "contrat" pour toutes les fiches personnages.
 */

// 1. Statuts autorisés
const StatusSchema = z.enum(['alive', 'dead'])

// 2. Éléments de base (Metadata, Items)
const MetaItemSchema = z.object({
  key: z.string().min(1, 'La clé est obligatoire'),
  value: z.string().min(1, 'La valeur est obligatoire'),
})

const PhotoDataSchema = z.object({
  url: z.string().regex(/\.webp$/, "L'image doit être au format .webp"),
  alt: z.string().min(3),
  caption: z.string().startsWith('//', 'La légende doit commencer par //'),
})

// 3. Section COVER (Entête)
const CharacterCoverSchema = z.object({
  status: StatusSchema,
  serverDomain: z.string().includes('.'),
  discordUrl: z.string().url().optional(),
  eyebrow: z
    .string()
    .startsWith('// DOSSIER RP', "Le format de l'eyebrow doit être : // DOSSIER RP #..."),
  firstName: z
    .string()
    .min(2)
    .transform((s: string) => s.toUpperCase()),
  lastName: z
    .string()
    .min(2)
    .transform((s: string) => s.toUpperCase()),
  alias: z.string().min(1),
  meta: z.array(MetaItemSchema).length(5, 'Il faut exactement 5 champs méta (Âge, Taille, etc.)'),
  ref: z.string().includes('DOSSIER REF:'),
  photos: z.array(z.string()).min(3).max(6, 'Il faut entre 3 et 6 photos'),
})

// 4. Chapitre I : IDENTITÉ
const IdentityPanelItemSchema = z.object({
  key: z.string(),
  value: z.string(),
  class: z.string().optional(),
})

const Chapter1Schema = z.object({
  label: z.string(),
  titleLines: z.array(z.string()).length(2),
  identityPanels: z.array(z.array(IdentityPanelItemSchema)).length(2), // 2 colonnes
  profile: z.object({
    qualités: z.array(z.string()).min(2),
    défauts: z.array(z.string()).min(2),
  }),
  infoPlus: z
    .object({
      icon: z.string(),
      title: z.string(),
      text: z.string(),
    })
    .optional(),
})

// 5. Structure d'un chapitre narratif (Histoire)
const StoryChapterSchema = z.object({
  label: z.string(),
  titleLines: z.array(z.string()),
  photo: PhotoDataSchema.optional(),
  story1: z.array(z.string()).min(1),
  story2: z.array(z.string()).optional(),
  quote: z.string().optional(),
  callout: z.string().optional(),
})

// 6. Chapitre IV : APTITUDES
const SkillItemSchema = z.object({
  name: z.string(),
  percent: z.number().min(0).max(100),
})

const Chapter4Schema = z.object({
  label: z.string(),
  titleLines: z.array(z.string()),
  photo: PhotoDataSchema.optional(),
  story1: z.array(z.string()).min(1, 'La description des aptitudes est obligatoire'),
  skillsGroups: z
    .array(
      z.object({
        title: z.string(),
        skills: z.array(SkillItemSchema).min(4),
      }),
    )
    .length(2, "Il faut un groupe d'aptitudes sociales et un groupe technique"),
  callout: z.string(),
})

// 7. Chapitre VI : LE FUTUR
const Chapter6Schema = z.object({
  label: z.string(),
  titleLines: z.array(z.string()),
  objectives: z.object({
    shortTerm: z.array(z.string()).min(3),
    mediumTerm: z.array(z.string()).min(3),
    longTerm: z.array(z.string()).min(3),
  }),
  finaleStory: z.array(z.string()).min(1),
  finaleQuote: z.string(),
})

// 8. SCHEMA GLOBAL : CHARACTER
export const CharacterSchema = z.object({
  id: z.number(),
  owner_id: z.string().optional(),
  privacy: z.enum(['public', 'followers', 'private']).optional(),
  pageTitle: z.string(),
  cover: CharacterCoverSchema,
  chapter1: Chapter1Schema,
  chapter2: StoryChapterSchema,
  chapter3: StoryChapterSchema,
  chapter4: Chapter4Schema.optional(),
  chapter5: StoryChapterSchema.optional(),
  chapter6: Chapter6Schema,
  family: z
    .array(
      z.object({
        id: z.union([z.string(), z.number()]).optional(),
        name: z.string(),
        relation: z.string(),
        status: StatusSchema,
      }),
    )
    .optional(),
  footer: z.string(),
})

export type CharacterValidated = z.infer<typeof CharacterSchema>
