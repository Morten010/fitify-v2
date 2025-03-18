import Elysia, { error, t } from "elysia";
import { authMiddleware } from "../middleware";
import { getUser } from "../helpers/auth";
import { db } from "../db";
import { exerciseTable, workoutDaysTable, workoutTable } from "../db/schema";
import { and, eq } from "drizzle-orm";

const apiRouter = new Elysia()
  .onBeforeHandle(authMiddleware)
  .post(
    "/workout",
    async ({ body: workout, cookie }) => {
      const user = await getUser(cookie);
      await db.transaction(async (tx) => {
        const workoutResult = await tx
          .insert(workoutTable)
          .values({
            userId: user!.id,
            description: workout.description || "",
            name: workout.name,
            public: false,
            isCopied: false,
          })
          .$returningId();

        const workoutId = workoutResult[0].id;

        for (const day of workout.workoutDays) {
          const dayRes = await db
            .insert(workoutDaysTable)
            .values({
              workoutId,
              dayName: day.name,
            })
            .$returningId();

          const dayId = dayRes[0].id;

          for (const exercise of day.exercises) {
            await db.insert(exerciseTable).values({
              name: exercise.name,
              reps: exercise.reps,
              sets: exercise.sets,
              workoutDayId: dayId,
            });
          }
        }
      });
      // Insert everything at once maybe do a transaction
      // Mysql schema might need changes
      // pass user from middleware

      return workout;
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
  )
  .get("/workout", async ({ cookie }) => {
    const user = await getUser(cookie);

    if (!user) {
      return error(401, "Unauthorized Access: Token is missing");
    }

    return await db.query.workoutTable.findMany({
      where: eq(workoutTable.userId, user?.id),
    });
  })
  .get("/workout/:id", async ({ cookie, params: { id: workoutId } }) => {
    const user = await getUser(cookie);

    if (!user) {
      return error(401, "Unauthorized Access: Token is missing");
    }

    return await db.query.workoutTable.findFirst({
      where: and(
        eq(workoutTable.userId, user?.id),
        eq(workoutTable.id, parseInt(workoutId))
      ),
      with: {
        days: {
          with: {
            exercises: {
              with: {
                weights: true,
              },
            },
          },
        },
      },
    });
  });

export default apiRouter;
