'use client'

import { auth, googleProvider } from '@/lib/firebase'
import { signInWithPopup, getIdToken } from 'firebase/auth'
import { useAuthStore } from '@/store/useAuthStore'
import { useState } from 'react'

export default function SignInPage() {
  const { setUser, loginWithGoogle, logout, login, loading, error } = useAuthStore()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleGoogleLogin = async () => {
    try {
      const user = await loginWithGoogle()

      console.log(user)
    } catch (err) {
      console.error('Login error:', err)
    }
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const user = await login(email, password)
    console.log(user)
  }

  return (
    <div>
      <button onClick={handleGoogleLogin} className="btn">
        Google
      </button>
      <div>
        <form onSubmit={onSubmit} className="max-w-sm mx-auto space-y-4">
          <h2 className="text-xl font-semibold text-center">Login / Signup</h2>

          <input
            type="email"
            placeholder="Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            className="w-full py-2 font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Continue'}
          </button>
        </form>
      </div>
    </div>
  )
}
