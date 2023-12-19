import { Schema, model, Document } from 'mongoose';
import { IOTP } from '../interface/model/IOTP';

export const OTP = new Schema(
  {
    code: String,
    email: String,
    expiredAt: Date,
  },
  {
    timestamps: true,
  },
);

export default model<IOTP & Document>('OTP', OTP);
