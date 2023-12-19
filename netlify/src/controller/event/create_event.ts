import Event from 'src/common/model/Event';
import message from '../../common/config/message';
import User from '../../common/model/User';
import output from '../../common/utils/output';
import connectDB from 'src/common/utils/mongoose';
import { DateTime } from 'luxon';

export default async function createEvent({ 
  userId,
  title,
  description,
  about,
  coordinates: [long, lat],
  address,
  time,
  benefits,
  limit,
  license,
  thumbnail
}) {
  await connectDB();

  const getUser = await User.findOne({ _id: userId });
  
  if (!getUser) {
    return output(message.dataNotFound, ['userId']);
  }

  const newEvent = await new Event({
    userId, 
    title, 
    description,
    about, 
    location: {
      type: 'Point',
      coordinates: [long, lat]
    },
    address,
    time: DateTime.fromISO(time).toJSDate(),
    benefits,
    limit,
    license,
    thumbnail
  }).save();

  return output(message.success, newEvent);
}
