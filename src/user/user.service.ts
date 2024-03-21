import { BadRequestException, Injectable, NotFoundException, ServiceUnavailableException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserDcument } from "src/schemas/user/user.schema";
import { CourseService } from "src/course/course.service";
import { AuthenticationService } from "src/auth/authentication.service";

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<UserDcument>,
    private readonly authService: AuthenticationService,
    private readonly courseService: CourseService
    ){}

    async create(creaetUserDTO){
        
             const user = await this.userModel.create(creaetUserDTO)
             await this.courseService.updateCourses(user);
             return user;
   
    }

    async findAll(){
        const users = await this.userModel.find()
        return users;
    }

        //user login 
        async findUser(userDTO: {image: string, }){
            const {image}= userDTO
            const user = await this.userModel.findOne({image});  //image authentication
    
            if(!user){
                console.log('user not found ::UserService>finUser()')
                return { message: 'user not found with this image'  };

            }
            const token = this.authService.generateToken({id:user._id , role:user.role})        
            console.log('token generated successfully on login' ,token)
            return {
                token , user
            };
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