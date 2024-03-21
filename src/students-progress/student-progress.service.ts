import { Inject, Injectable, forwardRef } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import {Model} from 'mongoose';
import { LectureProgressService } from "src/lectures-progress/lecture-progress.service";
import { Course, CourseDocument } from "src/schemas/course/course.schema";
import { Exam, ExamDocument } from "src/schemas/exam/exam.schema";
import { User,UserDcument } from "src/schemas/user/user.schema";


@Injectable()
export class StudentProgressService {
    constructor(
        @InjectModel(Course.name) private readonly courseModel: Model<CourseDocument>,
        @InjectModel(User.name) private readonly userModel: Model<UserDcument>,
        @InjectModel(Exam.name) private readonly examModel: Model<ExamDocument>,
        @Inject(forwardRef(()=>LectureProgressService))
        private readonly lectureProgressService:LectureProgressService
    ) {}

    async StudentNames(studentIds: string[]): Promise<string[]> {
        const users = await this.userModel.find({
            '_id': { $in: studentIds }
        }).exec();

        return users.map(user => user.firstName + " " + user.lastName);
    }

    async StudentImages(studentIds: string[]): Promise<string[]> {
        const users = await this.userModel.find({
            '_id': { $in: studentIds }
        }).exec();

        return users.map(user => user.image);
    }
    async getNoOfLecs(student_ids:string[]): Promise<number>{
        const screenshots=await  this.lectureProgressService.getScreenshots(student_ids);

        console.log(screenshots.length)
       return screenshots[0].length;
    }

    async getNoOfExams(student_ids:string[]): Promise<number>{
        const userID = await Promise.all(student_ids.map(async (studentid) => {
            const users = await this.courseModel.find({
                student_ids: studentid
            }).exec();
            return users.map((user) => user._id.toString());
        }));
        
           const scrns=await this.examModel.find({
            'courseId':userID.toString()
           }).exec()

           const webcamScreenshots=scrns.map(scrn=>scrn.webcamScreenshots)
           const windowScreenshots=scrns.map(scrn=>scrn.windowScreenshots)

           const screenshotsobj=[webcamScreenshots,windowScreenshots]

           return screenshotsobj[0].length;   
     }

    async getAllStudentProgress(): Promise<any> {
        // Fetch all courses to get the array of student_ids
        const courses = await this.courseModel.find().exec();
        const studentIds = [...new Set(courses.flatMap(course => course.student_ids.map(id => id.toString())))];
        

        // Use the fetched student IDs to get names and images
        const names = await this.StudentNames(studentIds);
        const images = await this.StudentImages(studentIds);
        const lectures=await this.getNoOfLecs(studentIds)
        const exams  =await  this.getNoOfExams(studentIds)
        // Combine the information into a single response
        return studentIds.map((id, index) => ({
            id: id,
            name: names[index] ? names[index] : "Unknown",
            image: images[index] ? images[index] : "No image",
            NoOflectures:lectures,
            NoOfexam:exams
        }));
    }
}
