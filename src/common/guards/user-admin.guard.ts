import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class UserAdminGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      Logger.warn('No token found in header');
      throw new UnauthorizedException();
    }

    try {
      const secret = this.config.get<string>('JWT_SECRET');
      const payload = await this.jwtService.verifyAsync(token, {
        secret,
      });

      const isAdmin: boolean = payload['admin'];

      if (!isAdmin) {
        throw new UnauthorizedException();
      }

      request['user'] = payload;
    } catch (error) {
      Logger.error(error);
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
