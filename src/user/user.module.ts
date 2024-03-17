import { Module ,forwardRef} from "@nestjs/common";
import { UserService } from "./user.service";
import { MongooseModule } from "@nestjs/mongoose";
import { UsersController } from "./user.controller";
import { UserSchema } from "src/schemas/user/user.schema";
import { CourseModule } from "src/course/course.module";


@Module({
    imports:[MongooseModule.forFeature([{name:'User', schema:UserSchema}]),forwardRef(() => CourseModule)],
    controllers:[UsersController],
    providers:[UserService],
    exports:[UserModule,MongooseModule,UserService]
})
export class UserModule {

}