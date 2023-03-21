import { test } from '@japa/runner'

test('create pregunta fail', async ({ client, assert }) => {
  const response = await client.post('api/v1/questions/create').json({
  })
  response.assertStatus(400)
  assert.isObject(response.body())
})
