declare module '@ioc:Adonis/Core/Validator' {
  interface Rules {
    gmailOnly(): Rule
    noAdmin(): Rule
  }
}
