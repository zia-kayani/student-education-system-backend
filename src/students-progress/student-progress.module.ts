import { Module, forwardRef } from '@nestjs/common';
import { StudentProgressService } from './student-progress.service';
import { StudentProgressController } from './student-progress.controller';
import { UserModule } from '../user/user.module';
import { CourseModule } from 'src/course/course.module';
import { LectureProgressModule } from '../lectures-progress/lecture-progress.module';
import { ExamModule } from 'src/exam/exam.module';




@Module({
    imports:[forwardRef(()=>LectureProgressModule),UserModule,CourseModule,ExamModule],
    controllers:[StudentProgressController],
    providers:[StudentProgressService],
    exports:[StudentProgressService]
})
export class StudentProgressModule {}


