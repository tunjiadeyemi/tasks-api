import type { ZodError } from 'zod';

import { config } from 'dotenv';
import { expand } from 'dotenv-expand';
import path from 'node:path';
import { z } from 'zod';

// eslint-disable-next-line node/no-process-env
const NODE_ENV = process.env.NODE_ENV;

expand(config({
  path: path.resolve(
    process.cwd(),
    NODE_ENV === 'test' ? `.env.test` : '.env',
  ),
}));

const EnvSchema = z.object({
  NODE_ENV: z.string().default('development'),
  LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent']),
  PORT: z.coerce.number().default(9999),
  DATABASE_URL: z.string().url(),
  DATABASE_AUTH_TOKEN: z.string().optional(),
}).superRefine((input, ctx) => {
  if (input.NODE_ENV === 'production' && !input.DATABASE_AUTH_TOKEN) {
    if (!input.DATABASE_AUTH_TOKEN) {
      ctx.addIssue({
        code: 'custom',
        expected: 'string',
        received: 'undefined',
        path: ['DATABASE_AUTH_TOKEN'],
        message: 'DATABASE_AUTH_TOKEN is required in production',
      });
    }
  }
});

export type env = z.infer<typeof EnvSchema>;

// eslint-disable-next-line import/no-mutable-exports, ts/no-redeclare
let env: env;

try {
// eslint-disable-next-line node/no-process-env
  env = EnvSchema.parse(process.env);
}
catch (e) {
  const error = e as ZodError;
  console.error('Invalid env');
  console.error(error.flatten().fieldErrors);
  process.exit(1);
}

export default env;
