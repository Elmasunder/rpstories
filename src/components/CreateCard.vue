<script setup lang="ts">
// Ce composant sert de point d'entrée pour la création d'un nouveau personnage
</script>

<template>
  <button
    class="group relative flex flex-col transition-all duration-500 hover:-translate-y-2 text-left h-full"
    @click="$emit('create')"
  >
    <div
      class="flex flex-col h-full bg-panel border-2 border-dashed border-white/10 rounded-lg overflow-hidden transition-all duration-500 hover:border-accent hover:bg-accent/5 hover:shadow-[0_20px_50px_rgba(0,0,0,0.3),0_0_20px_rgba(var(--accent-rgb),0.2)]"
    >
      <!-- Image Placeholder Area -->
      <div class="relative h-64 flex items-center justify-center bg-black/20 overflow-hidden">
        <!-- Background Patterns -->
        <div class="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity">
          <div class="absolute inset-0 bg-dots-premium bg-[size:16px_16px]"></div>
          <div class="absolute inset-0 bg-grid-premium bg-[size:40px_40px]"></div>
        </div>

        <!-- Add Icon -->
        <div class="relative z-10 flex flex-col items-center gap-4">
          <div
            class="size-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/30 group-hover:bg-accent group-hover:text-black group-hover:border-accent group-hover:scale-110 transition-all duration-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="size-8"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </div>
          <span
            class="font-mono text-[10px] tracking-[4px] uppercase text-white/30 group-hover:text-accent group-hover:tracking-[6px] transition-all duration-500 font-bold"
          >
            New Identity
          </span>
        </div>

        <!-- Floating Textures -->
        <div
          class="absolute -bottom-10 -right-10 size-40 bg-accent/5 blur-3xl group-hover:bg-accent/20 transition-all duration-700"
        ></div>
      </div>

      <!-- Content Area -->
      <div class="p-6 relative z-20 flex flex-col flex-grow">
        <div class="font-mono text-[9px] text-accent/50 tracking-[3px] uppercase mb-1 opacity-70">
          Add story
        </div>
        <h3
          class="font-display font-black text-2xl text-white/50 uppercase leading-[1.1] mb-4 group-hover:text-white transition-colors tracking-tighter h-14 line-clamp-2"
        >
          Créer un <span class="text-accent/50 group-hover:text-accent">Personnage</span>
        </h3>

        <p class="font-mono text-[11px] text-muted/50 leading-relaxed line-clamp-2 mb-6 h-8 group-hover:text-muted transition-colors">
          Initialisez une nouvelle archive dans la base de données. Définissez votre identité, votre passé et vos capacités.
        </p>

        <div class="mt-auto flex justify-between items-center pt-4 border-t border-white/5">
          <span class="font-mono text-[10px] text-accent/50 group-hover:text-accent font-bold uppercase tracking-widest transition-colors">
            Lancer le protocole
          </span>
          <span
            class="size-6 flex-none flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/30 group-hover:bg-accent group-hover:text-black group-hover:border-accent transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="size-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </span>
        </div>
      </div>
    </div>
  </button>
</template>

