import { Prop, Schema, SchemaFactory,  } from "@nestjs/mongoose";
import {Document} from 'mongoose'
@Schema({
    timestamps:true,
    collection:'users'
})
export class User{
    @Prop({required:true})
    firstName:string

    @Prop({required:true})
    lastName:string

    @Prop({enum:['student' , 'teacher']})  //user enum to check role
    role:string;

    @Prop({required:true , select:false})
    image:string;  //url




}
export type UserDcument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User)