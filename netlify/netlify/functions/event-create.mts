import type { Context } from "@netlify/functions"
import app from "src/common/config/app";
import checkJWT from "src/common/utils/check_jwt";
import createEvent from "src/controller/event/create_event";

export default async (req: Request, context: Context) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: app.headers });
  }

  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  const isAuthorized = checkJWT(req.headers.get('Authorization'));

  if(!isAuthorized.success) {
    return new Response(JSON.stringify(isAuthorized.data), { headers: app.headers, status: 200 });
  }
  
  const {
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
  } = await req.json();
  return new Response(JSON.stringify(await createEvent({
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
  })), { headers: app.headers, status: 200 });
};

export const config = {
  path: "/event/create"
};