import { test } from '@japa/runner'

test('detalle estudiante get', async ({ client, assert }) => {
  const response = await client.get('api/v1/user/getUser/2')
  response.assertStatus(200)
  assert.isObject(response.body())
})