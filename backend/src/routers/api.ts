import Elysia, { t } from "elysia";
import { authMiddleware } from "../middleware";

const apiRouter = new Elysia().onBeforeHandle(authMiddleware).post(
  "/workout",
  ({ body }) => {
    console.log(body);

    // Insert everything at once maybe do a transaction
    // Mysql schema might need changes
    // pass user from middleware

    return body;
  },
  {
    body: t.Object({
      name: t.String(),
      description: t.Optional(t.String()),
      workoutDays: t.Array(
        t.Optional(
          t.Object({
            name: t.String(),
            exercises: t.Array(
              t.Optional(
                t.Object({
                  name: t.String(),
                  reps: t.Number(),
                  sets: t.Number(),
                  videoUrl: t.Optional(t.String()),
                })
              )
            ),
          })
        )
      ),
    }),
  }
);

export default apiRouter;
