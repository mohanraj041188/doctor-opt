// app/utils/session.server.ts
import { createCookieSessionStorage } from "@remix-run/node";

const sessionSecret = process.env.SESSION_SECRET || "default_secret";

const storage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    secure: process.env.NODE_ENV === "production",
    secrets: [sessionSecret],
    sameSite: "lax",
    path: "/",
    httpOnly: true,
  },
});

export async function getSession(request: Request) {
  const cookie = request.headers.get("Cookie");
  return storage.getSession(cookie);
}

export async function getUserSession(request: Request) {
  const session = await getSession(request);
  return session.get("user"); // Assumes "user" is stored in the session
}

export async function commitSession(session: any) {
  return storage.commitSession(session);
}

export async function destroySession(request: Request) {
  const session = await getSession(request);
  return storage.destroySession(session);
}
