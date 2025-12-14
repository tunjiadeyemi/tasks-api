import { OpenAPIHono } from "@hono/zod-openapi";
import { onError, serveEmojiFavicon } from "stoker/middlewares";
import notFound from "stoker/middlewares/not-found";
import { defaultHook } from "stoker/openapi";

import { honoPinoLogger } from "@/middlewares/pino-logger.js";

import type { AppBindings } from "./types";

export function createRouter() {
  return new OpenAPIHono<AppBindings>({
    strict: false,
    defaultHook,
  });
}

export default function createApp() {
  const app = createRouter();
  app.use(serveEmojiFavicon("🐐"));
  app.use(honoPinoLogger());

  app.onError(onError);

  app.notFound(notFound);

  return app;
}
