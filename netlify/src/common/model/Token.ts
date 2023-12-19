import { Schema, model, Document } from 'mongoose';
import { IToken } from '../interface/model/IToken';

export const Token = new Schema(
  {
    userId: String,
    token: String,
  },
  {
    timestamps: true,
  },
);

export default model<IToken & Document>('Token', Token);
