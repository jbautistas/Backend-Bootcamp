import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Dato extends BaseModel {
  @column({ isPrimary: true }) public Codigo_animal: number
  @column() public Nombre_animal: string
  @column() public Especie: number
  @column() public Raza: number
  @column() public Genero: number
  @column() public Edad: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
