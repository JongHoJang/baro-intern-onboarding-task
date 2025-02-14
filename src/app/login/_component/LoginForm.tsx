'use client'

import { useState } from 'react'
import { supabase } from '@/utils/supabase/supabase'

interface LoginFormProps {
  onLoginSuccess: (accessToken: string) => void
}

const LoginForm = ({ onLoginSuccess }: LoginFormProps) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      console.error('로그인 실패:', error.message)
      return
    }

    console.log('로그인 성공:', data.user)
    const accessToken = data.session?.access_token

    if (accessToken) {
      onLoginSuccess(accessToken)
    } else {
      console.error('토큰을 찾을 수 없습니다.')
    }
  }

  return (
    <form
      className="flex flex-col p-2 bg-white rounded-xl w-[300px]"
      onSubmit={handleLogin}
    >
      <div className="flex flex-col mb-2">
        <label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="block border border-gray-300 rounded-md p-2 mt-2 w-72 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="이메일을 입력하세요"
          />
        </label>
      </div>
      <div className="flex flex-col mb-2">
        <label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="block border border-gray-300 rounded-md p-2 mt-2 w-72 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="비밀번호를 입력하세요"
          />
        </label>
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white p-3 pl-5 rounded-xl mt-5"
      >
        로그인
      </button>
    </form>
  )
}

export default LoginForm
