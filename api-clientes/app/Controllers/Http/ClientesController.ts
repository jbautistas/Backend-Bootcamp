import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Cliente from 'App/Models/Cliente'

export default class ClientesController {
    public async getListarClientes(): Promise<Cliente[]> {
        const cliente = await Cliente.all()
        return cliente;
    }
    public async setRegistrarClientes({request, response}: HttpContextContract) {
        const dataCliente = request.only([
            'cedula', 'nombre', 'apellido',
            'telefono', 'correo'
        ])
        try {
            const cedulaCliente = dataCliente.cedula;
            const clienteExistente: Number = await this.getValidarClienteExistente(cedulaCliente)
            console.log(clienteExistente)
            if (clienteExistente == 0) {
                await Cliente.create(dataCliente)
                response.status(200).json({"msg":"Registro completado con exito"})
            } else {
                response.status(400).json({"msg":"Error, cedula existente"})
            }
        } catch (error) {
            console.log(error)
            response.status(500).json({"msg":"Error en el servidor !!"})
        }
    }
    private async getValidarClienteExistente(cedula: Number) : Promise<Number> {
        const total = await Cliente.query().where({"cedula":cedula})
        return total.length
    }
    public async actualizarClientes({ request }: HttpContextContract) {
        const cedula = request.param('id');
        console.log(cedula);
        const cliente = await Cliente.findOrFail(cedula);
        const datos = request.all();
        cliente.nombre = datos.nombre,
        cliente.apellido = datos.apellido,
        cliente.telefono = datos.telefono,
        cliente.correo = datos.correo,
        await cliente.save()
        return {"mensaje": "Actualizado correctamente", "estado":200}
    }

    public async eliminarCliente({ request }: HttpContextContract){
        const id = request.param('id');
        await Cliente.query().where('cedula', id).delete()
        return {"mensaje": `A eliminado la CC ${id} correctamente`, "estado":200}
    }
}
