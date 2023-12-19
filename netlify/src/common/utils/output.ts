import message from '../config/message';

export default function output(
  code = message.internalServerError,
  data = null,
) {
  return {
    message: code,
    data,
  };
}
