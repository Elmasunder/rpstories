import { reactive } from 'vue'
import { supabase } from '@/utils/supabase'
import type { User, Provider } from '@supabase/supabase-js'

export interface Profile {
  id: string
  username: string
  avatar_url: string | null
}

export const authState = reactive({
  user: null as User | null,
  profile: null as Profile | null,
  followingIds: [] as string[],
  loading: true,
  initialized: false,

  async initialize() {
    if (this.initialized) return
    this.loading = true

    // Get current session
    const { data: { session } } = await supabase.auth.getSession()
    this.user = session?.user ?? null
    if (this.user) {
      await this.fetchProfile(this.user.id)
      await this.fetchFollowing()
    }

    // Listen to changes
    supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth State Change Event:', event)
      const newUser = session?.user ?? null

      // Guard to prevent redundant fetches and infinite loops when window focus is regained
      if (newUser?.id !== this.user?.id) {
        this.user = newUser
        if (this.user) {
          await this.fetchProfile(this.user.id)
          await this.fetchFollowing()
        } else {
          this.profile = null
          this.followingIds = []
        }
      }
      this.loading = false
    })

    this.initialized = true
    this.loading = false
  },

  async fetchProfile(userId: string) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) {
        console.error('Error fetching profile:', error.message)
        // Fallback profile if table is empty or trigger is delayed
        this.profile = {
          id: userId,
          username: this.user?.user_metadata?.name || this.user?.email?.split('@')[0] || 'Utilisateur',
          avatar_url: this.user?.user_metadata?.avatar_url || null
        }
      } else {
        this.profile = data as Profile
      }
    } catch (e) {
      console.error('Profile fetch exception:', e)
    }
  },

  async fetchFollowing() {
    if (!this.user) return
    try {
      const { data, error } = await supabase
        .from('follows')
        .select('following_id')
        .eq('follower_id', this.user.id)

      if (!error && data) {
        this.followingIds = data.map((d: { following_id: string }) => d.following_id)
      }
    } catch (e) {
      console.error('Error fetching follows:', e)
    }
  },

  isFollowing(userId: string): boolean {
    return this.followingIds.includes(userId)
  },

  async followUser(userId: string) {
    if (!this.user) return
    try {
      const { error } = await supabase
        .from('follows')
        .insert({ follower_id: this.user.id, following_id: userId })

      if (!error) {
        this.followingIds.push(userId)
      } else {
        console.error('Error following user:', error.message)
      }
    } catch (e) {
      console.error('Follow user exception:', e)
    }
  },

  async unfollowUser(userId: string) {
    if (!this.user) return
    try {
      const { error } = await supabase
        .from('follows')
        .delete()
        .eq('follower_id', this.user.id)
        .eq('following_id', userId)

      if (!error) {
        this.followingIds = this.followingIds.filter(id => id !== userId)
      } else {
        console.error('Error unfollowing user:', error.message)
      }
    } catch (e) {
      console.error('Unfollow user exception:', e)
    }
  },

  async signInWithPassword(emailOrUsername: string, password: string) {
    let resolvedEmail = emailOrUsername.trim()

    // If it doesn't contain '@', resolve it as a username to its corresponding email
    if (!resolvedEmail.includes('@')) {
      const { data: emailFromUsername, error: rpcError } = await supabase.rpc('get_email_by_username', {
        p_username: resolvedEmail
      })

      if (rpcError || !emailFromUsername) {
        console.error('Error resolving username:', rpcError?.message || 'No email returned')
        throw new Error("Aucun utilisateur trouvé avec ce nom d'utilisateur.")
      }
      resolvedEmail = emailFromUsername
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: resolvedEmail,
      password
    })
    if (error) {
      console.error('Error logging in:', error.message)
      throw error
    }
    this.user = data.user
    if (this.user) {
      await this.fetchProfile(this.user.id)
      await this.fetchFollowing()
    }
  },

  async signUp(email: string, password: string, username: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: username
        }
      }
    })
    if (error) {
      console.error('Error signing up:', error.message)
      throw error
    }
    this.user = data.user
    if (this.user) {
      await this.fetchProfile(this.user.id)
      await this.fetchFollowing()
    }
  },

  async signInWithOAuth(provider: Provider) {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: window.location.origin + import.meta.env.BASE_URL
      }
    })
    if (error) {
      console.error(`Error logging in with ${provider}:`, error.message)
      throw error
    }
  },

  async signOut() {
    // Clear local state immediately so UI updates instantly and isn't blocked by a hanging network call
    this.user = null
    this.profile = null
    this.followingIds = []

    try {
      await supabase.auth.signOut()
    } catch (error) {
      console.error('Error logging out from Supabase auth session:', error)
    }
  }
})
