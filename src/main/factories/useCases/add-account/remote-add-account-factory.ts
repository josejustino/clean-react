import { makeAxiosHttpClient } from '@/main/factories/http/axios-http-cliente-factory'
import { makeApiUrl } from '@/main/factories/http/api-url-factory'
import { RemoteAddAccount } from '@/data/usecases/add-account/remote-add-acount'

import { type AddAccount } from '@/domain/usecases'

export const makeRemoteAddAccount = (): AddAccount => {
  return new RemoteAddAccount(makeApiUrl('/signup'), makeAxiosHttpClient())
}
