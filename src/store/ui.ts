import { reactive } from 'vue'

/**
 * GESTION DE L'ÉTAT UI GLOBAL
 * Centralise les couleurs d'accentuation et les injecte directement dans le DOM
 * pour une réactivité totale avec Tailwind v4.
 */
export const uiState = reactive({
  // Valeurs par défaut (Neutre/Violet)
  activeAccentRgb: '131, 61, 221',
  activeAccentHex: '#833ddd',
  activeAccent2Hex: '#e48328',

  // Toast global notifications
  toast: null as { type: 'success' | 'error' | 'info'; title: string; message: string } | null,

  /**
   * Met à jour les couleurs globales du site
   */
  setColors(hex: string, hex2: string, rgb: string) {
    this.activeAccentHex = hex
    this.activeAccent2Hex = hex2
    this.activeAccentRgb = rgb

    // Injection directe dans le DOM pour forcer la priorité CSS
    const root = document.documentElement
    root.style.setProperty('--accent', hex)
    root.style.setProperty('--accent2', hex2)
    root.style.setProperty('--accent-rgb', rgb)
  },

  /**
   * Réinitialise les couleurs à l'état par défaut (Violet/Orange)
   */
  resetColors() {
    this.setColors('#833ddd', '#e48328', '131, 61, 221')
  },

  /**
   * Déclenche un toast de notification
   */
  showToast(title: string, message: string, type: 'success' | 'error' | 'info' = 'info') {
    this.toast = { type, title, message }
    setTimeout(() => {
      if (this.toast && this.toast.message === message) {
        this.toast = null
      }
    }, 6000)
  },

  /**
   * Masque manuellement le toast
   */
  dismissToast() {
    this.toast = null
  },
})
