import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/regsiterUser.dto';
import { LoginDto } from './dto/loginUser.dto';
import { AuthGuard } from './auth.guard';
import { UserService } from 'src/user/user.service';

@Controller('auth') // /auth/register
export class AuthController {

    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService
    ){}

    @Post('register')
    async register(@Body() registerUserDto: RegisterDto){
        const token = await this.authService.registerUser(registerUserDto);
        return token;
    }

    @Post('login')
    async login(@Body() loginDto: LoginDto){
        const res = await this.authService.loginUser(loginDto)
        return res;
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    async getProfile(@Request() req){
        const userId = req.user.sub;
        
        const user = await this.userService.getUserById(userId);
        console.log(user);
        return {
            id:     user?._id,
            name:   user?.name,
            email:  user?.email,
            role:   user?.role
        }
    }
}
