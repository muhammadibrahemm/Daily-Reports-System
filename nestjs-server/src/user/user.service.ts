import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RegisterDto } from 'src/auth/dto/regsiterUser.dto';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { LoginDto } from 'src/auth/dto/loginUser.dto';
import bcrypt from "bcrypt"


@Injectable()
export class UserService {
    
    constructor(@InjectModel(User.name) private userModel: Model<User>){}

    // create user
    async createUser(registerUserDto: RegisterDto) {

        try {

            return await this.userModel.create(
                {
                    name: registerUserDto.name,
                    email: registerUserDto.email,
                    password: registerUserDto.password
                }
            )
            
        } catch (err: unknown) {
            const e = err as { code?:number }
            const DUPLICATE_KEY_CODE = 11000
             if(e.code === DUPLICATE_KEY_CODE){
                throw new ConflictException('Email is already taken.')
             }

             throw err;
        }   
    }

    // login user
    async loginUser(loginDto: LoginDto) {
        try {

            const {email, password} = loginDto;
            console.log("email",email)
            const user = await this.userModel.findOne({email});
            
            if(!user) {
                console.log("user ddd:",user)
                throw new NotFoundException(`User with email ${email} not found`);
            }

            
            const isPasswordValid = await bcrypt.compare(password, user.password);

            if(!isPasswordValid){
                throw new UnauthorizedException("Invalid credentials");
            }

            return { message: "Login Successfull", statusCode: 200, id: user._id}

        } catch (error) {
            throw error;
        }
    }

    // get user by id
    async getUserById(id: string) {
        return await this.userModel.findOne({ _id: id })
    }
}
