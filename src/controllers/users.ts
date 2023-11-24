
import { NextFunction, Request, Response } from 'express'
import mongoose from 'mongoose'
import User from '../db/users'

const createUser = async (req: Request, res: Response, _next: NextFunction): Promise<Response> => {
  const { username, email } = req.body

  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    username,
    email
  })

  return await user
    .save()
    .then((user) => res.status(201).json({ user }))
    .catch((user) => res.status(500).json({ user }))
}

const readUser = async (req: Request, res: Response, _next: NextFunction): Promise<Response> => {
  const userId = req.params.userId

  return await User.findById(userId)
    .then((user) => ((user != null) ? res.status(200).json({ user }) : res.status(404).json({ message: 'not found' })))
    .catch((error) => res.status(500).json({ error }))
}

const readAll = async (_req: Request, res: Response, _next: NextFunction): Promise<Response> => {
  return await User.find()
    .then((users) => res.status(200).json({ users }))
    .catch((error) => res.status(500).json({ error }))
}

const updateUser = async (req: Request, res: Response, _next: NextFunction): Promise<Response> => {
  const userId = req.params.userId

  return await User.findById(userId)
    .then(async (user) => {
      if (user != null) {
        user.set(req.body)

        return await user
          .save()
          .then((user) => res.status(201).json({ user }))
          .catch((error) => res.status(500).json({ error }))
      } else {
        return res.status(404).json({ message: 'not found' })
      }
    })
    .catch((error) => res.status(500).json({ error }))
}

const deleteUser = async (req: Request, res: Response, _next: NextFunction): Promise<Response> => {
  const userId = req.params.userId

  return await User.findByIdAndDelete(userId)
    .then((user) => ((user != null) ? res.status(201).json({ user, message: 'Deleted' }) : res.status(404).json({ message: 'not found' })))
    .catch((error) => res.status(500).json({ error }))
}

export default { createUser, readUser, readAll, updateUser, deleteUser }
