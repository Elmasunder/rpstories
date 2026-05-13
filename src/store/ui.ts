import { reactive } from 'vue'

/**
 * GESTION DE L'ÉTAT UI GLOBAL
 * Centralise les états partagés comme la couleur d'accentuation active
 * pour les effets atmosphériques (Ambient Glow).
 */
export const uiState = reactive({
  // Gris neutre par défaut (correspond à main.css)
  activeAccentRgb: '120, 120, 120',

  /**
   * Définit une nouvelle couleur d'accentuation
   * @param {string} rgbStr - Format "r, g, b"
   */
  setAccent(rgbStr: string) {
    this.activeAccentRgb = rgbStr
  },

  /**
   * Réinitialise la couleur à son état neutre
   */
  resetAccent() {
    this.activeAccentRgb = '120, 120, 120'
  },
})
