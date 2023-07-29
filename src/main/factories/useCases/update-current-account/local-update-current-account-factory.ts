import { LocalUpdateCurrentAccount } from '@/data/usecases/update-current-account/local-update-current-account'
import { type UpdateCurrentAccount } from '@/domain/usecases'
import { makeLocalStorageAdapter } from '@/main/factories/cache/local-storage-adapter-factory'

export const makeLocalUpdateCurrentAccount = (): UpdateCurrentAccount => {
  return new LocalUpdateCurrentAccount(makeLocalStorageAdapter())
}
