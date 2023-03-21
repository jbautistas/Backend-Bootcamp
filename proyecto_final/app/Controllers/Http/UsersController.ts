import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User';
import jwt from 'jsonwebtoken';
import Env from '@ioc:Adonis/Core/Env';
const bcryptjs = require('bcryptjs');

export default class UsersController {

  public async getUsers({response}: HttpContextContract){
    try {
      const users = await User.all();
      return response.status(200).json({
        "state": true,
        "msg": "Listado de estudiantes",
        "users": users.map((user) => {
          return {
            "firstName": user.first_name,
            "secondName": user.second_name,
            "surname": user.surname,
            "secondSurName": user.second_surname,
            "typeDocument": user.type_document,
            "documentNumber": user.document_number,
            "email": user.email,
            "phone": user.phone
          }
        })
      })
    } catch (error) {
      return response.status(400).json({
        "state": false,
        "msg": "Fallo en el listado de estudiantes"
        })
    }
  }

  public async registerUser({request}: HttpContextContract){
    const {
      firstName,
      secondName, 
      surname,
      secondSurName,
      typeDocument,
      documentNumber,
      email,
      password,
      rol,
      phone
      } = request.all();
    const salt = bcryptjs.genSaltSync()
    const user = new User();
    try{
      user.first_name = firstName;
      user.second_name = secondName;
      user.surname = surname;
      user.second_surname = secondSurName;
      user.type_document = typeDocument;
      user.document_number = documentNumber;
      user.email = email;
      user.password = bcryptjs.hashSync(password, salt);
      user.rol_id = rol;
      user.phone = phone;
      await user.save();
      return {
        "state": true,
        "msg": "Estudiante creado con exito"}
    } catch (error){
      return {
        error,
        "state": false,
        "msg": "Fallo en la creación del estudiante",}
    }
  }

  public async loginUser({request, response}: HttpContextContract){
    const {email, password} = request.all();
    try {
      const user = await User.findBy('email', email);
      if(!user){
        throw new Error("El usuario no existe");
      }

      await user.load('rolID') // Load the relationship

      const validaPassword = bcryptjs.compareSync(password, user.password);
      if (!validaPassword){
        throw new Error("Contraseña invalida")
      }

      const payload = {
        "first_name" : user.first_name,
        "second_name" : user.second_name,
        "id" : user.id
      }
      const token:string = this.generateToken(payload);
      response.status(200).json({
        //token,
        "state": true,
        "id": user.id,
        "name": user.first_name + " " + user.second_name + " " + user.surname + " " + user.second_surname,
        "role": user.rolID.name,
        "message": "Ingreso exitoso"
      })
    } catch (error) {
        response.json({
          "state": false,
          "message": "contraseña o email invalido"});
    }
  }

  public async updateUser({request, response}: HttpContextContract){
    const {
      firstName,
      secondName,
      surname,
      secondSurName,
      typeDocument,
      documentNumber,
      email,
      phone
      } = request.all();
    const id = request.param('id');
    try {
      const user = await User.findBy('id', id);
      if(!user){
        throw new Error("El usuario no existe");
      }
      user.first_name = firstName;
      user.second_name = secondName;
      user.surname = surname;
      user.second_surname = secondSurName;
      user.type_document = typeDocument;
      user.document_number = documentNumber;
      user.email = email;
      user.phone = phone;
      await user.save();
      return response.status(200).json({
        "state": true,
        "msg": "Se actualizo correctamente"
      })
    } catch (error) {
      return response.status(400).json({
        "state": false,
        "msg": "Error al actualizar"
      })
    }
  }

  public async getUser({request, response}: HttpContextContract){
    const id = request.param('id');
    try {
      const user = await User.findBy('id', id);
      if(!user){
        throw new Error("El usuario no existe");
      }
      return response.status(200).json({
        "firstName": user.first_name,
        "secondName": user.second_name,
        "surname": user.surname,
        "secondSurName": user.second_surname,
        "typeDocument": user.type_document,
        "documentNumber": user.document_number,
        "email": user.email,
        "phone": user.phone
      })
    } catch (error) {
      return response.status(400).json({
        "state": false,
        "message": "Error al consultar el detalle del usuario"
      })
    }
  }

  public generateToken(payload: any): string{
    const options = {
      expiresIn: "5 mins"
    }
    return jwt.sign(payload, Env.get('JWT_SECRET_KEY'), options)
  }
  public verifyToken(authorizationHeader:string){
    let token = authorizationHeader.split(' ')[1]
    token = jwt.verify(token, Env.get('JWT_SECRET_KEY'), (error) => {
      if(error){
        throw new Error("Token expirado");
      }
    })
    return true
  }
}
