import { Module, forwardRef} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {CourseService} from '../course/course.service';
import { CourseController } from './course.controller';
import { CourseSchema } from 'src/schemas/course/course.schema';
import { UserModule } from 'src/user/user.module';

@Module({
    imports:[MongooseModule.forFeature([{name:'Course', schema:CourseSchema}]),
    forwardRef(()=>UserModule)],
    controllers:[CourseController],
    providers:[CourseService],
    exports:[CourseService,MongooseModule]
})
export class CourseModule {
    
}
