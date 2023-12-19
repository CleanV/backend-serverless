import connectDB from 'src/common/utils/mongoose';
import message from '../../common/config/message';
import Token from '../../common/model/Token';
import output from '../../common/utils/output';

export default async function logout({ token }) {
  await connectDB();
  
  await Token.deleteOne({ token });

  return output(message.success, true);
}
