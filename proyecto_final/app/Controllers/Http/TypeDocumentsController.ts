import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import TypeDocument from 'App/Models/TypeDocument';

export default class TypeDocumentsController {
    public async getTypeDocuments(){
        try {
            const typeDocuments = await TypeDocument.all();
            return typeDocuments;
        } catch (error) {
            return {error, "msg": "Error al obtener los tipos de documentos"}
        }
    }

    public async createTypeDocument({request}: HttpContextContract){
        const {name} = request.all();
        const typeDocument = new TypeDocument();
        typeDocument.name = name;
        typeDocument.state = true;
        await typeDocument.save();
        return {typeDocument, "msg": "Tipo de documento creado"}
    }

    public async updateTypeDocument({request, params}: HttpContextContract){
      const type_document = await TypeDocument.find(params.id);
      if(type_document){
        type_document.name = request.all().name;
        if(await type_document.save()){
          return {type_document, "msg": "Tipo de documento actualizado"}
        }
        return {
          "msg": "No se pudo actualizar el tipo de documento",
          "estado": 401}
      } else {
        return {
          "msg": "Tipo de documento no encontrado",
          "estado": 401
        }
      }
    }
}
