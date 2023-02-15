import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Datos extends BaseSchema {
  protected tableName = 'datos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('Codigo_animal').primary().unsigned()
      table.string('Nombre_animal', 100).notNullable()
      table.integer('Especie').notNullable()
      table.integer('Raza').notNullable()
      table.integer('Genero').notNullable()
      table.integer('edad').notNullable()
      table.timestamps(false)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
