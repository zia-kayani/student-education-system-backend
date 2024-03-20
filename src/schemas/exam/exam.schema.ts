import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import {Document} from 'mongoose'


@Schema({
    timestamps:true,
})
export class Exam {
@Prop({required:true , type:mongoose.Types.ObjectId , ref:'Course'})
 courseId:mongoose.Types.ObjectId | string;

 @Prop({required:true , default:false})
 isAttempted: boolean;

@Prop({required:true ,})
webcamScreenshots:string[]

@Prop({required:true})
windowScreenshots:string[]
}

export type ExamDocument = Exam & Document;

export const ExamSchema=  SchemaFactory.createForClass(Exam);