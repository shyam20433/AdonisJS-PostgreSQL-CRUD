try {
  console.log('Inside try block')

  const a = 10
  const b = 2

  const result = a / b

  console.log('Result =', result)

} catch (error) {
  console.log('Caught Error')

} finally {
  console.log('Finally block executed')
}