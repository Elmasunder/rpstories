<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { authState } from '@/store/auth'
import { getCharColors } from '@/utils/colors.ts'
import { uiState } from '@/store/ui.ts'
import type { Provider } from '@supabase/supabase-js'

const router = useRouter()
const route = useRoute()
const errorMsg = ref('')
const successMsg = ref('')
const isLoading = ref(false)

const isRegister = ref(false)
const email = ref('')
const password = ref('')
const username = ref('')

const loginColors = getCharColors('login-' + Date.now())

// Sync mode with route query ?mode=register
watch(
  () => route.query.mode,
  (newMode) => {
    isRegister.value = newMode === 'register'
  },
  { immediate: true },
)

// Redirect if already logged in, and set colors
onMounted(() => {
  document.title = 'RP/STORIES | Connexion'
  uiState.setColors(loginColors.accent, loginColors.accent2, loginColors.accentRgb)
  if (authState.user) {
    router.push({ name: 'hub' })
  }
})

const handleLogin = async (provider: 'discord' | 'google' | 'steam' | 'cfx') => {
  try {
    errorMsg.value = ''
    successMsg.value = ''
    isLoading.value = true

    if (provider === 'cfx') {
      await authState.signInWithOAuth('keycloak' as unknown as Provider)
    } else {
      await authState.signInWithOAuth(provider as unknown as Provider)
    }
  } catch (e) {
    const err = e as Error
    errorMsg.value = err.message || 'Une erreur est survenue lors de la connexion.'
    isLoading.value = false
  }
}

