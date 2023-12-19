import { Schema, model, Document } from 'mongoose';
import { IBenefit } from '../interface/model/IBenefit';

export const Benefit = new Schema(
  {
    title: String,
    icon: String,
  },
  {
    timestamps: true,
  },
);

export default model<IBenefit & Document>('Benefit', Benefit);
