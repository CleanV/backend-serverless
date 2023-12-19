import output from '../../common/utils/output';
import User from '../../common/model/User';
import message from '../../common/config/message';
import OTP from '../../common/model/OTP';
import { DateTime } from 'luxon';
import { hashSync } from 'bcrypt';
import connectDB from 'src/common/utils/mongoose';

export default async function verify({ repeatPassword, password, code }) {
  await connectDB();

  const checkOTP = await OTP.findOne({ code });

  if (!checkOTP) {
    return output(message.dataNotFound, ['code']);
  }

  if (
    DateTime.now() >
    DateTime.fromISO(checkOTP.expiredAt.toString(), { zone: 'utc' })
  ) {
    return output(message.OTPExpired, ['code']);
  }

  if (repeatPassword !== password) {
    return output(message.dataInvalid, ['repeatPassword', 'password']);
  }

  const hashedPass = hashSync(password, 10);

  await User.updateOne(
    { email: checkOTP.email },
    {
      $set: {
        password: hashedPass,
      },
    },
  );

  await OTP.deleteOne({ code });

  return output(message.success, true);
}
