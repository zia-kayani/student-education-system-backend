import { Injectable} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDcument } from '../schemas/user/user.schema';
import { Course, CourseDocument } from '../schemas/course/course.schema';
import {Types} from 'mongoose'


@Injectable()
export class CourseService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDcument>,
    @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
  ) {
  }


  async updateCourses(user: UserDcument): Promise<void> {
 
        if (user.role === 'teacher') {
            const updateResult = await this.courseModel.updateOne({ teacher_id: user._id }, { teacher_id: user._id }).exec();
        } else if (user.role === 'student') {
            const updateResult=await this.courseModel.updateOne(
                { student_ids: { $ne: new Types.ObjectId(user._id) } },  // Ensures the ID is not already in the array
                { $addToSet: { student_ids: new Types.ObjectId(user._id) } }
              ).exec();
            }
}


  async createCourseWithUsers(createCourseDto): Promise<Course> {
    const users = await this.userModel.find().exec();

    let teacherId = '';
    const studentIds = [];

    users.forEach(user => {
      if (user.role === 'teacher') {
        teacherId = user._id;
      } else if (user.role === 'student') {
        studentIds.push(user._id);
      }
    });

    const newCourse = new this.courseModel({
      ...createCourseDto,
      teacher_id: teacherId,
      student_ids: studentIds,
    });

    return newCourse.save();
  }

  async getAllCourseUsers(): Promise<Course[]> {
    const courses=await this.courseModel.find().exec();
    return courses;
  }
}
