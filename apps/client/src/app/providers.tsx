'use client'

import { useEffect } from 'react'
import { useAuthStore } from '@/store/useAuthStore'

const Providers = ({ children }: { children: React.ReactNode }) => {
  const initAuth = useAuthStore((s) => s.initAuth)

  useEffect(() => {
    initAuth()
  }, [initAuth])

  return children
}

export default Providers
