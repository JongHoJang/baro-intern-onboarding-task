'use client'

import { useRouter } from 'next/navigation'
import { supabase } from '@/utils/supabase/supabase'

export default function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    document.cookie = 'accessToken=; path=/; max-age=0;'

    router.push('/login')
    console.log('로그아웃')
  }

  return (
    <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-1">
      로그아웃
    </button>
  )
}
