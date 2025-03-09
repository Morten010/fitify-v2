import Elysia from "elysia";
import { authMiddleware } from "../middleware";

const apiRouter = new Elysia()
  .onBeforeHandle(authMiddleware)
  .get("/test", () => "test protected route");

export default apiRouter;
