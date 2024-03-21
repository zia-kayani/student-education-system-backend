import { Module, forwardRef } from '@nestjs/common';
import { LectureProgressService } from './lecture-progress.service';
import { LectureProgressController } from './lecture-progress.controller';
import { CourseModule } from 'src/course/course.module';
import { StudentProgressModule } from '../students-progress/student-progress.module';
import { LactureModule } from 'src/lacture/lacture.module';



@Module({
  imports:[forwardRef(()=>StudentProgressModule),CourseModule,LactureModule],
  controllers: [LectureProgressController],
  providers: [LectureProgressService],
  exports:[LectureProgressService]
})
export class LectureProgressModule {}
