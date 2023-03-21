import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Answer from 'App/Models/Answer';
import Question from 'App/Models/Question';

export default class QuestionsController {
  public async createQuestion({request, response}: HttpContextContract){
    const { question, options } = request.all();
    try {
      const newQuestion = await Question.create({question: question, state: true})
      await Answer.createMany(options.map((option: any) => {
        return {
          answer: option.opcion,
          is_correct: option.iscorrect,
          state: true,
          question_id: newQuestion.id
        }
      }))
      return response.status(200).json({
        "state": true,
        "message": "Pregunta creada exitosamente"
      })
    } catch (error) {
      return response.status(400).json({
        "state": false,
        "message": "Error al crear la pregunta"
      })
    }
  }

  public async getQuestions({response}: HttpContextContract){
    try {
      const questions = await Question.query().where("state", true)
      return response.status(200).json({
        "state": true,
        "questions": questions. map((question: any) => {
          return {
            question: question.question,
            id: question.id,
          }
        })
      })
    } catch (error) {
      return response.status(400).json({
        "state": false,
        "message": "Error al listar las preguntas"
      })
    }
  }

  public async deleteQuestion({params, response}: HttpContextContract){
    try {
      const question = await Question.findOrFail(params.id)
      question.state = false
      await question.save()
      return response.status(200).json({
        "state": true,
        "message": "Pregunta eliminada con exito"
      })
    } catch (error) {
      return response.status(400).json({
        "state": false,
        "message": "Error al eliminar la pregunta"
      })
    }
  }

  public async updateQuestion({params, request, response}: HttpContextContract){
    const { question } = request.all();
    try {
      const questionUpdate = await Question.findOrFail(params.id)
      questionUpdate.question = question
      await questionUpdate.save()
      return response.status(200).json({
        "state": true,
        "message": "Pregunta editada con exito"
      })
    } catch (error) {
      return response.status(400).json({
        "state": false,
        "message": "Error al editar la pregunta"
      })
    }
  }

  public async updateAnswer({params, request, response}: HttpContextContract){
    const { answer, is_correct } = request.all();
    try {
      const answerUpdate = await Answer.findOrFail(params.id)
      answerUpdate.answer = answer
      answerUpdate.is_correct = is_correct
      await answerUpdate.save()
      return response.status(200).json({
        "state": true,
        "message": "Opcion editada con exito"
      })
    } catch (error) {
      return response.status(400).json({
        "state": false,
        "message": "Error al editar la opcion"
      })
    }
  }

  public async getOptions({params, response}: HttpContextContract){
    try {
      const options = await Answer.query().where("question_id", params.id)
      if (options.length === 0) {
        throw new Error("No hay opciones")
      }
      return response.status(200).json({
        "state": true,
        "message": "Listado de opciones",
        "options": options. map((option: any) => {
          return {
            id: option.id,
            opcion: option.answer,
          }
        })
      })
    } catch (error) {
      return response.status(400).json({
        "state": false,
        "message": "Error al obtener el listado de opciones"
      })
    }
  }
}

