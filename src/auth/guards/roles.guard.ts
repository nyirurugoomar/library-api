import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { Role } from "../enums/role.enum";
import { ROLES_KEY } from "../decorators/role.decorator";
import { Reflector } from "@nestjs/core";



@Injectable()
export class RoleGuard implements CanActivate{
    constructor(private reflector: Reflector){}

    canActivate(context: ExecutionContext): boolean  {
        const requredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY,[
            context.getHandler(),
            context.getClass(),
        ]);
        if(!requredRoles) return true;

        const request = context.switchToHttp().getRequest();
        const user = request.user; 

        return matchRoles(requredRoles,user?.role)

        
        
    }

}

function matchRoles(requiredRoles:  string[], userRole: string[]){
    return requiredRoles.some((role:string) => userRole?.includes(role));
}