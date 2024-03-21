import { Body, Controller,Get, Post } from "@nestjs/common";
import { CourseService } from "./course.service";
import { Course } from "src/schemas/course/course.schema";


@Controller('/users')

export class CourseController{
    constructor(private readonly courseService:CourseService){}

    @Post('/course')
     async createCourse(@Body() createCourseDto) {
        return this.courseService.createCourseWithUsers(createCourseDto);
    }
    
    @Get("/courses")
    async getAll():Promise<Course[]>{
        return this.courseService.getAllCourseUsers();
    }
}