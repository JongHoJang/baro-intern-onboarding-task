'use client'

import { useEffect, useState } from 'react'
import useUserData from '@/hooks/useUserData'
import EditButton from '@/app/mypage/_component/EditButton'

const DashboardPage = () => {
  const { data: user, isLoading, isError } = useUserData()
  const [nickname, setNickname] = useState('')
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    if (user) {
      setNickname(user.user_metadata?.nickname || '')
    }
  }, [user])

  if (isLoading) return <p>로딩 중...</p>
  if (isError) return <p>유저 정보를 불러오는 데 실패했습니다.</p>

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-4 mt-10">마이페이지</h2>
      <h3 className="text-l">닉네임 변경이 가능합니다</h3>
      {user ? (
        <div className="mt-10">
          {isEditing ? (
            <EditButton
              user={user}
              nickname={nickname}
              setNickname={setNickname}
              setIsEditing={setIsEditing}
            />
          ) : (
            <div className="flex flex-col">
              <p className="text-lg font-semibold text-gray-800">
                {user.user_metadata?.nickname ? (
                  <span className="block border border-gray-300 rounded-md p-2 mt-2 w-72 text-center text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
                    {user.user_metadata?.nickname}
                  </span>
                ) : (
                  <span className="block border border-gray-300 rounded-md p-2 mt-2 w-72 text-center text-gray-500 italic focus:outline-none focus:ring-2 focus:ring-blue-400">
                    닉네임 없음
                  </span>
                )}
              </p>

              <button
                onClick={() => setIsEditing(true)}
                className="bg-gray-200 text-black px-2 py-1 rounded mt-4"
              >
                수정
              </button>
            </div>
          )}
        </div>
      ) : (
        <p>로그인이 필요합니다.</p>
      )}
    </div>
  )
}

export default DashboardPage
