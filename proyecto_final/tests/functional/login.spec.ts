import { test } from '@japa/runner'
import { ObtainAuthToken } from './TestAuths'

test('login', async ({ client, assert }) => {
  const token = await ObtainAuthToken()
  const response = await client.get('/')
    .header('Authorization', `Bearer ${token}`)
  response.assertStatus(200)
  assert.isObject(response.body)
})
