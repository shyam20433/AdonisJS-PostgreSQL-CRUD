import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Task from 'App/Models/Task'

import TaskValidator from 'App/Validators/TaskValidator'
import IdValidator from 'App/Validators/IdValidator'
import UpdateTaskValidator from 'App/Validators/UpdateTaskValidator'
import PatchTaskValidator from 'App/Validators/PatchTaskValidator'
import PaginationValidator from 'App/Validators/PaginationValidator'

import TaskNotFoundException from 'App/Exceptions/TaskNotFoundException'

//import IdValidator from 'App/Validators/IdValidator'

export default class TasksController {

  public async get({ request }: HttpContextContract) {

    try {

      const { page = 1, limit = 5 } =
        await request.validate(PaginationValidator)

      const data = await Task
        .query()
        .orderBy('id', 'desc')
        .paginate(page, limit)

      return data

    } catch (error) {

      throw error

    }
  }

  public async getTask({ request }: HttpContextContract) {

    try {

      const payload = await request.validate(IdValidator)

      const task = await Task.find(payload.id)

      if (!task) {
        throw new TaskNotFoundException()
      }

      return task

    } catch (error) {

      throw error

    }
  }
  public async insertTask({ request }: HttpContextContract) {

    try {

      const data = await request.validate(TaskValidator)

      return await Task.create(data)

    } catch (error) {

      throw error

    }
  }

  public async updateTask({
    request
  }: HttpContextContract) {

    try {

      const payload = await request.validate(IdValidator)

      const data = await request.validate(UpdateTaskValidator)

      const task = await Task.find(payload.id)

      if (!task) {
        throw new TaskNotFoundException()
      }

      task.merge(data)

      await task.save()

      return task

    } catch (error) {

      throw error

    }
  }

  public async patchTask({
    request
  }: HttpContextContract) {

    try {

      const payload = await request.validate(IdValidator)

      const data = await request.validate(PatchTaskValidator)

      const task = await Task.find(payload.id)

      if (!task) {
        throw new TaskNotFoundException()
      }

      task.merge(data)

      await task.save()

      return task

    } catch (error) {

      throw error

    }
  }

  public async deleteTask({
    request
  }: HttpContextContract) {

    try {

      const payload = await request.validate(IdValidator)

      const task = await Task.find(payload.id)

      if (!task) {
        throw new TaskNotFoundException()
      }

      await task.delete()

      return {
        message: 'Task Deleted Successfully'
      }

    } catch (error) {

      throw error

    }
  }
}