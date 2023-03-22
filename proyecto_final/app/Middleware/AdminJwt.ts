import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UsersController from 'App/Controllers/Http/UsersController'

export default class AdminJwt {
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
      if(usersController.verifyToken(authorizationHeader) != 1){
        return ctx.response.status(400).send({
          message: "Rol no autorizado",
          estado: 401
        })
      } 
      await next()
    } catch (error) {
      ctx.response.status(400).send("Token expirado")
    }
  }
}