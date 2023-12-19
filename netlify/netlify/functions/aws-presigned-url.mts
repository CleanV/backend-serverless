import type { Context } from "@netlify/functions"
import app from "src/common/config/app";
import checkJWT from "src/common/utils/check_jwt";
import getPresignedUrl from "src/controller/aws/get_presigned_url";

export default async (req: Request, context: Context) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: app.headers });
  }

  if (req.method !== "GET") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  const isAuthorized = checkJWT(req.headers.get('Authorization'));

  if(!isAuthorized.success) {
    return new Response(JSON.stringify(isAuthorized.data), { headers: app.headers, status: 200 });
  }
  
  return new Response(JSON.stringify(await getPresignedUrl({})), { headers: app.headers, status: 200 });
};

export const config = {
  path: "/aws/presigned-url"
};