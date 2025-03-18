import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { cors } from "@elysiajs/cors";
import { db } from "./db";
import { eq, lt, or } from "drizzle-orm";
import { sessionTable } from "./db/schema";
import "dotenv/config";
import { Logestic } from "logestic";

// routes
import authRouter from "./routers/auth";
import apiRouter from "./routers/api";
import cron from "@elysiajs/cron";

const app = new Elysia()
  .use(
    swagger({
      path: "/docs",
    })
  )
  .use(Logestic.preset("fancy"))
  .use(
    cors({
      origin: [
        "http://localhost",
        "https://localhost",
        "localhost",
        "http://fitify.mortenra.com",
        "https://fitify.mortenra.com",
        "*.mortenra.com",
      ],
    })
  )
  .use(
    cron({
      name: "delete old sessions",
      pattern: "0 0 * * *",
      async run() {
        const sessions = await db.query.sessionTable.findMany({
          where: lt(sessionTable.expiresAt, new Date()),
        });
        const deleteIds = sessions.map((session) =>
          eq(sessionTable.id, session.id)
        );
        await db.delete(sessionTable).where(or(...deleteIds));
      },
    })
  )

  // routers
  .use(authRouter)
  .use(apiRouter)

  .listen(process.env.PORT || 3001);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
