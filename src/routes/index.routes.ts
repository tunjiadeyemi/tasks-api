import { createRoute, z } from "@hono/zod-openapi";

import { createRouter } from "@/lib/create-app";

export const router = createRouter()
  .openapi(createRoute({
    method: "get",
    path: "/",
    responses: {
      200: {
        content: {
          "application/json": {
            schema: z.object({
              message: z.string(),
            }),
          },
        },
        description: "Tasks Api Index",
      },
    },
  }), (c) => {
    return c.json({ message: "Hello Hono!" });
  })
;

export default router;
