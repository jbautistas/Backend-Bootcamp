import { test } from '@japa/runner'

test('Obtener preguntas', async ({ client, assert }) => {
  const response = await client.post('api/v1/questions/getQuestions')
  response.assertStatus(200)
  assert.isObject(response.body())
})
