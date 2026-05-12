/**
 * PALETTE DE COULEURS DYNAMIQUES
 * Ces couleurs sont utilisées pour l'identité visuelle de chaque personnage vivant.
 */
export const charPalette = [
  '#833ddd', // Violet Original
  '#3b82f6', // Bleu Électrique
  '#10b981', // Émeraude
  '#f59e0b', // Ambre
  '#ef4444', // Rouge Ardent
  '#06b6d4', // Cyan Profond
  '#8b5cf6', // Indigo
  '#ec4899', // Rose Fuchsia
  '#14b8a6', // Teal
  '#f97316', // Orange Brûlé
  '#6366f1', // Bleu Royal
  '#d946ef'  // Magenta
]

/**
 * GÉNÉRATEUR DE COULEURS DÉTERMINISTE
 * @param {string} id - L'identifiant unique du personnage
 * @returns {object} - Un objet contenant les couleurs d'accent en Hex et RGB
 */
export function getCharColors(id) {
  let hash = 0
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash)
  }

  // Sélection de la couleur primaire
  const idx1 = Math.abs(hash) % charPalette.length
  // Sélection de la couleur secondaire (différente de la première)
  const idx2 = Math.abs(hash * 31 + 7) % charPalette.length
  const finalIdx2 = idx1 === idx2 ? (idx2 + 1) % charPalette.length : idx2

  const hex1 = charPalette[idx1]
  const hex2 = charPalette[finalIdx2]

  // Fonction utilitaire pour convertir Hex en RGB "r, g, b"
  const hexToRgb = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    return `${r}, ${g}, ${b}`
  }

  return {
    accent: hex1,
    accent2: hex2,
    accentRgb: hexToRgb(hex1),
    accent2Rgb: hexToRgb(hex2)
  }
}
