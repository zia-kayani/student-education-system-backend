import { Body, Controller,Get, Post } from "@nestjs/common";
import { CourseService } from "./course.service";
import { CreateCourseDto } from "./dtos/courseDTO.dto";
import { Course } from "src/schemas/course/course.schema";


@Controller('/users/course')

export class CourseController{
    constructor(private readonly courseService:CourseService){}

    @Post()
     async createCourse(@Body() createCourseDto:CreateCourseDto) {
        return this.courseService.createCourseWithUsers(createCourseDto);
    }
    
    @Get("courses")
    async getAll():Promise<Course[]>{
        return this.courseService.getAllCourseUsers();
    }
}