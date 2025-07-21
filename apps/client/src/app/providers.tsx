'use client'

import { useEffect } from 'react'
import { useAuthStore } from '@/store/useAuthStore'
import { ReactQueryProvider } from '@/providers/ReactQueryProvider'

const Providers = ({ children }: { children: React.ReactNode }) => {
  const initAuth = useAuthStore((s) => s.initAuth)

  useEffect(() => {
    initAuth()
  }, [initAuth])

  return <ReactQueryProvider>{children}</ReactQueryProvider>
}

export default Providers
