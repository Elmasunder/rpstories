/**
 * PALETTE DE COULEURS DYNAMIQUES
 * Ces couleurs sont utilisées pour l'identité visuelle de chaque personnage vivant.
 */
export const charPalette = [
  '#833ddd', // 0: Violet Deep
  '#3b82f6', // 1: Bleu Royal
  '#10b981', // 2: Émeraude
  '#06b6d4', // 3: Cyan
  '#6366f1', // 4: Indigo
  '#14b8a6', // 5: Teal
  '#22c55e', // 6: Vert
  '#0ea5e9', // 7: Sky Blue
  '#9333ea', // 8: Purple
  '#2563eb', // 9: Navy Blue
  '#0891b2', // 10: Dark Cyan
  '#eab308', // 11: Jaune Vif (Opposé de 0)
  '#f97316', // 12: Orange (Opposé de 1)
  '#d946ef', // 13: Magenta (Opposé de 2)
  '#f59e0b', // 14: Ambre (Opposé de 3)
  '#ca8a04', // 15: Dark Yellow (Opposé de 4)
  '#7c3aed', // 16: Violet Electrique (Opposé de 5)
  '#d97706', // 17: Brown/Gold (Opposé de 6)
  '#ff8c00', // 18: Dark Orange (Opposé de 7)
  '#c026d3', // 19: Fuchsia (Opposé de 8)
  '#e11d48', // 20: Rose Intense (Opposé de 9)
  '#16a34a', // 21: Forest Green (Opposé de 10)
]

export function getCharColors(id: string, index: number = 0) {
  let hash = 0
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash)
  }

  // On utilise des multiplicateurs (nombres premiers) pour mieux disperser les couleurs
  const scatterHash = Math.abs(hash * 31)
  const idx1 = (scatterHash + index * 7) % charPalette.length
  
  // On force la deuxième couleur à être à l'opposé dans la palette pour un contraste max
  const idx2 = (idx1 + Math.floor(charPalette.length / 2)) % charPalette.length

  const hex1 = charPalette[idx1]
  const hex2 = charPalette[idx2]

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
