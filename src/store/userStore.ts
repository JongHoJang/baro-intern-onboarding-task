import { create } from 'zustand/react'
import { User } from '@supabase/auth-js'

interface UserState {
  user: User | null
  setUser: (user: User) => void
}

export const useUserStore = create<UserState>(set => ({
  user: null,
  setUser: user => set({ user }), // 사용자 데이터를 설정하는 함수
}))
