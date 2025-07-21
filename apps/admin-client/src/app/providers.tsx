'use client'

import { useEffect } from 'react'
import { useAuthStore } from '@/store/useAuthStore'
import { ReactQueryProvider } from '@/providers/ReactQueryProvider'
import { useAuthGuard } from '@/hooks/useAuthGuard'

const Providers = ({ children }: { children: React.ReactNode }) => {
  const initAuth = useAuthStore((s) => s.initAuth)
  useAuthGuard()

  useEffect(() => {
    initAuth()
  }, [initAuth])

  return <ReactQueryProvider>{children}</ReactQueryProvider>
}

export default Providers
