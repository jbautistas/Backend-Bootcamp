import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User';
import jwt from 'jsonwebtoken';
import Env from '@ioc:Adonis/Core/Env';
const bcryptjs = require('bcryptjs');

export default class UsersController {

  public async registerUser({request}: HttpContextContract){
    const {
      first_name,
      second_name, 
      surname,
      second_surname,
      type_document,
      document_number,
      email,
      password,
      rol_id,
      phone,
      } = request.all();
    const salt = bcryptjs.genSaltSync()
    const user = new User();
    user.first_name = first_name;
    user.second_name = second_name;
    user.surname = surname;
    user.second_surname = second_surname;
    user.type_document = type_document;
    user.document_number = document_number;
    user.email = email;
    user.password = bcryptjs.hashSync(password, salt);
    user.rol_id = rol_id;
    user.phone = phone;
    user.state = true;
    await user.save();
    return {user, "msg": "Usuario registrado"}
  }

  public async login({request, response}: HttpContextContract){
    const correo = request.input('correo');
    const contrasena = request.input('contrasena');
    try {
      //consultar si existe el usuario
      const user = await User.findBy('correo', correo);
      if(!user){
        return response.status(400).json({"msg": "El usuario no existe"});
      }
      const validaPassword = bcryptjs.compareSync(contrasena, user.password);
      if (!validaPassword){
        return response.status(400).json({"msg": "La contrasena  es invalida"});
      }
      const payload = {
        "first_name" : user.first_name,
        "second_name" : user.second_name,
        "id" : user.id
      }
      const token:string = this.generarToken(payload);
      response.status(200).json({
        token,
        "msg": "Usuario logueado"
      })
    } catch (error) {
        response.json({"msg": "Credenciales invalidas"});
    }
  }

  public generarToken(payload: any): string{
    const opciones = {
      expiresIn: "5 mins"
    }
    return jwt.sign(payload, Env.get('JWT_SECRET_KEY'), opciones)
  }
  public verificarToken(authorizationHeader:string){
    let token = authorizationHeader.split(' ')[1]
    token = jwt.verify(token, Env.get('JWT_SECRET_KEY'), (error) => {
      if(error){
        throw new Error("Token expirado");
      }
    })
    return true
  }
}
