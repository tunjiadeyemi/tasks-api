import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

export const tasks = sqliteTable('users_table', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  done: integer('done', { mode: 'boolean' }).notNull().default(false),
  name: text('name').notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).default(sql`(unixepoch())`),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(unixepoch())`)
});

export const selectTasksSchema = createSelectSchema(tasks);

export const insertTasksSchema = createInsertSchema(tasks, {
  name: (schema) => schema.min(1).max(200)
})
  .required({
    done: true
  })
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true
  });
