import type { Character, Chapter1, StoryChapter, Chapter4, Chapter6, FamilyMember } from '@/types/character'

export interface DbCharacter {
  id: number
  owner_id: string
  privacy: 'public' | 'followers' | 'private'
  first_name: string
  last_name: string
  alias: string | null
  status: 'alive' | 'dead'
  server_domain: string
  discord_url: string | null
  eyebrow: string
  ref: string
  photos: string[]
  age: number
  taille: string
  poids: string
  origines: string
  vehicule_ref: string
  chapter1: Chapter1
  chapter2: StoryChapter
  chapter3: StoryChapter
  chapter4: Chapter4 | null
  chapter5: StoryChapter | null
  chapter6: Chapter6
  family: FamilyMember[] | null
  footer: string
  created_at?: string
  updated_at?: string
}

/**
 * Convertit une ligne brute issue de la table `characters` de Supabase
 * en un objet `Character` complet, formaté pour l'interface utilisateur.
 * Reconstruit notamment l'objet `cover` et son tableau `meta`.
 */
export function mapDbCharacterToFrontend(dbChar: DbCharacter): Character {
  return {
    id: dbChar.id,
    pageTitle: `Dossier RP – ${dbChar.first_name} ${dbChar.last_name}`,
    owner_id: dbChar.owner_id,
    privacy: dbChar.privacy,
    cover: {
      status: dbChar.status,
      serverDomain: dbChar.server_domain,
      discordUrl: dbChar.discord_url || undefined,
      eyebrow: dbChar.eyebrow,
      firstName: dbChar.first_name,
      lastName: dbChar.last_name,
      alias: dbChar.alias || '',
      meta: [
        { key: 'Âge', value: `${dbChar.age} ans` },
        { key: 'Taille', value: dbChar.taille },
        { key: 'Poids', value: dbChar.poids },
        { key: 'Origines', value: dbChar.origines },
        { key: 'Véhicule de réf', value: dbChar.vehicule_ref },
      ],
      ref: dbChar.ref,
      photos: dbChar.photos || [],
    },
    chapter1: dbChar.chapter1,
    chapter2: dbChar.chapter2,
    chapter3: dbChar.chapter3,
    chapter4: dbChar.chapter4 || undefined,
    chapter5: dbChar.chapter5 || undefined,
    chapter6: dbChar.chapter6,
    family: dbChar.family || [],
    footer: dbChar.footer,
  }
}
