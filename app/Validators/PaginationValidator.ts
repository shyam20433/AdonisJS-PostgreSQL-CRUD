import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class PaginationValidator {

  public schema = schema.create({
    page: schema.number.optional([
      rules.unsigned()
    ]),

    limit: schema.number.optional([
      rules.range(1, 100)
    ])
  })
}