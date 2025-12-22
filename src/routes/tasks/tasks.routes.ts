import { createRoute, z } from '@hono/zod-openapi';
import * as HttpStatusCodes from 'stoker/http-status-codes';
import { jsonContent, jsonContentRequired } from 'stoker/openapi/helpers';

import { insertTasksSchema, selectTasksSchema } from '@/db/schema';
import { createErrorSchema } from 'stoker/openapi/schemas';

const tags = ['Tasks'];

export const list = createRoute({
  path: '/tasks',
  method: 'get',
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(z.array(selectTasksSchema), 'List of tasks')
  }
});

export const create = createRoute({
  path: '/tasks',
  method: 'post',
  request: {
    body: jsonContentRequired(insertTasksSchema, 'The task to create')
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(selectTasksSchema, 'List of tasks'),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(insertTasksSchema),
      'The validation error(s)'
    )
  }
});

export type ListRoute = typeof list;

export type CreateRoute = typeof create;
