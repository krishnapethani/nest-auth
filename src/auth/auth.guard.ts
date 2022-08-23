import {AuthService } from './auth.service';
import { Request } from 'express';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate{

    constructor(
        private readonly authService: AuthService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request: Request = context.switchToHttp().getRequest();

        
        const authheader = request.header('Authorization');
        const token = authheader && authheader.split(" ")[1];
        try {
            let authorizedMsg = await this.authService.authenticate(token);
            
        request['isAuthorized'] = "Authorized"
            return true;
        } catch (error) {
            throw new UnauthorizedException();
        }
    }
}