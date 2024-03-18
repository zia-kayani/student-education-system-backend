import { Module } from "@nestjs/common";
import { AuthenticationService } from "./authentication.service";

@Module({
    imports:[],
    controllers:[], //controller
    providers:[AuthenticationService],
    exports:[AuthenticationService]
})
export class AuthenticationModule {

}