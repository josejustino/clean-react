import { useRecoilValue } from 'recoil'
import { useNavigate } from 'react-router-dom'

import { currentAccountState } from '@/presentation/components'

type ResultType = () => void

export const useLogout = (): ResultType => {
  const navigate = useNavigate()
  const { setCurrentAccount } = useRecoilValue(currentAccountState)

  return (): void => {
    setCurrentAccount(undefined)
    navigate('/login')
  }
}
