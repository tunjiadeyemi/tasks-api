import { testClient } from 'hono/testing';
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import { afterAll, beforeAll, describe, expect, expectTypeOf, it } from 'vitest';

import createApp, { createTestApp } from '@/lib/create-app';

import router from './tasks.index';

const client = testClient(createApp().route('/', router));

describe('task List', () => {
  beforeAll(async () => {
    execSync('pnpm drizzle-kit push');
  });

  afterAll(async () => {
    fs.rmSync('test.db', { force: true });
  });

  it('responds with an array', async () => {
    const testRouter = createTestApp(router);
    const response = await testRouter.request('/tasks');
    const result = await response.json();

    console.log(result);

    // @ts-expect-error stuff
    expectTypeOf(result).toBeArray();
  });

  it('responds with an array again', async () => {
    const response = await client.tasks.$get();
    const json = await response.json();

    expectTypeOf(json).toBeArray();
  });

  it('validates the id param', async () => {
    const response = await client.tasks[':id'].$get({
      param: { id: 'wat' },
    });

    expect(response.status).toBe(422);
  });

  it('validates the body', async () => {
    const response = await client.tasks.$post({
      json: {
        name: 'Learn Vitest',
        done: false,
      },
    });

    expect(response.status).toBe(200);
  });
});
