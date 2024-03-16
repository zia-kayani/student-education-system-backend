import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDcument } from '../schemas/user/user.schema';
import { Course, CourseDocument } from '../schemas/course/course.schema';
import { CreateCourseDto } from './dtos/courseDTO.dto';


@Injectable()
export class CourseService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDcument>,
    @InjectModel(Course.name) private courseModel: Model<CourseDocument> 
  ) {}
   
  async createCourseWithUsers(createCourseDto:CreateCourseDto): Promise<Course> {
    const users = await this.userModel.find().exec(); // Fetch all users

    let teacherId = '';
    const studentIds = [];

    users.forEach(user => {
      if (user.role === 'TEACHER') {
        teacherId = user._id;
      } else if (user.role === 'STUDENT') {
        studentIds.push(user._id);
      }
    });

    const newCourse = new this.courseModel({
        ...createCourseDto,
      teacher_id: teacherId,
      student_ids: studentIds
    });

    return newCourse.save();
  }
}
  
    
  


