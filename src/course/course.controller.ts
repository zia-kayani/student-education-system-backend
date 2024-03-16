import { Body, Controller,Get, Post } from "@nestjs/common";
import { CourseService } from "./course.service";
import { CreateCourseDto } from "./dtos/courseDTO.dto";


@Controller('/users/course')

export class CourseController{
    constructor(private readonly courseService:CourseService){}

    @Post()
     async createCourse(@Body() createCourseDto:CreateCourseDto) {
        return this.courseService.createCourseWithUsers(createCourseDto);
    }
    
}