import { OpenAPIHono } from "@hono/zod-openapi";
import { onError, serveEmojiFavicon } from "stoker/middlewares";
import notFound from "stoker/middlewares/not-found";

import { honoPinoLogger } from "@/middlewares/pino-logger.js";

import type { AppBindings } from "./types";

export default function createApp() {
  const app = new OpenAPIHono<AppBindings>({
    strict: false,
  });
  app.use(serveEmojiFavicon("🐐"));
  app.use(honoPinoLogger());

  app.onError(onError);

  app.notFound(notFound);

  return app;
}
