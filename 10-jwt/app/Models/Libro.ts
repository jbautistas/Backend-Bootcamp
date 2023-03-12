import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Libro extends BaseModel {
  @column({ isPrimary: true }) public idLibro: number
  @column() public titulo: string
  @column() public isbn: string
  @column() public id_editorial: number
  @column() public id_autor: number
  @column() public id_usuario: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
