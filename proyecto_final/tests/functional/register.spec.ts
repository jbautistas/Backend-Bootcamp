import { test } from '@japa/runner'

test('register', async ({client, assert}) => {
  const response = await client.post('api/v1/user/create').json({
    "firstName": "daniel",
    "secondName": "jose",
    "surname": "cruz",
    "secondSurName": "casallas",
    "typeDocument": 1, 
    "documentNumber": "123911189",
    "email": "daniee24@gmail.co",
    //
    "rol": 2,
    "phone": "32123122314"
  })
  response.assertStatus(200)
  assert.isObject(response.body())
})