import { type Authentication, type AuthenticationParams } from '@/domain/usecases'
import { mockAccountModel } from '@/domain/test'
import { type AccountModel } from '@/domain/models'

export class AuthenticationSpy implements Authentication {
  account = mockAccountModel()
  params: AuthenticationParams

  async auth (params: AuthenticationParams): Promise<AccountModel> {
    this.params = params

    return Promise.resolve(this.account)
  }
}
