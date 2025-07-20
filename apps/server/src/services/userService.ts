import { User } from '@/models/User'
import { DecodedIdToken } from 'firebase-admin/auth'

export const createUserIfNoneExists = async (user: DecodedIdToken) => {
  const { uid, email, name, picture, firebase } = user
  const provider = firebase?.sign_in_provider

  const existing = await User.findOne({ uid })
  if (existing) return existing

  const newUser = await User.create({
    uid,
    email,
    name,
    image: picture,
    provider,
    role: 'client',
  })

  return newUser
}
