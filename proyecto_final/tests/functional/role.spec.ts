import { test } from '@japa/runner'

test.group('Role', () => {

  test('get role', async ({assert, client}) => {
    const response = await client.get('api/v1/role/get')
    response.assertStatus(200)
    assert.isObject(response.body())
  })

  test('create role fail', async ({assert, client}) => {
    const response = await client.post('api/v1/role/create').json({
    })
    response.assertStatus(400)
    assert.isObject(response.body())
  })
})