import type { Context } from "@netlify/functions"
import app from "src/common/config/app";
import checkJWT from "src/common/utils/check_jwt";
import getQueryParams from "src/common/utils/get_query_params";
import getEvents from "src/controller/event/get_events";

export default async (req: Request, context: Context) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: app.headers });
  }

  if (req.method !== "GET") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  
  const params = getQueryParams(req.url);
  
  const savedBy = params.savedBy;
  const exceptBy = params.exceptBy;
  const userId = params.userId;
  const title = params.title;
  const registeredUserId = params.registeredUserId;
  const page = params.page;
  const limit = params.limit;
  let location = undefined;
  
  if(params.location) {
    location = params.location.split(',');
  }

  if(limit == '6') {
    return new Response(JSON.stringify(await getEvents({
      savedBy,
      location,
      title,
      exceptBy,
      registeredUserId,
      userId,
      page,
      limit
    })), { headers: app.headers, status: 200 });
  }
  
  const isAuthorized = checkJWT(req.headers.get('Authorization'));

  if(!isAuthorized.success) {
    return new Response(JSON.stringify(isAuthorized.data), { headers: app.headers, status: 200 });
  }

  return new Response(JSON.stringify(await getEvents({
    savedBy,
    location,
    title,
    exceptBy,
    registeredUserId,
    userId,
    page,
    limit
  })), { headers: app.headers, status: 200 });
};

export const config = {
  path: "/event/explore"
};