const handleSubmit = async () => {
  try {
    errorMsg.value = ''
    successMsg.value = ''
    isLoading.value = true

    if (isRegister.value) {
      if (!username.value.trim()) {
        throw new Error("Le nom d'utilisateur est requis.")
      }
      await authState.signUp(email.value, password.value, username.value)
      
      if (!authState.user) {
        successMsg.value = "Compte créé ! Veuillez vérifier vos e-mails pour confirmer votre inscription."
      } else {
        router.push({ name: 'hub' })
      }
    } else {
      await authState.signInWithPassword(email.value, password.value)
      router.push({ name: 'hub' })
    }
  } catch (e) {
    const err = e as Error
    errorMsg.value = err.message || 'Une erreur est survenue.'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-background text-white flex flex-col relative overflow-hidden">
    <!-- Background Effects & Trames (matching Hub design) -->
    <div class="absolute inset-0 pointer-events-none select-none z-0">
      <!-- Main Aura centered behind the login card -->
      <div
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-[600px] bg-radial-gradient from-accent/10 to-transparent blur-3xl opacity-50"
      ></div>

      <!-- Micro Dots Trame -->
      <div
        class="absolute inset-0 bg-dots-premium bg-size-[32px_32px] mask-[radial-gradient(ellipse_at_center,black,transparent_80%)] opacity-60"
      ></div>

      <!-- Large Tech Grid -->
      <div
        class="absolute inset-0 bg-grid-premium bg-size-[100px_100px] mask-[linear-gradient(to_bottom,black,transparent)] opacity-40"
      ></div>
    </div>

    <main class="flex-1 flex items-center justify-center p-6 relative z-10">
      <div class="w-full max-w-[420px] bg-panel backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl relative">
        <!-- Accent Glow -->
        <div class="absolute -top-10 -left-10 size-32 bg-accent/20 rounded-full blur-[60px] pointer-events-none"></div>
        <div class="absolute -bottom-10 -right-10 size-32 bg-accent2/20 rounded-full blur-[60px] pointer-events-none"></div>

        <!-- Header -->
        <div class="text-center mb-8">
          <div class="font-mono text-[9px] tracking-[6px] text-accent uppercase font-bold mb-2">
            {{ isRegister ? '// SYSTEM REGISTRATION' : '// AUTHORIZATION REQUIRED' }}
          </div>
          <h1 class="font-display text-3xl font-extrabold uppercase tracking-tight text-white mb-2">
            RP/STORIES
          </h1>
          <p class="font-mono text-[10px] text-white/40 uppercase tracking-wider">
            {{ isRegister ? 'Créez un compte pour commencer' : 'Accédez à votre hub & fiches' }}
          </p>
        </div>

        <!-- Error display -->
        <transition
          enter-active-class="transition duration-300 ease-out"
          enter-from-class="opacity-0 -translate-y-2"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition duration-200 ease-in"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 -translate-y-2"
        >
          <div v-if="errorMsg" class="mb-6 p-4 bg-dead/10 border border-dead/30 rounded-lg text-center">
            <span class="font-mono text-[10px] uppercase font-bold text-dead tracking-wider block mb-1">
              ⚠ Erreur de Connexion
            </span>
            <span class="font-mono text-[10px] text-white/70 block leading-relaxed">
              {{ errorMsg }}
            </span>
          </div>
        </transition>

        <!-- Success display -->
        <transition
          enter-active-class="transition duration-300 ease-out"
          enter-from-class="opacity-0 -translate-y-2"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition duration-200 ease-in"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 -translate-y-2"
        >
          <div v-if="successMsg" class="mb-6 p-4 bg-accent/10 border border-accent/30 rounded-lg text-center">
            <span class="font-mono text-[10px] uppercase font-bold text-accent tracking-wider block mb-1">
              ✓ Succès
            </span>
            <span class="font-mono text-[10px] text-white/70 block leading-relaxed">
              {{ successMsg }}
            </span>
          </div>
        </transition>

        <!-- Credentials Form -->
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <!-- Username (Register only) -->
          <div v-if="isRegister">
            <label class="font-mono text-[9px] text-white/40 uppercase tracking-[2px] block mb-1.5">
              // Nom d'utilisateur
            </label>
            <input
              v-model="username"
              type="text"
              required
              placeholder="Ex: JohnDoe"
              class="w-full bg-white/5 border border-white/10 focus:border-accent focus:bg-white/10 rounded-xl px-4 py-3 text-xs font-mono tracking-wide placeholder-white/20 transition-all outline-none text-white"
            />
          </div>

          <!-- Email -->
          <div>
            <label class="font-mono text-[9px] text-white/40 uppercase tracking-[2px] block mb-1.5">
              // E-mail
            </label>
            <input
              v-model="email"
              type="email"
              required
              placeholder="email@example.com"
              class="w-full bg-white/5 border border-white/10 focus:border-accent focus:bg-white/10 rounded-xl px-4 py-3 text-xs font-mono tracking-wide placeholder-white/20 transition-all outline-none text-white"
            />
          </div>

          <!-- Password -->
          <div>
            <label class="font-mono text-[9px] text-white/40 uppercase tracking-[2px] block mb-1.5">
              // Mot de passe
            </label>
            <input
              v-model="password"
              type="password"
              required
              placeholder="••••••••"
              class="w-full bg-white/5 border border-white/10 focus:border-accent focus:bg-white/10 rounded-xl px-4 py-3 text-xs font-mono tracking-wide placeholder-white/20 transition-all outline-none text-white"
            />
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="isLoading"
            class="w-full font-mono text-[10px] bg-white text-black py-3.5 rounded-xl font-bold uppercase tracking-[2px] border border-transparent hover:shadow-[0_0_20px_var(--accent)] hover:opacity-90 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
          >
            <span v-if="isLoading" class="size-3.5 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
            {{ isRegister ? "Créer un compte" : "Se connecter" }}
          </button>
        </form>

        <!-- Toggle Form Mode Link -->
        <div class="text-center mt-4">
          <button
            type="button"
            @click="isRegister = !isRegister; errorMsg = ''; successMsg = ''"
            class="font-mono text-[9px] text-white/40 hover:text-accent uppercase tracking-wider transition-colors cursor-pointer"
          >
            {{ isRegister ? "Déjà membre ? Se connecter" : "Nouveau ? Créer un compte" }}
          </button>
        </div>

        <!-- OR Divider -->
        <div class="flex items-center gap-4 my-6">
          <div class="h-px bg-white/5 flex-1"></div>
          <span class="font-mono text-[8px] text-white/20 uppercase tracking-[2px]">OU CONNEXION VIA</span>
          <div class="h-px bg-white/5 flex-1"></div>
        </div>

        <!-- Login Buttons Grid (2x2) -->
        <div class="grid grid-cols-2 gap-3">
          <!-- Discord -->
          <button
            @click="handleLogin('discord')"
            :disabled="isLoading"
            class="flex items-center justify-center gap-2 bg-[#5865F2]/10 hover:bg-[#5865F2]/20 border border-[#5865F2]/30 rounded-xl py-2.5 transition-all duration-300 hover:scale-[1.02] cursor-pointer group"
          >
            <svg class="size-4 text-[#5865F2]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.873-.894.077.077 0 0 1-.008-.128c.126-.093.252-.19.372-.287a.075.075 0 0 1 .077-.011c3.92 1.793 8.18 1.793 12.061 0a.073.073 0 0 1 .078.009c.12.099.246.195.373.289a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.156 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.156 2.418z"/>
            </svg>
            <span class="font-mono text-[9px] font-bold uppercase tracking-widest text-[#5865F2] group-hover:text-white transition-colors">
              Discord
            </span>
          </button>

          <!-- Google -->
          <button
            @click="handleLogin('google')"
            :disabled="isLoading"
            class="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl py-2.5 transition-all duration-300 hover:scale-[1.02] cursor-pointer group"
          >
            <svg class="size-4" viewBox="0 0 24 24">
              <path fill="#EA4335" d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114A5.99 5.99 0 0 1 8 12.527a5.99 5.99 0 0 1 5.99-5.99c1.654 0 3.13.67 4.2 1.748L21.2 5.27A9.957 9.957 0 0 0 13.99 2 9.99 9.99 0 0 0 4 12a9.99 9.99 0 0 0 9.99 10c5.52 0 9.99-4.47 9.99-10 0-.585-.05-1.154-.15-1.715H12.24z"/>
            </svg>
            <span class="font-mono text-[9px] font-bold uppercase tracking-widest text-white/70 group-hover:text-white transition-colors">
              Google
            </span>
          </button>

          <!-- Steam -->
          <button
            @click="handleLogin('steam')"
            :disabled="isLoading"
            class="flex items-center justify-center gap-2 bg-black/40 hover:bg-black/60 border border-white/5 rounded-xl py-2.5 transition-all duration-300 hover:scale-[1.02] cursor-pointer group"
          >
            <svg class="size-4 text-white/70 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 .007c-5.836 0-10.707 4.16-11.793 9.68l5.597 2.317a3.834 3.834 0 0 1 1.724-1.112l2.67-3.856a3.878 3.878 0 0 1 7.234-2.073 3.877 3.877 0 0 1-5.11 5.674l-3.826 2.7a3.8 3.8 0 0 1-1.077 1.637l2.254 5.452c5.385-.506 9.544-5.074 9.544-10.63 0-5.96-4.834-10.8-10.8-10.8zM6.9 14.156l-5.46-2.26C.578 12.8.2 13.9.2 15.02c0 2.87 1.83 5.3 4.39 6.22l2.228-5.38a3.836 3.836 0 0 1-.918-1.704z"/>
            </svg>
            <span class="font-mono text-[9px] font-bold uppercase tracking-widest text-white/70 group-hover:text-white transition-colors">
              Steam
            </span>
          </button>

          <!-- Cfx.re -->
          <button
            @click="handleLogin('cfx')"
            :disabled="isLoading"
            class="flex items-center justify-center gap-2 bg-accent/10 hover:bg-accent/20 border border-accent/30 rounded-xl py-2.5 transition-all duration-300 hover:scale-[1.02] cursor-pointer group"
          >
            <svg class="size-4 text-accent" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <polygon points="5 3 19 12 5 21 5 3"/>
            </svg>
            <span class="font-mono text-[9px] font-bold uppercase tracking-widest text-accent group-hover:text-white transition-colors">
              Cfx.re
            </span>
          </button>
        </div>

        <!-- Footer terms / info -->
        <div class="mt-8 text-center border-t border-white/5 pt-6">
          <p class="font-mono text-[8px] text-white/20 leading-relaxed uppercase">
            En vous connectant, vous acceptez la liaison automatique de votre identifiant unique à votre dossier de personnage.
          </p>
        </div>
      </div>
    </main>
  </div>
</template>
