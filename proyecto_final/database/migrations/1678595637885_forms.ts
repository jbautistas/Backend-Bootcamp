import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Forms extends BaseSchema {
  protected tableName = 'forms'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('student_id').unsigned().notNullable().index('student_id')
      table.foreign('student_id').references('id').inTable('users').onDelete('CASCADE')
      table.integer('answer_id').unsigned().notNullable().index('answer_id')
      table.foreign('answer_id').references('id').inTable('answers').onDelete('CASCADE')
      table.boolean('state').notNullable()
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
