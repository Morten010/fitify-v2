import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { cors } from "@elysiajs/cors";
import "dotenv/config";

// routes
import authRouter from "./routers/auth";
import apiRouter from "./routers/api";

const app = new Elysia()
  .use(
    swagger({
      path: "/docs",
    })
  )
  .use(
    cors({
      origin: /^http:\/\/localhost(:\d+)?$/,
    })
  )

  // routers
  .use(authRouter)
  .use(apiRouter)

  .listen(process.env.PORT || 3001);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
