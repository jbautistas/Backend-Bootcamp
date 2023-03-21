import { test } from '@japa/runner'

test.group('Form', () => {

  test('get form', async ({assert, client}) => {
    const response = await client.get('api/v1/form/getquestions')
    response.assertStatus(200)
    assert.isObject(response.body())
  })

  test('create form fail', async ({assert, client}) => {
    const response = await client.post('api/v1/form/postquestions').json({
    })
    response.assertStatus(400)
    assert.isObject(response.body())
  })
})