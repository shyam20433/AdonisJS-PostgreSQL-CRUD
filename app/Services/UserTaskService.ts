import Database from '@ioc:Adonis/Lucid/Database'
import User from 'App/Models/User'
import Task from 'App/Models/Task'
import TransactionFailedException from 'App/Exceptions/TransactionFailedException'

export default class UserTaskService {

  public static async createUserAndTask(data: any) {

    const trx = await Database.transaction()

    try {

      const user = await User.create({
        name: data.name,
        email: data.email
      }, {
        client: trx
      })

      const task = await Task.create({
        title: data.title,
        description: data.description,
        status: data.status,
        userId: user.id
      }, {
        client: trx
      })

      await trx.commit()

      return {
        message: 'Success',
        user,
        task
      }

    } catch (error) {

      await trx.rollback()

      throw new TransactionFailedException()
    }
  }
}

/* 
import Database from '@ioc:Adonis/Lucid/Database'
import User from 'App/Models/User'
import Task from 'App/Models/Task'

export default class UserTaskService {

    public static async createUserAndTask(data: any) {


        const trx = await Database.transaction()

const exists = await User.findBy(
  'email',
  data.email
)

if (exists) {

  await trx.rollback()

  return {
    message: 'Rollback Executed'
  }
}

const user = await User.create({
  name: data.name,
  email: data.email
}, {
  client: trx
})

const task = await Task.create({
  title: data.title,
  description: data.description,
  status: data.status,
  userId: user.id
}, {
  client: trx
})

await trx.commit()

return {
  message: 'Success',
  user,
  task
}
        /* const exists = await User.findBy(
            'email',
            data.email
        )

        if (exists) {
            return {
                message: 'Email Already Exists'
            }
        }

        const trx = await Database.transaction()

        const user = await User.create({
            name: data.name,
            email: data.email
        }, {
            client: trx
        })

        const task = await Task.create({
            title: data.title,
            description: data.description,
            status: data.status,
            userId: user.id
        }, {
            client: trx
        })

        await trx.commit()

        return {
            message: 'Success',
            user,
            task
        } // comes 
    }
}*/