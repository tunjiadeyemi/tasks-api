import { defineConfig } from "drizzle-kit";

import env from "@/env";

export default defineConfig({
  out: "./src/db/migrations",
  dialect: "sqlite",
  schema: "./src/db/schema.ts",
  dbCredentials: {
    url: env.DATABASE_URL,
  },

});
