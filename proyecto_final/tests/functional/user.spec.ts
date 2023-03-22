import { test } from '@japa/runner'
import { ObtainAuthToken } from './TestAdmin'

test.group('User', () => {
  test('list get', async ({ client, assert }) => {
    const token = await ObtainAuthToken()
    const response = await client.get('api/v1/user/getUsers')
        .header('authorization', `Bearer ${token}`)
    response.assertStatus(200)
    assert.isObject(response.body())
  })

  test('register fail', async ({client, assert}) => {
    const response = await client.post('api/v1/user/create').json({
    })
    response.assertStatus(400)
    assert.isObject(response.body())
  })

  test('login_fail', async ({ client, assert }) => {
    const response = await client.post('api/v1/login').json({
    })
    response.assertStatus(400)
    assert.isObject(response.body())
  })

  test('detalle estudiante get fail', async ({ client, assert }) => { 
    const token = await ObtainAuthToken()
    const response = await client.get('api/v1/user/getUser/9999')
        .header('authorization', `Bearer ${token}`)
    response.assertStatus(400)
    assert.isObject(response.body())
  })

  test('edit put fail', async ({ client, assert }) => {
    const token = await ObtainAuthToken()
    const response = await client.put('api/v1/user/update/99999').json({
      "firstName": "daniel",
      "secondName": "jose",
      "surname": "cruz",
      "secondSurName": "casallas",
      "typeDocument": 1,
      "documentNumber": "123456789",
      "email": "danielc88@gmail.co,",
      "phone": "32123122314"
    })
        .header('authorization', `Bearer ${token}`)
    response.assertStatus(400)
    assert.isObject(response.body())
  })

  test('edit put', async ({ client, assert }) => {
    const token = await ObtainAuthToken()
    const response = await client.put('api/v1/user/update/10').json({
      "firstName": "daniel",
      "secondName": "jose",
      "surname": "cruz",
      "secondSurName": "casallas",
      "typeDocument": 1,
      "documentNumber": "123451119",
      "email": "daniel111@gmail.co",
      "phone": "32123122315"
    })
        .header('authorization', `Bearer ${token}`)
    response.assertStatus(200)
    assert.isObject(response.body())
  })

  test('detalle estudiante get', async ({ client, assert }) => {
    const token = await ObtainAuthToken()
    const response = await client.get('api/v1/user/getUser/2')
        .header('authorization', `Bearer ${token}`)
    response.assertStatus(200)
    assert.isObject(response.body())
  })
})