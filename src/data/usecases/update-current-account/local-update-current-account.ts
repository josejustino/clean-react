import { UnexpectedError } from '@/domain/errors'

import { type SetStorage } from '@/data/protocols/cache/set-storage'
import { type UpdateCurrentAccount } from '@/domain/usecases/update-current-account'
import { type AccountModel } from '@/domain/models'

export class LocalUpdateCurrentAccount implements UpdateCurrentAccount {
  constructor (private readonly setStorage: SetStorage) {}

  async save (account: AccountModel): Promise<void> {
    if (!account?.accessToken) throw new UnexpectedError()

    await this.setStorage.set('account', JSON.stringify(account))
  }
}
