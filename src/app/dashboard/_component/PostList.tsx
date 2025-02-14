'use client'

import React from 'react'
import useFetchPost from '@/hooks/useFetchPost'

interface Post {
  id: number
  title: string
  body: string
  userId: number
}

const PostList = () => {
  const {
    data: posts,
    isLoading: postLoading,
    isError: postError,
  } = useFetchPost()

  if (postLoading) return <p>게시물 로딩 중...</p>
  if (postError) return <p>게시물을 불러오는 데 실패했습니다.</p>

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post: Post) => (
        <div
          key={post.id}
          className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          <div className="flex flex-col">
            <div className="text-2xl font-semibold text-gray-800">
              {post.title}
            </div>
            <div className="text-sm text-gray-600 mt-2">{post.body}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default PostList
