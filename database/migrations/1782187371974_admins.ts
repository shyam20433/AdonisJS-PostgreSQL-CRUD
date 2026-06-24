import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Admins extends BaseSchema {
  protected tableName = 'admins'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('username').notNullable().unique()
      table.string('password').notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
