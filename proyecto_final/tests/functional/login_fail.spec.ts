import { test } from '@japa/runner'

test('login_fail', async ({ client, assert }) => {
  const response = await client.post('api/v1/login').json({
  })
  response.assertStatus(400)
  assert.isObject(response.body())
})
