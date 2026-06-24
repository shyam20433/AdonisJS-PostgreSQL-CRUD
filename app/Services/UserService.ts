import User from 'App/Models/User'

export default class UserService {
  public static async createUser(data: any) {
    data.email = data.email.toLowerCase()
    const exists = await User.findBy('email', data.email)

    if (exists) {
      return {
        message: 'Email already exits',
      }
    }

    return await User.create(data)
  }
}
