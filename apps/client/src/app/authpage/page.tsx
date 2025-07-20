'use client'

import { useAuthStore } from '@/store/useAuthStore'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth'
import { auth, googleProvider } from '@/lib/firebase'

const AuthPage = () => {
  const user = useAuthStore((s) => s.user)
  console.log(user)
  return (
    <div className="flex flex-col items-center gap-2">
      <p className="text-xl">Auth page</p>
      {!user && <p>Not logged</p>}
      <div className="flex gap-2">
        <button onClick={() => signInWithPopup(auth, googleProvider)} className="btn">
          google
        </button>
      </div>
    </div>
  )
}

export default AuthPage
