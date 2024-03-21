import { Controller,Get } from '@nestjs/common';
import { LectureProgressService } from './lecture-progress.service';

@Controller('/lacture')
export class LectureProgressController {
    constructor(
        private readonly lectureProgressService:LectureProgressService
    ){}

    @Get('/lactureprogress')

    async getLectureProgress(): Promise<any>{
        return this.lectureProgressService.getAllStudentsLectureProgress();
    }
}
