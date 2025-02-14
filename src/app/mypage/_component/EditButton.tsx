import { supabase } from '@/utils/supabase/supabase'
import { useQueryClient } from '@tanstack/react-query'
import { User } from '@supabase/auth-js'

interface EditButtonProps {
  user: User
  nickname: string
  setNickname: (nickname: string) => void
  setIsEditing: (isEditing: boolean) => void
}

const EditButton = ({
  user,
  nickname,
  setNickname,
  setIsEditing,
}: EditButtonProps) => {
  const queryClient = useQueryClient()

  const handleEditNickname = async () => {
    if (!nickname.trim()) return // 빈칸인 경우 리턴

    if (!user) {
      console.log('사용자 정보가 없습니다.')
      return
    }

    try {
      // 1. supabase > `user_metadata`에 추가
      const { data: authData, error: authError } =
        await supabase.auth.updateUser({
          data: { nickname },
        })

      if (authError) {
        console.log(authError)
      }

      // 2. supabase > 테이블에 추가
      const { data: tableData, error: tableError } = await supabase
        .from('member')
        .update({ mem_nickname: nickname })
        .eq('mem_no', user.id)

      if (tableError) {
        console.log(tableError)
      }

      console.log('닉네임 업데이트 성공:', { authData, tableData })

      // React Query 캐시 무효화하여 user 데이터 갱신
      await queryClient.invalidateQueries({ queryKey: ['user'] })

      setIsEditing(false)
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log('닉네임 변경 실패:', error.message)
      } else {
        console.log('에러 발생')
      }
    }
  }
  return (
    <div>
      <input
        type="text"
        value={nickname}
        onChange={e => setNickname(e.target.value)}
        className="text-lg block border border-gray-300 rounded-md p-2 mt-2 w-72 text-center text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <div className="flex justify-end gap-4 mt-4">
        <button
          onClick={handleEditNickname}
          className="bg-blue-500 text-white px-2 py-1 rounded mt-2 w-full"
        >
          저장
        </button>
        <button
          onClick={() => setIsEditing(false)}
          className="bg-gray-500 text-white px-2 py-1 rounded mt-2 w-full"
        >
          취소
        </button>
      </div>
    </div>
  )
}

export default EditButton
