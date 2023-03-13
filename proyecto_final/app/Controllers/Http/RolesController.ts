import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Role from 'App/Models/Role';

export default class RolesController {
  public async createRole({request}: HttpContextContract){
    const {name} = request.all();
    const role = new Role();
    role.name = name;
    role.state = true;
    await role.save();
    return {role, "msg": "Rol creado"}
  }

  public async getRoles({}: HttpContextContract){
    try {
      const roles = await Role.all();
      return roles;
    } catch (error) {
      return {error, "msg": "Error al obtener los roles"}
    }
  }

  public async updateRole({request, params}: HttpContextContract){
    const role = await Role.find(params.id);
    if(role){
      role.name = request.all().name;
      if(await role.save()){
        return {role, "msg": "Rol actualizado"}
      }
      return {
        "msg": "No se pudo actualizar el rol",
        "estado": 401}
    } else {
      return {
        "msg": "Rol no encontrado",
        "estado": 401
      }
    }
  }
}
