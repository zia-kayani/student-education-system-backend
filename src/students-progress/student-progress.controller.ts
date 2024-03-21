import { Controller, Get } from '@nestjs/common';
import { StudentProgressService } from './student-progress.service';

@Controller('/studentprogress')
export class StudentProgressController {
    constructor(private readonly studentProgressService: StudentProgressService) {}

    @Get()
    async getAllStudentProgress(): Promise<any> {
        return this.studentProgressService.getAllStudentProgress();
    }
}
