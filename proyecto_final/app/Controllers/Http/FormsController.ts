import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Form from 'App/Models/Form'
import Question from 'App/Models/Question'

export default class FormsController {
  public async getQuestions({response}: HttpContextContract){
    try {
      const questions = await Question.query().where("state", true).preload("answers")
      response.status(200).json({
        "state": true,
        "questions": questions. map((question: any) => {
          return {
            question: question.question,
            id: question.id,
            options: question.answers.map((answer: any) => {
              return {
                id: answer.id,
                answer: answer.answer
              }
            })
          }
        })
      })
    } catch (error) {
      response.status(400).json({
        "state": false,
        "message": "Error al obtener el listado"
      })
    }
  }

  public async postQuestions({request, response}: HttpContextContract){
    const { estudianteId, answers } = request.all();
    try {
      await Form.createMany(answers.map((answer: any) => {
        return {
          student_id: estudianteId,
          answer_id: answer,
          state: true
        }
      }))
      response.status(200).json({
        "state": true,
        "message": "Respuestas almacenadas con exito"
      })
    } catch (error) {
      response.status(400).json({
        "state": false,
        "message": "No se pudieron almacenar las respuestas"
      })
    }
  }
}
