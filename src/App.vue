<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import AmbientGlow from './components/AmbientGlow.vue'
import { uiState } from '@/store/ui'

onMounted(() => {
  // Capture les redirections de confirmation d'email Supabase ou autres flux
  const hash = window.location.hash
  const search = window.location.search

  // Recherche dans le hash (redirection Supabase classique) ou la search query
  const isEmailConfirmation = hash.includes('type=signup') || search.includes('type=signup')
  const isRecovery = hash.includes('type=recovery') || search.includes('type=recovery')
  const isError = hash.includes('error_description=') || search.includes('error_description=')

  if (isEmailConfirmation) {
    uiState.showToast(
      'Compte Activé',
      'Votre inscription a été validée avec succès. Bienvenue sur RP/STORIES !',
      'success'
    )
    // Nettoie le hash d'accès URL de l'adresse du navigateur sans recharger
    window.history.replaceState(null, '', window.location.pathname)
  } else if (isRecovery) {
    uiState.showToast(
      'Réinitialisation',
      'Votre accès de secours a été validé. Vous pouvez à présent configurer votre profil.',
      'info'
    )
    window.history.replaceState(null, '', window.location.pathname)
  } else if (isError) {
    const params = new URLSearchParams(hash.replace('#', '?') || search)
    const errorDesc = params.get('error_description') || 'Une erreur est survenue lors de la validation.'
    uiState.showToast(
      'Erreur de Validation',
      decodeURIComponent(errorDesc.replace(/\+/g, ' ')),
      'error'
    )
    window.history.replaceState(null, '', window.location.pathname)
  }
})
</script>

<template>
  <AmbientGlow />
  
  <RouterView v-slot="{ Component }">
    <transition name="fade-page" mode="out-in">
      <component :is="Component" />
    </transition>
  </RouterView>

  <!-- Global Toast Notification System -->
  <transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="opacity-0 translate-y-4 sm:translate-y-0 sm:translate-x-4"
    enter-to-class="opacity-100 translate-y-0 sm:translate-x-0"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="opacity-100 translate-y-0 sm:translate-x-0"
    leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:translate-x-4"
  >
    <div
      v-if="uiState.toast"
      class="fixed bottom-6 right-6 z-50 w-full max-w-sm bg-panel/90 backdrop-blur-xl border rounded-2xl p-4 shadow-2xl flex items-start gap-3.5 transition-all duration-300"
      :class="[
        uiState.toast.type === 'success' ? 'border-accent/40 shadow-accent/5' : '',
        uiState.toast.type === 'error' ? 'border-dead/40 shadow-dead/5' : '',
        uiState.toast.type === 'info' ? 'border-white/10' : '',
      ]"
    >
      <!-- Indicator icon / color dot -->
      <div
        class="size-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
        :class="[
          uiState.toast.type === 'success' ? 'bg-accent/10 text-accent' : '',
          uiState.toast.type === 'error' ? 'bg-dead/10 text-dead' : '',
          uiState.toast.type === 'info' ? 'bg-white/5 text-white/40' : '',
        ]"
      >
        <span class="font-mono text-[10px] font-bold">
          {{ uiState.toast.type === 'success' ? '✓' : uiState.toast.type === 'error' ? '!' : 'i' }}
        </span>
      </div>

      <!-- Text Content -->
      <div class="flex-1 min-w-0">
        <h4 class="font-mono text-[10px] font-bold uppercase tracking-wider text-white">
          // {{ uiState.toast.title }}
        </h4>
        <p class="font-sans text-xs text-white/70 mt-1 leading-relaxed">
          {{ uiState.toast.message }}
        </p>
      </div>

      <!-- Dismiss Button -->
      <button
        @click="uiState.dismissToast()"
        class="font-mono text-[9px] text-white/30 hover:text-white uppercase tracking-wider cursor-pointer shrink-0 mt-0.5"
      >
        [ X ]
      </button>
    </div>
  </transition>
</template>
