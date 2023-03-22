import { test } from '@japa/runner'
import { ObtainAuthToken } from './TestAdmin'

test.group('Role', () => {

  test('get role', async ({assert, client}) => {
    const token = await ObtainAuthToken()
    const response = await client.get('api/v1/role/get')
        .header('authorization', `Bearer ${token}`)
    response.assertStatus(200)
    assert.isObject(response.body())
  })

  test('create role fail', async ({assert, client}) => {
    const token = await ObtainAuthToken()
    const response = await client.post('api/v1/role/create').json({
    })
        .header('authorization', `Bearer ${token}`)
    response.assertStatus(400)
    assert.isObject(response.body())
  })
})