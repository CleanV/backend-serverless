import Event from 'src/common/model/Event';
import message from '../../common/config/message';
import output from '../../common/utils/output';
import connectDB from 'src/common/utils/mongoose';

export default async function saveEvent({ 
  userId,
  unsave,
  eventId,
}) {
  await connectDB();
  
  let updateEvent;
  
  if(!unsave) {
    const event = await Event.findById(eventId);
  
    if(event.savedBy.includes(userId)) {
      return output(message.dataAlreadyExist, ['userId']);
    }

    updateEvent = await Event.findOneAndUpdate({ _id: eventId }, {
      $push: {
        savedBy: userId
      }
    }, {
      new: true,
    });
  } else {
    updateEvent = await Event.findOneAndUpdate({ _id: eventId }, {
      $pull: {
        savedBy: userId
      }
    }, {
      new: true,
    });
  }

  return output(message.success, updateEvent);
}
