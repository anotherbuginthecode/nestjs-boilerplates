import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { SessionService } from '../modules/sessions/applications/session.service';
import { Request } from 'express';

declare module 'express' {
  interface Request {
    session?: { id?: string };
    user?: any;
  }
}

@Injectable()
export class SessionAuthGuard implements CanActivate {
  constructor(private readonly sessionService: SessionService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers['authorization'];
    if (!authHeader) return false;

    // Supporta sia "Bearer <sessionId>" che solo il sessionId
    const sessionId = authHeader.startsWith('Bearer ')
      ? authHeader.slice(7).trim()
      : authHeader.trim();

    if (!sessionId) return false;
    const sessionUser = await this.sessionService.getUserFromSession(sessionId);
    if (!sessionUser) return false;
    request.user = sessionUser;
    return true;
  }
}
