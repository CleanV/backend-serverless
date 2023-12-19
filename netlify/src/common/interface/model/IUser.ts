export interface IUser {
  _id: string;
  name: string;
  email: string;
  username: string;
  phone: string;
  about: string;
  password: string;
  following: string[],
  follower: string[],
}
