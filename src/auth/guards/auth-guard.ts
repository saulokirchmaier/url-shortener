import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from '../auth.service';
import { Reflector } from '@nestjs/core';
import { Role } from './role.decorator';
import { RoleType } from 'src/utils/role.enum';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext) {
    const roles = this.reflector.get(Role, context.getHandler());
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token && roles.context === RoleType.NEW_URL) {
      request.user = false;
      return true;
    }

    if (!token) {
      throw new UnauthorizedException('Token not provided');
    }

    try {
      const payload = await this.authService.verifyToken(token);
      request.user = payload;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
