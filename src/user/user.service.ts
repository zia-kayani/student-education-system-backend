import { BadRequestException, Injectable, NotFoundException, ServiceUnavailableException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserDcument } from "src/schemas/user/user.schema";
import { CourseService } from "src/course/course.service";

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<UserDcument>,
    private readonly courseService: CourseService
    ){}

    async create(creaetUserDTO){
        
             const user = await this.userModel.create(creaetUserDTO)
             try {
                console.log(`Calling updateCourses for user ${user._id} & ${user.role}`);
                await this.courseService.updateCourses(user);
                console.log(`Finished calling updateCourses for user ${user._id}`);
            } catch (error) {
                console.error('Error updating courses:', error);
            }
             return user;
   
    }

    async findAll(){
        const users = await this.userModel.find()
        return users;
    }

    async findOne(id:string){
        const user = await this.userModel.findById(id);

        if(!user){
            console.log('user not found')
        }
    
        return user;
    }

    async update(id: string, updateUserDTO) {
        const updatedUser = await this.userModel.findByIdAndUpdate(id, updateUserDTO, { new: true });
        if (!updatedUser) {
            console.log('User not found and not updated');
            return; 
        }
        return updatedUser;
    }
    

    async  remove(id:string){
        const deleteUser = await this.userModel.findByIdAndDelete(id)
        if(!deleteUser){
            console.log('user not found and deleted')
        }

        return {
            _id:id
        }
    }
}