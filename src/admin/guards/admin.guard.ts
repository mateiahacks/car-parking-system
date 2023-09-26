import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";


@Injectable()
export class AdminGuard implements CanActivate {

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        
        if (!request.user.is_admin)
            throw new UnauthorizedException('Not authorized as an admin!')

        return true;
    }

}