import { DateTime } from 'luxon'
import {
  BaseModel,
  column,
  hasMany,
  HasMany,
  beforeSave,
  beforeCreate,
} from '@ioc:Adonis/Lucid/Orm'
import Task from './Task'
export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id!: number

  @column()
  public name!: string

  @column()
  public email!: string

  @hasMany(() => Task)
  public tasks!: HasMany<typeof Task>

  @column.dateTime({ autoCreate: true })
  public createdAt!: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt!: DateTime

  @beforeSave()
  public static lowerCaseEmail(user: User) {
    console.log('before => :', user.email)

    user.email = user.email.toLowerCase()

    console.log('after =>:', user.email)
  }

  @beforeCreate()
  public static createLog(user: User) {
    console.log(`Creating User ${user.name}`)
  }
}
