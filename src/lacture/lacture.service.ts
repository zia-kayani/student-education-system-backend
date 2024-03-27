import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AuthenticationService } from "src/auth/authentication.service";
import { CourseDocument } from "src/schemas/course/course.schema";
import { LactureDocument } from "src/schemas/lacture/lacture.schema";


@Injectable()
export class LactureService {
    constructor(@InjectModel('Lacture') private readonly lactureModel: Model<LactureDocument>,
        private readonly authService: AuthenticationService,
        @InjectModel('Course') private readonly courseModel: Model<CourseDocument>,
    ) { }
    async createLacture(createLactureDTO) {
        const lacture = await this.lactureModel.create(createLactureDTO);
        if (!lacture) {
            throw new Error('lacture data does not created in database')
        }

        return lacture;
    }


    async getLacture(token) {

        const user = await this.authService.validateToken(token);
        console.log('user is', user)
        if (!user) {
            console.log('user doest not exist with this token or token is invalid')
            throw new HttpException('Forbidden' , HttpStatus.NOT_FOUND)
        }

        if (!this.checkRole(user.role)) {
            console.log('user is not student')
            return false;
        }
        const studentId = user.id;



       // to check that student in the course student ids

        const course = await this.courseModel.findOne({ student_ids: studentId });
  
        if(!course){
            console.log('course not found with this student id ')
            return {
                message:"course not found with this student id"
            }
        }

        const courseIdFound =  course._id.toString();


        //finding the lacrure associated with the course
        const lacture = await this.lactureModel.findOne({ courseId: courseIdFound });
        if (!lacture) {
            console.log('No lacture found for the course');
            return null;
        }
        console.log('lacture is', lacture)
        return {
            JSON: {
                lacture:lacture.video
            }
        }
    }

    //for student role chek
    private checkRole(userRole: string): boolean {
        return userRole === 'student';
    }

}