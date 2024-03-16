import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { User } from '../user/user.schema';
import Types from 'mongoose'

@Schema()
export class Course{

 @Prop({type:mongoose.Schema.Types.ObjectId,ref:'User'})
 teacher_id:User
 
 @Prop({type:[{type:mongoose.Schema.Types.ObjectId,ref:'User'}]})
 student_ids:(Types.ObjectId|string)[];

 @Prop({required:true})
 courseName:string

}

export type CourseDocument=Course & Document;

export  const CourseSchema= SchemaFactory.createForClass(Course)