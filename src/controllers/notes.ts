import { NextFunction, Request, Response } from 'express'
import mongoose from 'mongoose'
import Note from '../db/notes'

const createNote = async (req: Request, res: Response, _next: NextFunction): Promise<Response> => {
  const { userId, text } = req.body

  const note = new Note({
    _id: new mongoose.Types.ObjectId(),
    userId,
    text
  })

  return await note
    .save()
    .then((note) => res.status(201).json({ note }))
    .catch((error) => res.status(500).json({ error }))
}

const readNote = async (req: Request, res: Response, _next: NextFunction): Promise<Response> => {
  const noteId = req.params.noteId

  return await Note.findById(noteId)
    .populate('author')
    .then((note) => ((note != null) ? res.status(200).json({ note }) : res.status(404).json({ message: 'not found' })))
    .catch((error) => res.status(500).json({ error }))
}

const readAll = async (_req: Request, res: Response, _next: NextFunction): Promise<Response> => {
  return await Note.find()
    .then((notes) => res.status(200).json({ notes }))
    .catch((error) => res.status(500).json({ error }))
}

const updateNote = async (req: Request, res: Response, _next: NextFunction): Promise<Response> => {
  const noteId = req.params.noteId

  return await Note.findById(noteId)
    .then(async (note) => {
      if (note != null) {
        note.set(req.body)

        return await note
          .save()
          .then((note) => res.status(201).json({ note }))
          .catch((error) => res.status(500).json({ error }))
      } else {
        return res.status(404).json({ message: 'not found' })
      }
    })
    .catch((error) => res.status(500).json({ error }))
}

const deleteNote = async (req: Request, res: Response, _next: NextFunction): Promise<Response> => {
  const noteId = req.params.noteId

  return await Note.findByIdAndDelete(noteId)
    .then((note) => ((note != null) ? res.status(201).json({ note, message: 'Deleted' }) : res.status(404).json({ message: 'not found' })))
    .catch((error) => res.status(500).json({ error }))
}

export default { createNote, readNote, readAll, updateNote, deleteNote }
