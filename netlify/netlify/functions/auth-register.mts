import type { Context } from "@netlify/functions"
import app from "src/common/config/app";
import register from "src/controller/auth/register";

export default async (req: Request, context: Context) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: app.headers });
  }

  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }
  
  const {email, username} = await req.json();
  return new Response(JSON.stringify(await register({email, username, password: ""})), { headers: app.headers, status: 200 });
};

export const config = {
  path: "/auth/register"
};