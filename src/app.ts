import 'dotenv/config';

import type { PinoLogger } from "hono-pino";

import { OpenAPIHono } from "@hono/zod-openapi";
import { onError } from "stoker/middlewares";
import notFound from "stoker/middlewares/not-found";
import { honoPinoLogger } from "./middlewares/pino-logger.js";

interface AppBindings {
  Variables: {
    logger: PinoLogger;
  };
}

export const app = new OpenAPIHono<AppBindings>();
app.use(honoPinoLogger());

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/error", (c) => {
  c.status(422);
  c.var.logger.debug("This is an info log before error");
  throw new Error("on no!");
});

app.onError(onError);

app.notFound(notFound);
