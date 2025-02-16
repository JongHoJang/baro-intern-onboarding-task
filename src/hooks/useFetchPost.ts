import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const useFetchPosts = () => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const { data } = await axios.get(
        'https://jsonplaceholder.typicode.com/posts'
      )
      return data
    },
    staleTime: 1000 * 60 * 5, // 5분 캐싱 유지
    refetchOnWindowFocus: true, // 창에 포커스할 경우 새로고침
  })
}

export default useFetchPosts
