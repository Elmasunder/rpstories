import type { Character } from '@/types/character'
import { amari_davis } from './characters/amari_davis'
import { elena_volkov } from './characters/elena_volkov'

// Importe de manière synchrone tous les fichiers .ts du dossier characters/
const modules = import.meta.glob('./characters/*.ts', { eager: true })

// On recrée l'objet "characters" que le Hub et les fiches attendent
export const characters: Record<string, Character> = {
  amari_davis,
  elena_volkov
}

for (const path in modules) {
  // Extrait l'ID du fichier (ex: "./characters/amari_davis.ts" -> "amari_davis")
  const key = path.replace('./characters/', '').replace('.ts', '')
  
  const mod = modules[path] as Record<string, Character>
  
  // Assigne le personnage à l'objet global
  if (mod[key]) {
    characters[key] = mod[key]
  }
}
