import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Task from 'App/Models/Task'

import TaskValidator from 'App/Validators/TaskValidator'
import IdValidator from 'App/Validators/IdValidator'

import UpdateTaskValidator from 'App/Validators/UpdateTaskValidator'
import PatchTaskValidator from 'App/Validators/PatchTaskValidator'




//import IdValidator from 'App/Validators/IdValidator'
export default class TasksController {
  public async get({ request }: HttpContextContract) {

    const page = request.input('page', 1)
    const limit = request.input('limit', 5)
    console.log('PAGE=', page)
    console.log('LIMIT=', limit)
    const data = await Task.query().orderBy('id', 'desc').paginate(page, limit)

    return data
  }

  public async getTask({ request, params }: HttpContextContract) {
    const data = await request.validate({
      schema: new IdValidator({} as HttpContextContract).schema,
      data: params,
    })
    const task = await Task.find(data.id)
    if (!task) {
      return {
        message: 'No task found !',
      }
    }
    return task
  }

  public async insertTask({ request }: HttpContextContract) {
    const data = await request.validate(TaskValidator)

    const result = Task.create(data)
    return result
  }

  public async updateTask({ params, request }: HttpContextContract) {
    const data = await request.validate(UpdateTaskValidator)
    const result = await Task.find(params.id)
    if (!result) {
      return {
        message: 'No task found !',
      }
    }
    result.merge(data)
    await result.save()
    return result
  }

  public async patchTask({ params, request }: HttpContextContract) {
    const data = await request.validate(PatchTaskValidator)
    const result = await Task.find(params.id)
    if (!result) {
      return {
        message: 'No task found !',
      }
    }
    result.merge(data)
    await result.save()
    return result
  }

  public async deleteTask({ request, params }: HttpContextContract) {
    const payload = await request.validate({
      schema: new IdValidator({} as HttpContextContract).schema,
      data: params,
    })

    const task = await Task.find(payload.id)

    if (!task) {
      return {
        message: 'No task found!',
      }
    }

    await task.delete()

    return {
      message: 'Task has been deleted',
    }
  }
}
