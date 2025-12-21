import type { AppRouteHandler } from "@/lib/types";

import type { ListRoute } from "./tasks.routes";

export const list: AppRouteHandler<ListRoute> = (c) => {
  c.var.logger.info("Listing tasks");
  return c.json([
    {
      name: "Learn hono",
      done: false,
    },
  ]);
};
