import { Module, forwardRef } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { LactureSchema } from "src/schemas/lacture/lacture.schema";
import { LactureController } from "./lacture.controller";
import { LactureService } from "./lacture.service";
import { AuthenticationModule } from "src/auth/authentication.module";
import { CourseModule } from "src/course/course.module";


@Module({
    imports:[
         MongooseModule.forFeature([{name:'Lacture' , schema:LactureSchema}]),
         AuthenticationModule,
        //  CourseModule,
         forwardRef(()=>CourseModule),

        ],
    controllers:[LactureController],
    providers:[LactureService],
    exports: [LactureService , MongooseModule , LactureModule ]
})
export class LactureModule{

}

function forward(arg0: () => typeof CourseModule): import("@nestjs/common").Type<any> | import("@nestjs/common").DynamicModule | Promise<import("@nestjs/common").DynamicModule> | import("@nestjs/common").ForwardReference<any> {
    throw new Error("Function not implemented.");
}
