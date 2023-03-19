import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('first_name', 180).notNullable()
      table.string('second_name', 180).notNullable()
      table.string('surname', 180).notNullable()
      table.string('second_surname', 180).notNullable()
      table.integer('type_document').unsigned().index('type_document')
      table.foreign('type_document').references('type_documents.id').onDelete('CASCADE')
      table.integer('document_number').notNullable().unique()
      table.string('email', 200).notNullable().unique()
      table.string('password', 180).notNullable()
      table.integer('rol_id').unsigned().index('rol_id')
      table.foreign('rol_id').references('roles.id').onDelete('CASCADE')
      table.string('phone', 20).notNullable()
      table.boolean('state').notNullable().defaultTo(true)
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
