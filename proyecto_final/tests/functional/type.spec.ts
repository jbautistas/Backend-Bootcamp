import { test } from '@japa/runner'
import { ObtainAuthToken } from './TestAdmin'

test.group('Type', () => {

  test('get type', async ({assert, client}) => {
    const token = await ObtainAuthToken()
    const response = await client.get('api/v1/type/get')
        .header('authorization', `Bearer ${token}`)
    response.assertStatus(200)
    assert.isObject(response.body())
  })

  test('create type fail', async ({assert, client}) => {
    const token = await ObtainAuthToken()
    const response = await client.post('api/v1/type/create').json({
    })
        .header('authorization', `Bearer ${token}`)
    response.assertStatus(400)
    assert.isObject(response.body())
  })
})