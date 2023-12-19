import type { Context } from "@netlify/functions"
import app from "src/common/config/app";
import checkJWT from "src/common/utils/check_jwt";
import updateProfile from "src/controller/profile/update_profile";

export default async (req: Request, context: Context) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: app.headers });
  }

  if (req.method !== "PUT") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  const isAuthorized = checkJWT(req.headers.get('Authorization'));

  if(!isAuthorized.success) {
    return new Response(JSON.stringify(isAuthorized.data), { headers: app.headers, status: 200 });
  }
  
  const {
    userId,
    set
  } = await req.json();
  return new Response(JSON.stringify(await updateProfile({
    userId, 
    set
  })), { headers: app.headers, status: 200 });
};

export const config = {
  path: "/profile/update"
};