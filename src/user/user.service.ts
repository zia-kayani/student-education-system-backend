import { BadRequestException, Injectable, NotFoundException, ServiceUnavailableException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserDcument } from "src/schemas/user/user.schema";


@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<UserDcument>){}

    async create(creaetUserDTO){
        
             const user = await this.userModel.create(creaetUserDTO)
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

    async update(id:string , updateUserDTO){
        const updatedUser =await this.userModel.findByIdAndUpdate(id ,  updateUserDTO, {new:true});
        if(!updatedUser){
            console.log('user not found and updated')
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