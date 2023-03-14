import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UsersController from 'App/Controllers/Http/UsersController'

export default class AuthJwt {
  public async handle(ctx: HttpContextContract, next: () => Promise<void>) {
    const authorizationHeader = ctx.request.header('authorization')

    if(authorizationHeader == undefined){
      return ctx.response.status(400).send({
        message: "No se ha proporcionado un token de autenticación",
        estado: 401
      })
    }

    try {
      const usersController = new UsersController()
      usersController.verifyToken(authorizationHeader)
      await next()
    } catch (error) {
      ctx.response.status(400).send("Token expirado")
    }
  }
}
