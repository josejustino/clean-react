import { UnexpectedError } from '@/domain/errors'
import { makeLocalStorageAdapter } from '@/main/factories/cache'
import { type AccountModel } from '@/domain/models'

export const setCurrentAccountAdapter = (account: AccountModel): void => {
  if (!account?.accessToken) throw new UnexpectedError()

  makeLocalStorageAdapter().set('account', account)
}

export const getCurrentAccountAdapter = (): AccountModel => {
  return makeLocalStorageAdapter().get('account')
}
