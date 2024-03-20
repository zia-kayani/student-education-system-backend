import { Module } from "@nestjs/common";
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
         CourseModule
        ],
    controllers:[LactureController],
    providers:[LactureService],
    exports: [LactureService , MongooseModule , LactureModule ]
})
export class LactureModule{

}