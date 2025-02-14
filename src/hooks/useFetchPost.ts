import { useQuery } from '@tanstack/react-query'

const useFetchPosts = () => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts')
      if (!response.ok) {
        throw Error(`게시물을 불러올 수 없습니다.`)
      }
      return response.json()
    },
    staleTime: 1000 * 60 * 5, // 5분 캐싱 유지
    refetchOnWindowFocus: true, // 창에 포커시하는 경우 새로고침
  })
}

export default useFetchPosts
