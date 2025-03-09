import { Context, error } from "elysia";
import { validateSessionToken } from "../helpers/auth";
import { deleteSessionTokenCookie } from "../helpers/cookies";

export const authMiddleware = async (ctx: Context) => {
  const sessionCookie = ctx.cookie["session"];

  if (!sessionCookie.value) {
    deleteSessionTokenCookie(ctx.set);
    return error(401, "Unauthorized Access: Token is missing");
  }

  const { session, user } = await validateSessionToken(sessionCookie.value);

  if (!session || !user) {
    deleteSessionTokenCookie(ctx.set);
    return error(401, "Unauthorized Access: Token is missing");
  }

  return;
};
