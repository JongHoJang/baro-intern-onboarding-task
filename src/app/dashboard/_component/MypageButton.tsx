'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

const MypageButton = () => {
  const router = useRouter()

  return (
    <div>
      <button onClick={() => router.push('/mypage')} className="underline">
        마이페이지 바로가기
      </button>
    </div>
  )
}

export default MypageButton
