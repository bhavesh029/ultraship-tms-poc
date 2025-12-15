import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();
    
    // 1. Check for Header
    const authHeader = req.headers.authorization;
    if (!authHeader) return false;

    // 2. Decode Token
    const token = authHeader.split(' ')[1];
    try {
      const user = this.jwtService.verify(token);
      req.user = user; // Attach user to request
      
      // 3. Admin Check (Hardcoded for simplicity for this method)
      // If we use this guard, we expect the user to be an ADMIN
      return user.role === 'ADMIN'; 
    } catch (e) {
      throw new UnauthorizedException('Invalid Token');
    }
  }
}