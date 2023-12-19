import { IBenefit } from "./IBenefit";

export interface IEvent {
  _id: string;
  userId: string,
  registeredUser: string[];
  title: string;
  description: string;
  about: string;
  location: {
    coordinates: number[];
  };
  savedBy: string[];
  address: string;
  time: Date;
  benefits: IBenefit[];
  limit: number;
  license: string;
  thumbnail: string;
}
