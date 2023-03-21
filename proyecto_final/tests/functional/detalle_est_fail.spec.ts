import { test } from '@japa/runner'

test('detalle estudiante get fail', async ({ client, assert }) => {
  const response = await client.get('api/v1/user/getUser/9999')
  response.assertStatus(400)
  assert.isObject(response.body())
})