import { test } from '@japa/runner'

test('edit put', async ({ client, assert }) => {
  const response = await client.put('api/v1/user/update/3').json({
    "firstName": "daniel",
    "secondName": "jose",
    "surname": "cruz",
    "secondSurName": "casallas",
    "typeDocument": 1,
    "documentNumber": "123456789",
    "email": "danielc88@gmail.co,",
    "phone": "32123122314"
  })
  response.assertStatus(200)
  assert.isObject(response.body())
})