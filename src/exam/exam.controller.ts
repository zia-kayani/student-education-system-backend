import { Body, Controller, Post } from "@nestjs/common";
import { ExamService } from "./exam.service";



@Controller('/users')
export class ExamController{
 constructor(private readonly examService:ExamService){}

 @Post('/exam')
 createExam(@Body() createExamDTO){

    return this.examService.createExam(createExamDTO)
 }
}