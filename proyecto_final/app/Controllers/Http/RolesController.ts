import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Role from 'App/Models/Role';

export default class RolesController {
  public async createRole({request,response}: HttpContextContract){
    const {name} = request.all();
    try {
      const role = new Role();
      role.name = name;
      role.state = true;
      await role.save();
      response.status(200).json({
        "status": true,
        "message": "Rol creado con exito",
        "role": role
      })
    } catch (error) {
      response.status(400).json({
        "status": false,
        "message": "No se pudo crear el rol",
      })
    }
  }

  public async getRoles({response}: HttpContextContract){
    try {
      const roles = await Role.all();
      response.status(200).json({
        "state": true,
        "message": "Listado de roles",
        "roles": roles
      })
    } catch (error) {
      response.status(400).json({
        "state": false,
        "message": "Fallo en el listado de roles"
      })
    }
  }
}
