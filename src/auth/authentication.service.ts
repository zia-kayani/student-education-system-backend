import { Injectable } from "@nestjs/common";
import * as jwt from 'jsonwebtoken';


@Injectable()
export class AuthenticationService {
private readonly secretKey : string = "zia_kayani";

generateToken(payload:any):string {
    const jwtToken =jwt.sign(payload , this.secretKey , {expiresIn:'1h'})
    if(!jwtToken){
        console.log('jwt token generation failed')
    }
    return jwtToken;
}

validateToken(token:any):any{
try {
    const decodedToken = jwt.verify(token, this.secretKey);
    if(decodedToken){
        return decodedToken
    }
    
} catch (error) {
    console.log('eror while validating token') //token generation error
    return null;
}}
}