import { test } from '@japa/runner'
import { ObtainAuthToken } from './TestAdmin'

test.group('Form', () => {

  test('get form', async ({assert, client}) => {
    const token = await ObtainAuthToken()
    const response = await client.get('api/v1/form/getquestions')
      .header('authorization', `Bearer ${token}`)
    response.assertStatus(200)
    assert.isObject(response.body())
  })

  test('create form fail', async ({assert, client}) => {
    const token = await ObtainAuthToken()
    const response = await client.post('api/v1/form/postquestions').json({
    })
      .header('authorization', `Bearer ${token}`)
    response.assertStatus(400)
    assert.isObject(response.body())
  })
})