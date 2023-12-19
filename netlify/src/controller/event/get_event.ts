import Event from 'src/common/model/Event';
import message from '../../common/config/message';
import User from '../../common/model/User';
import output from '../../common/utils/output';
import connectDB from 'src/common/utils/mongoose';

export default async function getEvent({ 
  eventId,
}) {
  await connectDB();

  const getEvent = await Event.findOne({ _id: eventId });
  
  if (!getEvent) {
    return output(message.dataNotFound, ['eventId']);
  }
  
  const getUser = await User.findById(getEvent.userId).select('img name about');

  const getOtherEvent = await Event.find({ _id: {$ne: eventId} }).sort({createdAt: -1}).limit(5);
  
  if (!getOtherEvent) {
    return output(message.dataNotFound, ['eventId']);
  }

  return output(message.success, {
    event: getEvent,
    user: getUser,
    otherEvent: getOtherEvent
  });
}
