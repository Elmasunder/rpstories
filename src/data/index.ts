import type { Character, FamilyMember } from '@/types/character'

// 1. Chargement brut de tous les fichiers .ts
const modules = import.meta.glob('./characters/*.ts', { eager: true })
const rawCharacters: Record<string, Character> = {}

for (const path in modules) {
  const key = path.replace('./characters/', '').replace('.ts', '')
  const mod = modules[path] as { [key: string]: Character | undefined; default?: Character }
  // On récupère l'export nommé (ex: export const amari_davis) ou par défaut
  const charData = mod[key] || mod.default
  if (charData) {
    rawCharacters[key] = JSON.parse(JSON.stringify(charData))
  }
}

// 2. ORCHESTRATEUR : Logique de réciprocité des relations
Object.keys(rawCharacters).forEach((charId) => {
  const char = rawCharacters[charId]

  if (char.family) {
    char.family.forEach((member) => {
      // Si le membre a un ID et que cet ID correspond à un autre personnage du site
      if (member.id && rawCharacters[member.id]) {
        const otherChar = rawCharacters[member.id]

        // On initialise la liste de l'autre perso si elle n'existe pas
        if (!otherChar.family) otherChar.family = []

        // On vérifie si le perso actuel est déjà cité chez l'autre
        const alreadyLinked = otherChar.family.some((m) => m.id === charId)

        if (!alreadyLinked) {
          // Injection automatique du lien retour
          const reverseMember: FamilyMember = {
            id: charId,
            name: `${char.cover.firstName} ${char.cover.lastName}`,
            relation: `CONTACT IDENTIFIÉ`, // Libellé plus immersif et pro
            status: char.cover.status as FamilyMember['status'],
          }
          otherChar.family.push(reverseMember)
        }
      }
    })
  }
})

// 3. Exportation finale des données enrichies
export const characters = rawCharacters
