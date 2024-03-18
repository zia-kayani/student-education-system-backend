import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { AuthenticationService } from "src/auth/authentication.service";

@Injectable()
export class StudentGuard implements CanActivate{
    constructor(private readonly authenticationService: AuthenticationService){}
    canActivate(context: ExecutionContext): boolean {

        const request =  context.switchToHttp().getRequest();
        const token  = request.headers.authorization?.split(' ')[1]
        if(!token){
            console.log('token does not exit')
            return false;  //token doont exist
        }

        const user =  this.authenticationService.validateToken(token);
        if(!user){
            console.log('user does not exist with this token')
            return false;
        }

        if(!this.checkRole(user.role)){
            console.log('user is not student')
            return false;
        }
        
        request.user = user;

        return true
    };

    private checkRole(userRole:string):boolean{
        return userRole === 'student';
    }
    
}