'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

export default function NavigateToProtectedPage() {
  const router = useRouter()

  const handleNavigation = () => {
    document.cookie = 'softNavigationToken=true; path=/; max-age=60' // Token expires in 60 seconds
    router.push('/protected-page')
  }

  return (
    <Button onClick={handleNavigation}>
      Navigate to Protected Page
    </Button>
  )
}

