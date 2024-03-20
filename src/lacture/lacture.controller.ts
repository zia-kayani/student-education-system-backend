import { Body, Controller, Get, Post, Req } from "@nestjs/common";
import { LactureService } from "./lacture.service";



@Controller('/user')
export class LactureController{
 constructor(private readonly lactureService:LactureService){}

 @Post('/lacture')
 createExam(@Body() createLactureDTO){

    return this.lactureService.createLacture(createLactureDTO)
 }

 @Get('/lactures')
 getLacture(@Req() req){
    const token =  req.headers.authorization?.split(' ')[1];
    return this.lactureService.getLacture(token);
 }
}