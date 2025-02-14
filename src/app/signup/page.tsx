'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/utils/supabase/supabase'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nickname, setNickname] = useState('')
  const router = useRouter()

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Supabase 회원가입 API 호출
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { nickname },
      },
    })

    if (error) {
      console.error('회원가입 실패:', error.message)
      return
    }

    console.log('회원가입 성공:', data.user)

    // 회원가입 후 자동 로그인 여부 설정
    if (data.session) {
      console.log('자동 로그인 성공:', data.session)
      router.push('/dashboard')
    } else {
      console.log('회원가입 성공, 로그인 필요')
      router.push('/login')
    }
  }

  return (
    <div className="flex flex-col gap-10 w-full py-28 justify-center items-center text-center">
      <h1 className="text-4xl font-bold">회원가입</h1>

      <form
        onSubmit={handleSignup}
        className="flex flex-col p-2 bg-white rounded-xl w-[300px]"
      >
        <input
          type="email"
          placeholder="이메일"
          className="block border border-gray-300 rounded-md p-2 mt-2 w-72 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="비밀번호"
          className="block border border-gray-300 rounded-md p-2 mt-2 w-72 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="이름"
          className="block border border-gray-300 rounded-md p-2 mt-2 w-72 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={nickname}
          onChange={e => setNickname(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-3 pl-5 rounded-xl mt-5"
        >
          회원가입
        </button>
      </form>
    </div>
  )
}
