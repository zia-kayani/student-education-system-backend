import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import {Document} from 'mongoose'


@Schema({
    timestamps:true,
})
export class Lacture {
    @Prop({required:true , type:mongoose.Types.ObjectId , ref:'Course'})
 courseId:mongoose.Types.ObjectId | string;

 @Prop({required:true })
 video:string;

@Prop({required:true ,})
webcamScreenshots:string[]

@Prop({required:true})
windowScreenshots:string[]
}

export type LactureDocument = Lacture & Document;

export const LactureSchema=  SchemaFactory.createForClass(Lacture);