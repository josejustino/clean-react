import { RemoteAuthentication } from '@/data/usecases/authentication/remote-authentication'
import { type Authentication } from '@/domain/usecases'
import { makeAxiosHttpClient } from '@/main/factories/http/axios-http-cliente-factory'
import { makeApiUrl } from '@/main/factories/http/api-url-factory'

export const makeRemoveAuthentication = (): Authentication => {
  return new RemoteAuthentication(makeApiUrl(), makeAxiosHttpClient())
}
