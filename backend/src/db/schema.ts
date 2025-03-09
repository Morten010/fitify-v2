import {
  timestamp,
  primaryKey,
  varchar,
  serial,
  boolean,
  mysqlTable,
  int,
  datetime,
} from "drizzle-orm/mysql-core";
import { InferSelectModel, relations } from "drizzle-orm";

export const userTable = mysqlTable("user", {
  id: int("id").primaryKey().autoincrement(),
  email: varchar("email", { length: 255 }).notNull(),
  username: varchar("username", { length: 256 }).notNull(),
  password: varchar("password", { length: 256 }).notNull(),
});

export const sessionTable = mysqlTable("session", {
  id: varchar("id", {
    length: 255,
  }).primaryKey(),
  userId: int("user_id")
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),
  expiresAt: datetime("expires_at").notNull(),
});

export type User = InferSelectModel<typeof userTable>;
export type Session = InferSelectModel<typeof sessionTable>;

// workouts
export const workoutTable = mysqlTable("workout", {
  id: serial("id").primaryKey().notNull(),
  name: varchar("text", { length: 255 }).notNull(),
  description: varchar("description", { length: 256 }).notNull(),
  public: boolean("public").default(false).notNull(),
  isCopied: boolean("isCopied").default(false).notNull(),
  userId: varchar("userId", { length: 255 }).notNull(),
});

export const workoutsRelations = relations(workoutTable, ({ one, many }) => ({
  user: one(userTable, {
    fields: [workoutTable.userId],
    references: [userTable.id],
  }),
  days: many(workoutDaysTable),
}));

export type SelectWorkouts = typeof workoutTable.$inferSelect;
export type InsertWorkouts = typeof workoutTable.$inferInsert;

export const workoutDaysTable = mysqlTable("workoutDays", {
  id: serial("id").primaryKey().notNull(),
  workoutId: int("workoutId"),
  dayName: varchar("dayName", { length: 255 }).notNull(),
});

export const workoutDaysRelations = relations(
  workoutDaysTable,
  ({ one, many }) => ({
    workout: one(workoutTable, {
      fields: [workoutDaysTable.workoutId],
      references: [workoutTable.id],
    }),
    exercises: many(exerciseTable),
  })
);

export type SelectWorkoutDays = typeof workoutDaysTable.$inferSelect;
export type InsertWorkoutDays = typeof workoutDaysTable.$inferInsert;

export const exerciseTable = mysqlTable("exercises", {
  id: serial("id").primaryKey().notNull(),
  workoutDayId: int("workoutId").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  description: varchar("description", { length: 255 }),
  reps: int("reps").notNull(),
  sets: varchar("sets", { length: 255 }).notNull(),
  video: varchar("video", { length: 255 }),
});
export const exercisesRelations = relations(exerciseTable, ({ one, many }) => ({
  workoutDay: one(workoutDaysTable, {
    fields: [exerciseTable.workoutDayId],
    references: [workoutDaysTable.id],
  }),
  weights: many(weightTable),
}));

export type SelectExercises = typeof exerciseTable.$inferSelect;
export type InsertExercises = typeof exerciseTable.$inferInsert;

export const weightTable = mysqlTable("weights", {
  id: serial("id").primaryKey().notNull(),
  weight: int("weight").notNull(),
  exerciseId: int("exerciseId").notNull(),
  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
});

export const weightsRelations = relations(weightTable, ({ one }) => ({
  exercise: one(exerciseTable, {
    fields: [weightTable.exerciseId],
    references: [exerciseTable.id],
  }),
}));

export type SelectWeights = typeof weightTable.$inferSelect;
export type InsertWeights = typeof weightTable.$inferInsert;
