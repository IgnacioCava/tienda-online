import { create } from 'zustand'
import { auth } from '@/lib/firebase'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  User,
  onAuthStateChanged,
  getIdToken,
  GoogleAuthProvider,
  signInWithPopup,
  fetchSignInMethodsForEmail,
} from 'firebase/auth'
import api from '@/lib/axios'

type AuthState = {
  user: User | null
  loading: boolean
  error: null
  idToken: string | null
  setUser: (user: User) => void
  signup: (email: string, password: string) => Promise<void>
  login: (email: string, password: string) => Promise<void>
  loginWithGoogle: () => Promise<string>
  logout: () => Promise<void>
  initAuth: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  error: null,
  idToken: null,

  setUser: (user) => set({ user }),

  signup: async (email, password) => {
    const credentials = await createUserWithEmailAndPassword(auth, email, password)
    const user = credentials.user
    const idToken = await getIdToken(user)

    const { data } = await api.post('/auth/signup', {
      uid: user.uid,
      email: user.email,
      name: user.displayName,
    })

    set({ user: data.user, idToken, loading: false })

    return data
  },

  login: async (email, password) => {
    try {
      set({ loading: true, error: null })
      const methods = await fetchSignInMethodsForEmail(auth, email)
      console.log(methods)
      if (methods.length > 0) {
        // Si el mail ya existe, logueamos
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        const user = userCredential.user
        const idToken = await user.getIdToken()

        const { data } = await api.post('/auth/signin')

        set({ user: data.user, idToken, loading: false })

        return data.user
      } else {
        // Sino, creamos una cuenta
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        const user = userCredential.user
        const idToken = await user.getIdToken()

        const { data } = await api.post('/auth/signup-credentials')
        set({ user: data.user, idToken, loading: false })

        return data
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error)
      //if(error.code === 'auth/user-not-found')
      set({
        error: error.response?.data?.message || error.message || 'Login failed',
        loading: false,
      })
      throw error
    }
  },

  loginWithGoogle: async () => {
    set({ loading: true, error: null })

    try {
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      const idToken = await getIdToken(result.user)

      const { data } = await api.post('/auth/signin')

      set({ user: data.user, idToken, loading: false })
      return data.user
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      set({
        error: error.response?.data?.message || error.message || 'Login failed',
        loading: false,
      })
      throw error
    }
  },

  logout: async () => {
    await signOut(auth)
    set({ user: null, idToken: null })
  },

  initAuth: () => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const idToken = await getIdToken(user)
        set({ user, idToken, loading: false })
      } else {
        set({ user: null, idToken: null, loading: false })
      }
    })
  },
}))
