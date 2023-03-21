import { test } from '@japa/runner'

test('list get', async ({ client, assert }) => {
  const response = await client.get('api/v1/user/getUsers')
  response.assertStatus(200)
  assert.isObject(response.body())
})