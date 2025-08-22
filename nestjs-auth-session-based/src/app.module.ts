import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';
import { v4 as uuidv4 } from 'uuid';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { SessionsModule } from './modules/sessions/sessions.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        return {
          pinoHttp: {
            level: config.get('LOG_LEVEL') || 'debug', // Or any other config value
            genReqId: (request) =>
              request.headers['x-correlation-id'] || uuidv4(),
            transport: {
              level: 'debug',
              target: 'pino-pretty',
              options: { colorize: true, singleLine: true },
            },
          },
        };
      },
    }),
    AuthModule,
    UsersModule,
    SessionsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
