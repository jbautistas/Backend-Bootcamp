import { test } from '@japa/runner'

test('register fail', async ({client, assert}) => {
  const response = await client.post('api/v1/user/create').json({
  })
  response.assertStatus(400)
  assert.isObject(response.body())
})