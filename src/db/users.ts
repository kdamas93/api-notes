import mongoose, { Document, Schema } from 'mongoose'

export interface IUser {
  email: string
  username: string
  name: string
  lastname: string
}

export interface IUserModel extends IUser, Document {}

const UserSchema: Schema = new Schema(
  {
    email: { type: String, required: true },
    username: { type: String, required: true }
  }
)

export default mongoose.model<IUserModel>('User', UserSchema)
