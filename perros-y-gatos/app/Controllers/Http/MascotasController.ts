import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Mascota from 'App/Models/Mascota';

export default class MascotasController {

    public async setRegistrarMascota({request, response}: HttpContextContract) {
        try {
            const dataMascota = request.only([
                'codigo_animal', 'nombre_animal', 'especie',
                'raza', 'genero', 'edad'
            ])
            
            const codigoMascota = dataMascota.codigo_animal;
            const MascotaExistente : Number = await this.getValidarMascotaExistente(codigoMascota);
            if (MascotaExistente === 0){
                await Mascota.create(dataMascota)
                response.status(200).json({"msg": "Registro de mascota completado"})
            } else {

                response.status(400).json({"msg": "Error, el codigo mascota ya ha sido ingresado"})
            }
        } catch (error) {
            console.log(error)
            response.status(500).json({"msg": "Error en el servidor !!"})
        }
    }

    private async getValidarMascotaExistente(codigo_animal: Number): Promise<Number> {
        const total = await Mascota
        .query()
        .where({"codigo_animal":codigo_animal})
        .count("*")
        .from("mascotas");

        return parseInt(total[0].$extras["count(*)"])
    }

    public async getListarMascotas(): Promise<Mascota[]> {
        const mascota = await Mascota.all()
        return mascota;
    }

    public async getFiltroEspecies({request}: HttpContextContract): Promise<Mascota[]> {
        const especie = request.param('especie');
        const mascota = await Mascota
        .query()
        .where('especie', especie)

        return mascota;
    }

    public async getMenoresOcho(): Promise<Mascota[]>{
        const mascota = await Mascota
        .query()
        .where("edad", "<", 8)

        return mascota
    }

    public async deleteMascota({request, response}: HttpContextContract) {
        const codigo_animal = request.param('codigo_mascota')
        const MascotaExistente: Number = await this.getValidarMascotaExistente(codigo_animal)
        if (MascotaExistente === 1){
            const mascota = await Mascota.findOrFail(codigo_animal)
            await mascota.delete()
            response.status(200).json({"msg": "La mascota ha sido eliminada del registro"})
        } else {
            response.status(400).json({"msg": "La mascota no existe"})
        }
    }

    public async updateMascota({ request }: HttpContextContract) {
        const id = request.param('codigo_animal');
        const mascota = request.all();
        await Mascota.query().where('codigo_animal', id).update({
            nombre_animal: mascota.nombre_animal,
            especie: mascota.especie,
            raza: mascota.raza,
            genero: mascota.genero,
            edad: mascota.edad
        });
        return("Registro actualizado")
    }
}
