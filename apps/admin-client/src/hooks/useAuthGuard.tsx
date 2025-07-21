import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/useAuthStore'

export const useAuthGuard = () => {
  const router = useRouter()
  const { user, loading } = useAuthStore()
  const path = usePathname()
  console.log(path)
  useEffect(() => {
    if (!loading && !user && path !== '/login') {
      router.push('/login') // or wherever your login page is
    }
  }, [user, loading, router, path])

  return { user, loading }
}
