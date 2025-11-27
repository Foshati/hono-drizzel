import { auth } from "./lib/auth";
import createApp from "./lib/create-app";

const app = createApp();

app
	.on(["POST", "GET"], "/api/auth/*", (c) => auth.handler(c.req.raw))
	.get("/", (c) => {
		return c.text("Hello Hono!");
	});

export default app;
