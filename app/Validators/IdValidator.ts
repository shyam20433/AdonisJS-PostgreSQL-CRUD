import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class IdValidator {

  constructor(protected ctx: HttpContextContract) {}

  // 👇 Tell Adonis to validate route params instead of the request body
  public data = this.ctx.params

  public schema = schema.create({
    id: schema.number([
      rules.unsigned()
    ])
  })

  public messages = {
    'id.required': 'Id is required',
    'id.number': 'Id must be a valid number',
    'id.unsigned': 'Id must be a positive number'
  }
}