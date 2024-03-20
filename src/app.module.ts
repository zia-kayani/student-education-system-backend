import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { CourseModule } from './course/course.module';
import { AuthenticationModule } from './auth/authentication.module';
import { ExamModule } from './exam/exam.module';
import { LactureModule } from './lacture/lacture.module';

@Module({
  imports: [
    //zia
    UserModule,
    ExamModule,
    LactureModule,

    //nouman
    CourseModule,

     //db
    AuthenticationModule,  //authenticatino module
    ConfigModule.forRoot(), 
    MongooseModule.forRootAsync({
      imports:[ConfigModule],
      useFactory: (configService:ConfigService)=>{
        const envType = configService.get('NODE_ENV');
        if(envType === 'local'){
          console.log('local databse')
          return{
            uri:'mongodb://localhost:27017/nest_app_db'
          }
        }
        else{
          const username = configService.get('DB_USER');
          const password = configService.get('DB_PASSWORD');
          const host = configService.get('DB_HOST'); // Update this line
          const db = configService.get('DB_NAME');
  
          const uri = `mongodb+srv://${username}:${password}@${host}/${db}?retryWrites=true&w=majority&appName=Cluster0`
          console.log('db connection successful')
          return {
            uri
          }
        }
      },

      inject:[ConfigService]
    })

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
