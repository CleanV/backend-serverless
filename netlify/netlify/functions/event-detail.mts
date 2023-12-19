import type { Context } from "@netlify/functions"
import app from "src/common/config/app";
import checkJWT from "src/common/utils/check_jwt";
import getQueryParams from "src/common/utils/get_query_params";
import getEvent from "src/controller/event/get_event";

export default async (req: Request, context: Context) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: app.headers });
  }

  if (req.method !== "GET") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  // const isAuthorized = checkJWT(req.headers.get('Authorization'));

  // if(!isAuthorized.success) {
  //   return new Response(JSON.stringify(isAuthorized.data), { headers: app.headers, status: 200 });
  // }
  
  const eventId = getQueryParams(req.url).eventId;

  return new Response(JSON.stringify(await getEvent({
    eventId
  })), { headers: app.headers, status: 200 });
};

export const config = {
  path: "/event/detail"
};