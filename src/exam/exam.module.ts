import { Module } from "@nestjs/common";
import { ExamService } from "./exam.service";
import { ExamController } from "./exam.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { ExamSchema } from "src/schemas/exam/exam.schema";


@Module({
    imports:[ MongooseModule.forFeature([{name:'Exam' , schema:ExamSchema}])],
    controllers:[ExamController],
    providers:[ExamService],
    exports: [ExamService , MongooseModule , ExamModule ]
})
export class ExamModule{

}