<script setup lang="ts">
/**
 * FRIEND LIST BTN — Composant Placeholder Desktop
 * État par défaut : cercle avec icône portrait.
 * Au hover : s'étire en pilule → "FRIEND LIST" + "// soon" au-dessus.
 *
 * Sur mobile : masqué — sera accessible via le menu hamburger.
 *
 * @todo Implémenter la logique d'ouverture de la friend list
 * @todo Connecter au store utilisateur pour le compteur réel
 */

const friendCount = 0
</script>

<template>
  <!-- Wrapper fixed — Desktop uniquement -->
  <div class="hidden sm:block fixed bottom-8 right-6 z-40 group opacity-20 hover:opacity-100 transition-opacity duration-300">

    <!-- Badge SOON — Flotte au-dessus au hover -->
    <div
      class="
        absolute -top-7 left-1/2 -translate-x-1/2
        opacity-0 group-hover:opacity-100
        translate-y-1 group-hover:translate-y-0
        transition-all duration-200 ease-out delay-150
        pointer-events-none whitespace-nowrap
      "
    >
      <span class="font-mono text-[8px] tracking-[3px] uppercase text-white/25">
        // soon
      </span>
    </div>

    <!--
      Bouton — cercle (w-12) → pilule (w-44) au hover.
      justify-start + pl-3 : l'icône (24px) dans 48px donne ~12px de marge
      de chaque côté — visuellement centré dans le cercle.
    -->
    <button
      class="
        relative flex items-center justify-start
        h-12 w-12 group-hover:w-44
        pl-3
        overflow-hidden rounded-full
        bg-[#050505]/90 backdrop-blur-2xl
        border border-white/5 group-hover:border-white/10
        text-white/35 group-hover:text-white/60
        shadow-2xl
        transition-all duration-300 ease-out
        active:scale-95 cursor-not-allowed
      "
      disabled
      title="Friend List — Bientôt disponible"
    >
      <!-- Icône Portrait — toujours visible, position fixe -->
      <div class="size-6 flex-none flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="size-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="12" cy="8" r="3.5" />
          <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
        </svg>
      </div>

      <!-- Séparateur + Label — révélés au hover avec fade décalé -->
      <div
        class="
          flex items-center gap-3 pl-3
          opacity-0 group-hover:opacity-100
          transition-opacity duration-200 delay-100
          whitespace-nowrap flex-none
        "
      >
        <div class="w-px h-4 bg-white/10 flex-shrink-0"></div>
        <span class="font-mono text-[9px] tracking-[3px] uppercase font-bold">
          Friend List
        </span>
      </div>
    </button>

  </div>
</template>
