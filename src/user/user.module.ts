import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { MongooseModule } from "@nestjs/mongoose";
import { UsersController } from "./user.controller";
import { UserSchema } from "src/schemas/user/user.schema";


@Module({
    imports:[MongooseModule.forFeature([{name:'User', schema:UserSchema}])],
    controllers:[UsersController],
    providers:[UserService],
    exports:[MongooseModule]
})
export class UserModule {

}