import output from '../../common/utils/output';
import User from '../../common/model/User';
import message from '../../common/config/message';
import { randomUUID } from 'crypto';
import OTP from '../../common/model/OTP';
import sendEmailVerification from '../../common/utils/email/send_email_verification';
import { DateTime } from 'luxon';
import connectDB from 'src/common/utils/mongoose';

export default async function register({ username, email, password }) {
  await connectDB();

  const checkEmail = await User.findOne({ email });

  if (checkEmail) {
    return output(message.dataAlreadyExist, ['email']);
  }

  await new User({
    username,
    email,
    password,
  }).save();

  const code = randomUUID();

  await new OTP({
    code,
    email,
    expiredAt: DateTime.now().plus({ minute: 10 }).toUTC().toJSDate(),
  }).save();

  sendEmailVerification(email, code);

  return output(message.success, {
    username,
    email,
  });
}
