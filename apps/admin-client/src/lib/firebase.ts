import { FirebaseOptions, getApps, initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
}

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
export const storage = getStorage(app)

export const loginAndGetToken = async () => {
  const email = process.env.NEXT_PUBLIC_TEST_EMAIL
  const password = process.env.NEXT_PUBLIC_TEST_PASSWORD
  if (!email || !password) throw 'No email or password set'
  const userCredential = await signInWithEmailAndPassword(auth, email, password)
  const token = await userCredential.user.getIdToken()
  return token
}
