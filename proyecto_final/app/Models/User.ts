import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany, HasOne, hasOne, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import TypeDocument from './TypeDocument'
import Role from './Role'
import Answer from './Answer'
//import TypeDocument from './TypeDocument'
//import Role from './Role'

export default class User extends BaseModel {
  @column({ isPrimary: true }) public id: number
  @column() public first_name: string
  @column() public second_name: string
  @column() public surname: string
  @column() public second_surname: string
  @column() public type_document: number /* Foreign key */
  @column() public document_number: string
  @column() public email: string
  @column() public password: string
  @column() public phone: string
  @column() public rol_id: number /* Foreign key */
  @column() public state: boolean

  @belongsTo(() => TypeDocument, {
    localKey: 'id',
    foreignKey: 'type_document',
  })
  public typeDocument: BelongsTo<typeof TypeDocument>

  @belongsTo(() => Role, {
    localKey: 'id',
    foreignKey: 'rol_id',
  })
  public rolID: BelongsTo<typeof Role>

  @manyToMany(() => Answer, {
      localKey: 'id',
      pivotForeignKey: 'student_id',
      relatedKey: 'id',
      pivotRelatedForeignKey: 'answer_id'
  })
  public answers: ManyToMany<typeof Answer>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
