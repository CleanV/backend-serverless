import type { Context } from "@netlify/functions"
import app from "src/common/config/app";
import logout from "src/controller/auth/logout";

export default async (req: Request, context: Context) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: app.headers });
  }

  if (req.method !== "DELETE") {
    return new Response("Method Not Allowed", { status: 405 });
  }
  
  const { token } = await req.json();
  return new Response(JSON.stringify(await logout({token})), { headers: app.headers, status: 200 });
};

export const config = {
  path: "/auth/logout"
};