import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import TypeDocument from './TypeDocument'
import Role from './Role'

export default class User extends BaseModel {
  @column({ isPrimary: true }) public id: number
  @column() public first_name: string
  @column() public second_name: string
  @column() public surname: string
  @column() public second_surname: string
  @column() public document_number: string
  @column() public email: string
  @column() public password: string
  @column() public phone: string
  @column() public state: boolean

  @hasMany(() => TypeDocument, {
    localKey: 'type_document',
    foreignKey: 'id',
  })
  public type_document: HasMany<typeof TypeDocument>

  @hasMany(() => Role, {
    localKey: 'rol_id',
    foreignKey: 'id'
  })
  public rol_id: HasMany<typeof Role>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
