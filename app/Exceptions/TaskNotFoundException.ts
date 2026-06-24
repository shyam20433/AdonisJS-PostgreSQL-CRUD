import { Exception } from '@adonisjs/core/build/standalone'

export default class TaskNotFoundException extends Exception {
  constructor() {
    super('Task Not Found', 404)
  }
}