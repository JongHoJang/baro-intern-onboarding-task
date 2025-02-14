'use client'

import { useRouter } from 'next/navigation'
import LoginForm from '@/app/login/_component/LoginForm'
import SignupLink from '@/app/login/_component/SignupLink'

const LoginPage = () => {
  const router = useRouter()

  const handleLoginSuccess = (accessToken: string) => {
    // 쿠키에 accessToken 저장
    document.cookie = `accessToken=${accessToken}; path=/; max-age=${60 * 60 * 24 * 7};`

    router.push('/dashboard')
  }

  return (
    <div className="flex flex-col gap-10 w-full py-28 justify-center items-center text-center">
      <h1 className="text-4xl font-bold">로그인</h1>
      <LoginForm onLoginSuccess={handleLoginSuccess} />
      <SignupLink />
    </div>
  )
}

export default LoginPage
