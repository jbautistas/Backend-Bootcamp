import { test } from '@japa/runner'

test.group('Type', () => {

  test('get type', async ({assert, client}) => {
    const response = await client.get('api/v1/type/get')
    response.assertStatus(200)
    assert.isObject(response.body())
  })

  test('create type fail', async ({assert, client}) => {
    const response = await client.post('api/v1/type/create').json({
    })
    response.assertStatus(400)
    assert.isObject(response.body())
  })
})