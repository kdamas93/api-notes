import mongoose, { Document, Schema } from 'mongoose'

export interface INote {
  text: string
  userId: Schema.Types.ObjectId
}

export interface INoteModel extends INote, Document {}

const NoteSchema: Schema = new Schema(
  {
    text: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

export default mongoose.model<INoteModel>('Note', NoteSchema)
