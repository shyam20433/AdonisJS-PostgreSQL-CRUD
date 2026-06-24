import { Exception } from '@adonisjs/core/build/standalone'

export default class InvalidCredentialsException extends Exception {
  constructor() {
    super('Invalid Username or Password', 401)
  }
}