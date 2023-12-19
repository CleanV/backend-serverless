import Event from 'src/common/model/Event';
import message from '../../common/config/message';
import output from '../../common/utils/output';
import connectDB from 'src/common/utils/mongoose';

export default async function joinEvent({ 
  userId,
  eventId,
}) {
  await connectDB();

  const event = await Event.findById(eventId);

  if(event.registeredUser.includes(userId)) {
    return output(message.dataAlreadyExist, ['userId']);
  }

  const updateEvent = await Event.findOneAndUpdate({ _id: eventId }, {
    $push: {
      registeredUser: userId
    }
  }, {
    new: true,
  });

  return output(message.success, updateEvent);
}
