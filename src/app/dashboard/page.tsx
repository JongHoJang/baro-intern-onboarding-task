'use client'

import LogoutButton from '@/app/dashboard/_component/Lougout'
import PostList from '@/app/dashboard/_component/PostList'
import MypageButton from '@/app/dashboard/_component/MypageButton'
import NicknameArea from '@/app/dashboard/_component/NicknameArea'

export default function DashboardPage() {
  // const { user: storedUser } = useUserStore()
  // console.log('zustand 용', storedUser)

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4 mt-10">대시보드</h2>

      <div className="absolute top-20 right-4 flex gap-4 items-center">
        <div>
          <MypageButton />
        </div>
        <div>
          <LogoutButton />
        </div>
      </div>

      <NicknameArea />
      <PostList />
    </div>
  )
}
