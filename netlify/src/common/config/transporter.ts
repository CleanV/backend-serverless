import { createTransport } from 'nodemailer';
import app from './app';

const transporter = createTransport({
  service: 'gmail',
  auth: {
    user: app.email,
    pass: app.emailPass,
  },
});

export default transporter;
