import { Hono } from "hono";
import { tbValidator } from "@hono/typebox-validator";
import { Type } from "@sinclair/typebox";

const benchmarkRoutes = new Hono();

const createTodoSchema = Type.Object({
  title: Type.String(),
  description: Type.String(),
});

benchmarkRoutes.post("/todos", tbValidator("json", createTodoSchema), (c) => {
  const body = c.req.valid("json");
  return c.json({
    success: true,
    data: body,
    timestamp: Date.now(),
  });
});

export { benchmarkRoutes };