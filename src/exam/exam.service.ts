import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ExamDocument } from "src/schemas/exam/exam.schema";


@Injectable()
export class ExamService {
    constructor(@InjectModel('Exam')  private readonly examModel:Model<ExamDocument> ){}
    async createExam(createExamDTO){
        const exam = await this.examModel.create(createExamDTO);
        if(!exam){
            throw new Error('exam data does not created in database')
        }

        return exam;
    }

}