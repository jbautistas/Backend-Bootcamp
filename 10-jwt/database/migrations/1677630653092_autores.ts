import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Autores extends BaseSchema {
  protected tableName = 'autores'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_autor').primary()
      table.string('nombre_autor', 200).notNullable().unique()
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
