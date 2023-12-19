import message from '../../common/config/message';
import User from '../../common/model/User';
import output from '../../common/utils/output';
import connectDB from 'src/common/utils/mongoose';

export default async function getProfile({ 
  userId,
}) {
  await connectDB();

  const getUser = await User.findById(userId);

  if (!getUser) {
    return output(message.dataNotFound, ['userId']);
  }

  return output(message.success, getUser);
}
