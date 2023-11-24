import Joi, { ObjectSchema } from 'joi'
import { NextFunction, Request, Response } from 'express'
import { IUser } from '../db/users'
import Logging from '../library/logging'
import { INote } from 'db/notes'

export const ValidateJoi = (schema: ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body)
      next()
    } catch (error) {
      Logging.error(error)

      return res.status(422).json({ error })
    }
  }
}

export const Schemas = {
  user: {
    create: Joi.object<IUser>({
      username: Joi.string().required(),
      email: Joi.string().required()
    }),
    update: Joi.object<IUser>({
      username: Joi.string().required(),
      email: Joi.string().required()
    })
  },
  notes: {
    create: Joi.object<INote>({
      text: Joi.string().required(),
      userId: Joi.string().required()
    }),
    update: Joi.object<INote>({
      text: Joi.string().required(),
      userId: Joi.string().required()
    })
  }
}
