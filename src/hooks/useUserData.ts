import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/utils/supabase/supabase'

const useUserData = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const { data, error } = await supabase.auth.getUser()
      if (error) throw new Error('유저 정보를 불러오는 데 실패했습니다.')
      return data.user
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: true,
  })
}

export default useUserData
