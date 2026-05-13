/**
 * PALETTE DE COULEURS DYNAMIQUES
 * Ces couleurs sont utilisées pour l'identité visuelle de chaque personnage vivant.
 */
export const charPalette = [
  '#833ddd', // Violet
  '#3b82f6', // Bleu
  '#10b981', // Émeraude
  '#f59e0b', // Ambre
  '#06b6d4', // Cyan
  '#ec4899', // Rose
  '#f97316', // Orange
  '#6366f1', // Indigo
  '#14b8a6', // Teal
  '#d946ef', // Magenta
  '#22c55e', // Vert
  '#ef4444', // Rouge
  '#eab308', // Jaune
]

export function getCharColors(id: string) {
  let hash = 0
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash)
  }

  const idx1 = Math.abs(hash) % charPalette.length
  // On utilise un décalage plus important pour la couleur secondaire
  const idx2 = Math.abs(hash >> 3) % charPalette.length
  const finalIdx2 = idx1 === idx2 ? (idx2 + 2) % charPalette.length : idx2

  const hex1 = charPalette[idx1]
  const hex2 = charPalette[finalIdx2]

  const hexToRgb = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    return `${r}, ${g}, ${b}`
  }

  return {
    accent: hex1,
    accent2: hex2,
    accentRgb: hexToRgb(hex1),
    accent2Rgb: hexToRgb(hex2),
  }
}
