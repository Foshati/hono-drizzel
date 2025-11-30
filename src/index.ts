import { cors } from "hono/cors";
import { auth } from "./lib/auth";
import createApp from "./lib/create-app";
import { todos } from "./routes/todos.routes";

const app = createApp();

app.use(
  "/api/auth/*", // or replace with "*" to enable cors for all routes
  cors({
    origin: "http://localhost:3000", // replace with your origin
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["POST", "GET", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  })
);
app.on(["POST", "GET"], "/api/auth/**", (c) => auth.handler(c.req.raw));

import { benchmarkRoutes } from "./routes/benchmark.routes";

// ... existing imports

// route
app.route("/api/todos", todos);
app.route("/api/benchmark", benchmarkRoutes);
app.get("/", (c) => {
  return c.text("Hono is healthy");
});

// ... existing code ...

// ... existing imports

// route
app.route("/api/todos", todos);
app.route("/api/benchmark", benchmarkRoutes);
app.get("/", (c) => {
  return c.text("Hono is healthy");
});

export default app;
