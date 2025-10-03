import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dto/regsiterUser.dto';
import bcrypt from "bcrypt"
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/loginUser.dto';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
     ){}

     async registerUser(registerUserDto: RegisterDto) {
        try {
          // Logic for user register
          /**
           * 1. check if email already exists  done
           * 2. hash the password  done 
           * 3. store the user into db done 
           */
          const saltRounds = 10;
          const hash = await bcrypt.hash(registerUserDto.password, saltRounds);
      
          console.log("registerUserDto", registerUserDto);
          const user = await this.userService.createUser({ ...registerUserDto, password: hash });
      
          return { message: "Successfully registered", statusCode: 201 };
        } catch (error) {
          console.error("Error in registerUser:", error);
          throw error;
        }
      }

      async loginUser(loginDto: LoginDto) {
        try {
          const res = await this.userService.loginUser(loginDto);

          const { message, statusCode, id } = res;

          if (statusCode === 200) {
            const payload = { sub: id };
            const token = await this.jwtService.signAsync(payload);
            const res = {
              message,
              token,
              statusCode,
            };
            return res;
          }

          
        } catch (error) {
          console.error("Error in loginUser:", error);
          throw error;
        }
      }
}
