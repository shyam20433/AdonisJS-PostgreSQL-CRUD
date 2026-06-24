import { Exception } from '@adonisjs/core/build/standalone'

export default class TransactionFailedException extends Exception {
  constructor() {
    super('Transaction Failed. Rollback Executed', 400)
  }
}