import { schema,rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AdminValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    username: schema.string({},[rules.minLength(5),rules.noAdmin(),rules.maxLength(20)]),
    password:schema.string({},[rules.minLength(8)])
  })


  public messages ={
     "username.minLength":"username should be minimum length of 5 ",
     "password.minLength":"Password Should be Minimum length of 8 "
  }
}
