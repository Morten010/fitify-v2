import Elysia, { error, t } from "elysia";
import { db } from "../db";
import { userTable } from "../db/schema";
import { createSession, generateSessionToken } from "../helpers/auth";
import {
  deleteSessionTokenCookie,
  setSessionTokenCookie,
} from "../helpers/cookies";
import { eq, or } from "drizzle-orm";

const authRouter = new Elysia()
  .post(
    "/signin",
    async ({ body: { password, username }, set }) => {
      console.log("hit");

      try {
        const user = await db.query.userTable.findFirst({
          where: eq(userTable.username, username),
        });

        if (!user) return error(500, "Password or username is wrong");

        const passwordMatch = await Bun.password.verify(
          password,
          user.password
        );

        if (!passwordMatch) return error(500, "Password or username is wrong");

        // create user session
        const token = generateSessionToken();
        const session = await createSession(token, user.id);

        // Set user session
        setSessionTokenCookie(set, token, session.expiresAt);

        return "Successfully logged in";
      } catch (err) {
        return error(500, "Password or username is wrong");
      }
    },
    {
      body: t.Object({
        username: t.String({
          minLength: 2,
          error: "Username must be at least 2 characters.",
        }),
        password: t.String({
          minLength: 6,
          error: "password must be at least 6 characters.",
        }),
      }),
    }
  )
  .post("/signout", ({ set }) => {
    deleteSessionTokenCookie(set);
    return "Successfully signed out";
  })
  .post(
    "/signup",
    async ({ body: { password, ...restOfUser }, set }) => {
      try {
        // Check if user exist
        const existingUser = await db.query.userTable.findFirst({
          where: or(
            eq(userTable.email, restOfUser.email),
            eq(userTable.username, restOfUser.username)
          ),
        });

        if (existingUser) return error(409, "User already exists");

        // Hash and salt password
        const hashedPassword = await Bun.password.hash(password, {
          algorithm: "argon2id",
        });

        // insert user with hashed password
        const insertedUsers = await db
          .insert(userTable)
          .values({
            ...restOfUser,
            password: hashedPassword,
          })
          .$returningId();
        const userId = insertedUsers[0].id;

        // create user session
        const token = generateSessionToken();
        const session = await createSession(token, userId);

        // Set user session
        setSessionTokenCookie(set, token, session.expiresAt);

        return "Successfully created user";
      } catch (err) {
        return error(
          500,
          "Failed to create user try again or come back later."
        );
      }
    },
    {
      body: t.Object({
        username: t.String({
          minLength: 2,
          error: "Username must be at least 2 characters.",
        }),
        email: t.String({
          format: "email",
          error: "Invalid email",
        }),
        password: t.String({
          minLength: 6,
          error: "password must be at least 6 characters.",
        }),
      }),
    }
  );

export default authRouter;
