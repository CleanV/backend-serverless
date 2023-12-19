import { compareSync } from 'bcrypt';
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

export default async function login({ email, password }) {
  await connectDB();
  
  const getUser = await User.findOne({ email });
  
  if (!getUser) {
    return output(message.dataNotFound, ['email']);
  }
  
  if (!compareSync(password, getUser.password)) {
    return output(message.dataInvalid, ['password']);
  }
  
  const payload = {
    id: getUser._id,
    email: getUser.email,
    username: getUser.username,
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

  return output(message.success, {
    ...getUser['_doc'],
    refreshToken,
    accessToken,
  });
}
