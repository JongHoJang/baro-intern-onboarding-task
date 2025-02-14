'use client'

import React from 'react'
import useUserData from '@/hooks/useUserData'

const NicknameArea = () => {
  const {
    data: user,
    isLoading: userLoading,
    isError: userError,
  } = useUserData()

  if (userLoading) return <p>유저리스트 로딩 중...</p>
  if (userError) return <p>유저 정보를 불러오는 데 실패했습니다.</p>
  return (
    <div className="mb-10">
      {user ? (
        <div className="flex mt-20 gap-2">
          <div className="font-bold">
            {user.user_metadata?.nickname || '닉네임 없음'} 님
          </div>
          <div>안녕하세요</div>
        </div>
      ) : (
        <p>로그인이 필요합니다.</p>
      )}
    </div>
  )
}

export default NicknameArea
