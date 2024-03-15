import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller('/users')
export class UsersController {
    constructor(private readonly userService:UserService){}
    
    @Post()
    create(@Body() creaetUserDTO ){
        return this.userService.create(creaetUserDTO)
    }

    @Get()
    findAll(){
        return this.userService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id:string){
        return this.userService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id:string  , @Body() updateUserDTO){
        return this.userService.update(id, updateUserDTO);
    }

    @Delete(':id')
    remove(@Param('id') id:string){
        return this.userService.remove(id);
    }
    
}