import { Schema, model, Document } from 'mongoose';
import { IUser } from '../interface/model/IUser';

export const User = new Schema(
  {
    name: String,
    email: String,
    phone: String,
    password: String,
    img: String,
    about: String,
    username: String,
    gender: String,
    following: {
      type: [String],
      default: []
    },
    follower: {
      type: [String],
      default: []
    }
  },
  {
    timestamps: true,
  },
);

export default model<IUser & Document>('User', User);
