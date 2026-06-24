import { validator } from '@ioc:Adonis/Core/Validator'

validator.rule('gmailOnly', (value, _, options) => {
  if (typeof value !== 'string') {
    return
  }

  if (!value.endsWith('@gmail.com')) {
    options.errorReporter.report(
      options.pointer,
      'gmailOnly',
      'gmailOnly validation failed',
      options.arrayExpressionPointer
    )
  }
})

validator.rule('noAdmin', (value, _, options) => {
  if (typeof value !== 'string') {
    return
  }

  if (value.toLowerCase().includes('admin')) {
    options.errorReporter.report(
      options.pointer,
      'noAdmin',
      'noAdmin validation failed',
      options.arrayExpressionPointer
    )
  }
})
