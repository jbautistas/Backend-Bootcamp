import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import TypeDocument from 'App/Models/TypeDocument';

export default class TypeDocumentsController {
    public async getTypeDocuments({response}: HttpContextContract){
      const typeDocuments = await TypeDocument.all();
      response.status(200).json({
        "status": true,
        "types": typeDocuments
      }) 
    }

    public async createTypeDocument({request, response}: HttpContextContract){
      try {
        const {name} = request.all();
        const typeDocument = new TypeDocument();
        typeDocument.name = name;
        typeDocument.state = true;
        await typeDocument.save();
        response.status(200).json({
          "status": true,
          "message": "Tipo de documento creado con exito",
          "typeDocument": typeDocument
        })
      } catch (error) {
        response.status(400).json({
          "status": false,
          "message": "No se pudo crear el tipo de documento",
        })
        
      }
    }
}
