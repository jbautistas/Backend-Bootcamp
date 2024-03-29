import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class TypesDocuments extends BaseSchema {
  protected tableName = 'type_documents'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('name', 180).notNullable()
      table.boolean('state').notNullable()
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
