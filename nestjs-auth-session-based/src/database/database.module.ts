import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { DATABASE_CONNECTION } from './database-connection';
// ADD SCHEMA IMPORTS HERE
import { sessionTable } from '@/modules/auth/infrastructure/models/schema';
import { UserTable } from '@/modules/users/infrastructure/models/schema';

@Module({
  providers: [
    {
      provide: DATABASE_CONNECTION,
      useFactory: async (configService: ConfigService) => {
        const pool = new Pool({
          connectionString: configService.getOrThrow<string>('DATABASE_URL'),
        });
        return drizzle(pool, {
          schema: {
            // ADD SCHEMA OBJECTS HERE
            session: sessionTable,
            users: UserTable,
          },
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: [DATABASE_CONNECTION],
})
export class DatabaseModule {}
