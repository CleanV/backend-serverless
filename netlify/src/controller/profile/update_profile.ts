import message from '../../common/config/message';
import User from '../../common/model/User';
import output from '../../common/utils/output';
import connectDB from 'src/common/utils/mongoose';

export default async function updateProfile({ 
  userId,
  set
}) {
  await connectDB();

  const updateUser = await User.findByIdAndUpdate(userId, {
    $set: set,
  }, {
    new: true,
  });

  if (!updateUser) {
    return output(message.dataNotFound, ['eventId']);
  }

  return output(message.success, updateUser);
}
