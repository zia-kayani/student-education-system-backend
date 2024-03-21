import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { Course, CourseDocument } from 'src/schemas/course/course.schema';
import { StudentProgressService } from '../students-progress/student-progress.service';
import {Model} from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Lacture, LactureDocument } from 'src/schemas/lacture/lacture.schema';

@Injectable()
export class LectureProgressService {
    constructor(
        @InjectModel(Course.name) private readonly courseModel:Model<CourseDocument>,
        @InjectModel(Lacture.name) private readonly lactureModel:Model<LactureDocument>,
        @Inject(forwardRef(()=>StudentProgressService))
        private readonly studentProgressService:StudentProgressService
    ){}
    async getLectureTime(studentids:string[]):Promise<string[]>{
       const userID = await Promise.all(studentids.map(async (studentid) => {
        const users = await this.courseModel.find({
            student_ids: studentid
        }).exec();
        return users.map((user) => user._id.toString());
    }));
    
       const scrns=await this.lactureModel.find({
        'courseId':userID.toString()
       }).exec()
       

       const duration=scrns.map(scrn=> Date.now()-scrn.createdAt.getTime())
        
       const times=await this.formatTimeDifference(duration)
       console.log(times)
       return times;

    }


    async formatTimeDifference(durations: number[]): Promise<string[]> {
        const formattedTimes: string[] = [];
        console.log('In format time func',durations)
        for (const time of durations) {
            const milliseconds = Math.abs(time);
            const seconds = Math.floor(milliseconds / 1000);
            const minutes = Math.floor(seconds / 60);
            const hours = Math.floor(minutes / 60);
            const days = Math.floor(hours / 24);
    
            if (days > 1) {
                const date = new Date(Date.now() - time);
                const month = date.toLocaleString('en-us', { month: 'short' });
                const day = date.getDate();
                const year = date.getFullYear();
                const hour = date.getHours().toString().padStart(2, '0');
                const minute = date.getMinutes().toString().padStart(2, '0');
                formattedTimes.push(`${month} ${day} ${year} ${hour}:${minute}`);
            } else if (days === 1) {
                formattedTimes.push('Yesterday');
            } else if (hours > 0) {
                formattedTimes.push(`${hours} hour${hours > 1 ? 's' : ''} ago`);
            } else if (minutes > 0) {
                formattedTimes.push(`${minutes} minute${minutes > 1 ? 's' : ''} ago`);
            } else {
                formattedTimes.push('Just now');
            }
        }
    
        return formattedTimes;
    }
    
   
    async getScreenshots(studentids:string[]):Promise<any>{
        const userID = await Promise.all(studentids.map(async (studentid) => {
            const users = await this.courseModel.find({
                student_ids: studentid
            }).exec();
            return users.map((user) => user._id.toString());
        }));
        
           const scrns=await this.lactureModel.find({
            'courseId':userID.toString()
           }).exec()

           const webcamScreenshots=scrns.map(scrn=>scrn.webcamScreenshots)
           const windowScreenshots=scrns.map(scrn=>scrn.windowScreenshots)

           const screenshotsobj=[webcamScreenshots,windowScreenshots]
           

           return screenshotsobj;
    }



    async getAllStudentsLectureProgress():Promise<any>{
        // Fetch all courses to get the array of student_ids
        const courses = await this.courseModel.find().exec();
        const studentIds = [...new Set(courses.flatMap(course => course.student_ids.map(id => id.toString())))];
        const names=await this.studentProgressService.StudentNames(studentIds);
        const images=await this.studentProgressService.StudentImages(studentIds);
        const times=await this.getLectureTime(studentIds);
        const screenshots=await this.getScreenshots(studentIds)
        
        
        // Combine the information into a single response
        return studentIds.map((id, index) => ({
            id: id,
            name: names[index] ? names[index] : "Unknown",
            image: images[index] ? images[index] : "No image",
            lectureAttended:times.length>1?times[times.length-1]:times[index] || 'Not attend any lec',
            webcamscreenshots:screenshots[0].length>1?screenshots[0][screenshots[0].length-1]:screenshots[0],
            windowscreenshots:screenshots[1].length>1?screenshots[1][screenshots[1].length-1]:screenshots[1]
        }));
    }
}

