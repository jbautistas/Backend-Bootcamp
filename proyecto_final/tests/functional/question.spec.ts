import { test } from '@japa/runner'
import { ObtainAuthToken } from './TestAdmin'

test.group('Question', () => {

  test('Obtener preguntas', async ({ client, assert }) => {
    const token = await ObtainAuthToken()
    const response = await client.get('api/v1/questions/getQuestions')
      .header('authorization', `Bearer ${token}`)
    response.assertStatus(200)
    assert.isObject(response.body())
  })

  test('crear pregunta', async ({ client, assert }) => {
    const token = await ObtainAuthToken()
    const response = await client.post('api/v1/questions/create').json({
      "question": "¿Cuál es el nombre de la mascota de la familia Simpson?",
      "options": [
        {
          "option": "Gato",
          "iscorrect": false
        },
        {
          "option": "Perro",
          "iscorrect": false
        },
        {
          "option": "Ayudante de santa",
          "iscorrect": true
        },
        {
          "option": "Santa dog",
          "iscorrect": false
        }
      ]
    })
      .header('authorization', `Bearer ${token}`)
    response.assertStatus(400)
    assert.isObject(response.body())
  })

  test('create pregunta fail', async ({ client, assert }) => {
    const token = await ObtainAuthToken()
    const response = await client.post('api/v1/questions/create').json({
    })
      .header('authorization', `Bearer ${token}`)
    response.assertStatus(400)
    assert.isObject(response.body())
  })

  test('update pregunta', async ({ client, assert }) => {
    const token = await ObtainAuthToken()
    const response = await client.put('api/v1/questions/updateQuestion/19').json({
      "question": "¿Que dia es hoy?"
    })
      .header('authorization', `Bearer ${token}`)
    response.assertStatus(200)
    assert.isObject(response.body())
  })

  test('update pregunta fail', async ({ client, assert }) => {
    const token = await ObtainAuthToken()
    const response = await client.put('api/v1/questions/updateQuestion/99999').json({
    })
      .header('authorization', `Bearer ${token}`)
    response.assertStatus(400)
    assert.isObject(response.body())
  })
  
  test('update respuesta', async ({ client, assert }) => {
    const token = await ObtainAuthToken()
    const response = await client.put('api/v1/questions/updateAnswer/20').json({
      "option": "correcta",
      "iscorrect": true
    })
      .header('authorization', `Bearer ${token}`)
    response.assertStatus(200)
    assert.isObject(response.body())
  })

  test('update respuesta fail', async ({ client, assert }) => {
    const token = await ObtainAuthToken()
    const response = await client.put('api/v1/questions/updateAnswer/9999').json({
    })
      .header('authorization', `Bearer ${token}`)
    response.assertStatus(400)
    assert.isObject(response.body())
  })

  test('get options', async ({ client, assert }) => {
    const token = await ObtainAuthToken()
    const response = await client.get('api/v1/questions/getOptions/20')
      .header('authorization', `Bearer ${token}`)
    response.assertStatus(200)
    assert.isObject(response.body())
  })

  test('get options fail', async ({ client, assert }) => {
    const token = await ObtainAuthToken()
    const response = await client.get('api/v1/questions/getOptions/99999')
      .header('authorization', `Bearer ${token}`)
    response.assertStatus(400)
    assert.isObject(response.body())
  })

  test('delete option fail', async ({ client, assert }) => {
    const token = await ObtainAuthToken()
    const response = await client.delete('api/v1/questions/deleteQuestion/9999')
      .header('authorization', `Bearer ${token}`)
    response.assertStatus(400)
    assert.isObject(response.body())
  })
})