'use client'

import { useRouter } from 'next/navigation'

const SignupLink = () => {
  const router = useRouter()

  return (
    <button
      onClick={() => router.push('/signup')}
      className="text-black px-4 py-2 underline"
    >
      회원가입하러가기
    </button>
  )
}

export default SignupLink
