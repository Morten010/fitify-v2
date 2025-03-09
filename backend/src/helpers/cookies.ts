import { StatusMap } from "elysia";
import { ElysiaCookie } from "elysia/dist/cookies";
import { HTTPHeaders } from "elysia/dist/types";

// Define the environment variables
const env = process.env.NODE_ENV || "development";

// Enum to handle different environments
enum Env {
  PROD = "production",
  DEV = "development",
}

export function setSessionTokenCookie(
  set: {
    headers: HTTPHeaders;
    status?: number | keyof StatusMap;
    redirect?: string;
    cookie?: Record<string, ElysiaCookie>;
  },
  token: string,
  expiresAt: Date
): void {
  if (env === Env.PROD) {
    // When deployed over HTTPS
    set.headers[
      "set-cookie"
    ] = `session=${token}; HttpOnly; SameSite=Lax; Expires=${expiresAt.toUTCString()}; Path=/; Secure;`;
  } else {
    // When deployed over HTTP (localhost)
    // Removed http only on development because of cookie not being accessible
    set.headers[
      "set-cookie"
    ] = `session=${token}; SameSite=Lax; Expires=${expiresAt.toUTCString()}; Path=/;`;
  }
}

export function deleteSessionTokenCookie(set: {
  headers: HTTPHeaders;
  status?: number | keyof StatusMap;
  redirect?: string;
  cookie?: Record<string, ElysiaCookie>;
}): void {
  if (env === Env.PROD) {
    // When deployed over HTTPS
    set.headers[
      "set-cookie"
    ] = `session=; HttpOnly; SameSite=Lax; Max-Age=0; Path=/; Secure;`;
  } else {
    // When deployed over HTTP (localhost)
    set.headers[
      "set-cookie"
    ] = `session=; HttpOnly; SameSite=Lax; Max-Age=0; Path=/`;
  }
}
