import app from '../../common/config/app';
import message from '../../common/config/message';
import User from '../../common/model/User';
import output from '../../common/utils/output';
import { DateTime } from 'luxon';
import { randomUUID } from 'crypto';
import Token from '../../common/model/Token';

import pkg from 'jsonwebtoken';
import connectDB from 'src/common/utils/mongoose';
const { sign } = pkg;

export default async function refresh({ token }) {
  await connectDB();
  
  const getToken = await Token.findOne({ token });

  if (!getToken) {
    return output(message.dataNotFound, ['token']);
  }

  const getUser = await User.findById(getToken.userId);

  if (!getUser) {
    return output(message.dataInvalid, ['token']);
  }

  const payload = {
    email: getUser.email,
    username: getUser.username,
    id: getUser._id,
  };

  const accessToken = sign(
    {
      ...payload,
      iat: DateTime.now().toUnixInteger(),
    },
    app.JWTUser,
    {
      expiresIn: '10m',
      algorithm: 'HS256',
    },
  );

  const refreshToken: string = randomUUID();

  await new Token({
    token: refreshToken,
    userId: getUser._id,
  }).save();

  await Token.deleteOne({ token });

  return output(message.success, {
    id: getUser._id,
    email: getUser.email,
    username: getUser.username,
    refreshToken,
    accessToken,
  });
}
