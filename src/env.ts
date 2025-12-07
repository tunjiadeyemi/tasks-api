import { config } from "dotenv";
import { expand } from "dotenv-expand";
import { z } from "zod";

expand(config());

const EnvSchema = z.object({
  NODE_ENV: z.string().default("development"),
  LOG_LEVEL: z.enum(["fatal", "error", "warn", "info", "debug", "trace"]),
  PORT: z.coerce.number().default(9999),
});

// eslint-disable-next-line node/no-process-env
const env = EnvSchema.parse(process.env);

export default env;
