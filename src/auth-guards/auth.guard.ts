import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { AuthenticationService } from "src/auth/authentication.service";

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private readonly authenticationService: AuthenticationService){}
    canActivate(context: ExecutionContext): boolean {

        const request =  context.switchToHttp().getRequest();
        const token  = request.headers.authorization?.split(' ')[1]
        if(!token){
            console.log('token does not exit')
            return false;
        }

        const user =  this.authenticationService.validateToken(token);
        if(!user){
            console.log('user does not exist with this token')
            return false;
        }

        request.user = user;
        //returing true
        return true
    };

    
}