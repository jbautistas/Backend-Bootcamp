import { test } from '@japa/runner'

test('crear pregunta', async ({ client, assert }) => {
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
  response.assertStatus(400)
  assert.isObject(response.body())
})
