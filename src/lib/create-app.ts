import { Hono } from "hono";
import { etag } from "hono/etag";
import { requestId } from "hono/request-id";

import notFound from "@/middlewares/not-found";
import onError from "@/middlewares/on-error";
import { pinoLogger } from "@/middlewares/pino-logger";

import type { AppBindings } from "./types";

export function createRouter() {
	return new Hono<AppBindings>();
}

export default function createApp() {
	const app = createRouter();
	app.use(requestId());
	app.use(pinoLogger());
	app.use(etag());

	app.notFound(notFound);
	app.onError(onError);
	return app;
}
