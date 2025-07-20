import { initializeApp, cert, getApps, App } from 'firebase-admin/app'
import { getAuth, Auth } from 'firebase-admin/auth'

let adminApp: App | null = null
let adminAuth: Auth | null = null

export function initializeFirebaseAdmin() {
  const projectId = process.env.FIREBASE_PROJECT_ID
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')

  if (!projectId || !clientEmail || !privateKey) {
    console.error('Missing Firebase Admin environment variables:')
    console.error({ projectId, clientEmail, privateKey: privateKey ? '***' : undefined })
    throw new Error('Firebase Admin credentials not set')
  }

  if (!getApps().length) {
    adminApp = initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID!,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
        privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
      }),
    })
    adminAuth = getAuth(adminApp)
    console.log('Firebase admin initialized')
  }
  return adminAuth
}

export function getAdminAuth(): Auth {
  if (!adminAuth) {
    throw new Error('Firebase admin not initialized yet. Call initializeFirebaseAdmin() first.')
  }
  return adminAuth
}
