import message from '../config/message';
import app from '../config/app';
import output from './output';
import pkg from 'jsonwebtoken';

const { TokenExpiredError, verify } = pkg;

export default function checkJWT(jwt: string) {
  let payload: string | any;

  const token = jwt.replace('Bearer ', '');

  try {
    try {
      payload = verify(token, app.JWTUser);
    } catch (error) {
      payload = verify(token, app.JWTUser);
    }
  } catch (error: any) {
    if (error instanceof TokenExpiredError) {
      return {
        success: false,
        data: output(message.tokenExpired),
      };
    }

    return {
      success: false,
      data: output(message.needReauthenticate),
    };
  }
  
  if (typeof payload !== 'string') {
    try {
      return {
        success: true,
        data: payload,
      };
    } catch (err: any) {

      return {
        success: false,
        data: output(message.needReauthenticate),
      };
    }
  }

  if (payload === 'TokenExpiredError') {
    return {
      success: false,
      data: output(message.tokenExpired),
    };
  }
  
  return {
    success: false,
    data: output(message.needReauthenticate),
  };
}
