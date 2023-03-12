import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import TipoDocumento from 'App/Models/TipoDocumento';

export default class TipoDocumentosController {
    public async registrar({request}: HttpContextContract){
        const {tipo_documento} = request.all();
        const tipoDoc = new TipoDocumento();
        tipoDoc.nombre_tipo_doc = tipo_documento;
        await tipoDoc.save();
        return{tipoDoc, "msj": "Tipo Documento registrado"}
    }

    public async getListarPerfiles(): Promise<TipoDocumento[]> {
        const tipoDoc = await TipoDocumento.all();
        return tipoDoc;
    }
}
