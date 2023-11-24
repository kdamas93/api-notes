import express from 'express'
import controller from '../controllers/notes'
import { Schemas, ValidateJoi } from '../middleware/joi'

const router = express.Router()

router.post('/create', ValidateJoi(Schemas.notes.create), controller.createNote)
router.get('/get/:noteId', controller.readNote)
router.get('/get', controller.readAll)
router.patch('/update/:noteId', ValidateJoi(Schemas.user.update), controller.updateNote)
router.delete('/delete/:noteId', controller.deleteNote)

export default router
