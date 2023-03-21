import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Question from './Question'

export default class Answer extends BaseModel {
  @column({ isPrimary: true }) public id: number
  @column() public answer: string
  @column() public is_correct: boolean
  @column() public state: boolean
  @column() public question_id: number /* Foreign Key */

  @belongsTo(() => Question, {
    foreignKey: 'question_id',
    localKey: 'id'
  })

  public questionID: BelongsTo<typeof Question>


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
