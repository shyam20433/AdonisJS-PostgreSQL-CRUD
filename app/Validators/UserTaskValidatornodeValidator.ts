import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UserTaskValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    user_id: schema.number([
      rules.exists({
        table: 'users',
        column: 'id',
      }),
    ]),

    task_id: schema.number([
      rules.exists({
        table: 'tasks',
        column: 'id',
      }),
    ]),

    status: schema.string.optional({}, [
      rules.maxLength(20),
    ]),
  })

  public messages = {
    'user_id.required': 'User ID is required.',
    'user_id.number': 'User ID must be a number.',
    'user_id.exists': 'User does not exist.',

    'task_id.required': 'Task ID is required.',
    'task_id.number': 'Task ID must be a number.',
    'task_id.exists': 'Task does not exist.',

    'status.maxLength': 'Status cannot exceed 20 characters.',
  }
}