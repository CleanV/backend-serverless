import { Schema, model, Document } from 'mongoose';
import { IEvent } from '../interface/model/IEvent';

export const Event = new Schema(
  {
    registeredUser: {
      type: [String],
      default: []
    },
    savedBy: {
      type: [String],
      default: []
    },
    userId: String,
    title: String,
    description: String,
    about: String,
    location: {
      type: {
        type: String,
      },
      coordinates: [Number],
    },
    address: String,
    time: Date,
    benefits: {
      type: [
        {
          title: String,
          icon: String
        }
      ],
      default: []
    },
    limit: {
      type: Number,
      default: 0
    },
    license: String,
    thumbnail: String,
  },
  {
    timestamps: true,
  },
);

Event.index({ location: "2dsphere" });

export default model<IEvent & Document>('Event', Event);
