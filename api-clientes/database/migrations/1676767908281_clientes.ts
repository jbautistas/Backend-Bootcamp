import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Clientes extends BaseSchema {
  protected tableName = 'clientes'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('cedula').primary()
      table.string('nombre', 80).notNullable()
      table.string('apellido', 80).notNullable()
      table.string('telefono', 20).notNullable()
      table.string('correo', 100).notNullable()
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
