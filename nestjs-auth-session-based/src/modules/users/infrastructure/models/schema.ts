import { sql } from 'drizzle-orm';
import {
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from 'drizzle-orm/pg-core';

export const UserTable = pgTable(
  'users',
  {
    id: uuid('id')
      .default(sql`gen_random_uuid()`)
      .primaryKey(),
    // other fields here
    email: text().unique(),
    password: text(),
    createdAt: timestamp().defaultNow(),
    updatedAt: timestamp(),
  },
  (table) => [uniqueIndex('email_idx').on(table.email)],
);
