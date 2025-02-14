// src/app/dashboard/_component/PostList.test.tsx

import { render, screen, waitFor } from '@testing-library/react'
import PostList from './PostList'
import useFetchPost from '@/hooks/useFetchPost'

// Mock useFetchPost 훅
jest.mock('@/hooks/useFetchPost')

describe('PostList', () => {
  it('로딩 중일 때 "게시물 로딩 중..."을 표시한다', () => {
    // Mocking useFetchPost 훅을 로딩 상태로 설정
    ;(useFetchPost as jest.Mock).mockReturnValue({
      data: [],
      isLoading: true,
      isError: false,
    })

    render(<PostList />)
    expect(screen.getByText(/게시물 로딩 중.../i)).toBeInTheDocument()
  })

  it('오류가 있을 때 "게시물을 불러오는 데 실패했습니다."를 표시한다', () => {
    // Mocking useFetchPost 훅을 오류 상태로 설정
    ;(useFetchPost as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
      isError: true,
    })

    render(<PostList />)
    expect(
      screen.getByText(/게시물을 불러오는 데 실패했습니다./i)
    ).toBeInTheDocument()
  })

  it('게시물이 정상적으로 로드되었을 때 제목과 내용을 표시한다', async () => {
    const mockPosts = [
      {
        id: 1,
        title: 'Test Post 1',
        body: 'This is the body of test post 1',
        userId: 1,
      },
      {
        id: 2,
        title: 'Test Post 2',
        body: 'This is the body of test post 2',
        userId: 2,
      },
    ]

    // Mocking useFetchPost 훅을 성공적으로 데이터를 반환하도록 설정
    ;(useFetchPost as jest.Mock).mockReturnValue({
      data: mockPosts,
      isLoading: false,
      isError: false,
    })

    render(<PostList />)

    // waitFor는 비동기적으로 화면에 나타나는 요소들을 기다립니다.
    await waitFor(() => {
      // 게시물 제목과 내용을 확인
      expect(screen.getByText('Test Post 1')).toBeInTheDocument()
      expect(
        screen.getByText('This is the body of test post 1')
      ).toBeInTheDocument()
      expect(screen.getByText('Test Post 2')).toBeInTheDocument()
      expect(
        screen.getByText('This is the body of test post 2')
      ).toBeInTheDocument()
    })
  })
})
