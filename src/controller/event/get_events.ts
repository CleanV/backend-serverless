import Event from 'src/common/model/Event';
import message from '../../common/config/message';
import output from '../../common/utils/output';
import connectDB from 'src/common/utils/mongoose';
import { IEvent } from 'src/common/interface/model/IEvent';

export default async function getEvents({ 
  savedBy = undefined,
  location = undefined,
  title = undefined,
  registeredUserId = undefined,
  userId = undefined,
  exceptBy = undefined,
  page = 1,
  limit = 10
}) {
  await connectDB();

  let result: IEvent[] = [];

  const query = userId ? { userId } : {};

  if(savedBy) {
    query['savedBy'] = { $in: savedBy};
  }
  
  if(registeredUserId) {
    query['registeredUser'] = { $in: registeredUserId};
  }

  if(title) {
    query['title'] = { $regex: title, $options: 'i'};
  }

  if(exceptBy) {
    query['userId'] = {
      $ne: exceptBy
    }
  }

  if(location) {
    query['location'] = { 
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [location[0], location[1]],
        },
        $maxDistance: location[2],
      },
    }
  }

  const events = await Event.find(query)
    .sort({createdAt: -1})
    .skip((page - 1) * limit)
    .limit(limit);

    result = events;
    return output(message.success, result);
}
