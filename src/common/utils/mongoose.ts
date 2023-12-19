import { connect } from 'mongoose';
import app from '../config/app';

export default async function connectDB() {
  try {
    await connect(app.dbUrl);
    console.log('Mongoose ');
  } catch (error) {
    console.error(error);
    setTimeout(connectDB, 1000);
  }
}
