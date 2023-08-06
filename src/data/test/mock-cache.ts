import { type GetStorage } from '@/data/protocols/cache'
import { faker } from '@faker-js/faker'

export class GetStorageSpy implements GetStorage {
  key: string
  value = {
    accessToken: faker.string.uuid(),
    name: faker.person.fullName()
  }

  get (key: string): any {
    this.key = key

    return this.value
  }
}
