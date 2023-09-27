import { Body, Controller, Get, Post, Request, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { RegisterUserDto } from 'src/auth/dto/RegisterUserDto';
import { AuthService } from 'src/auth/services/auth-service/auth.service';
import { JwtService } from '@nestjs/jwt';
import { instanceToPlain } from 'class-transformer';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { User } from 'src/typeorm';
import { LoginUserDto } from 'src/auth/dto/LoginUserDto';
import { ChangePasswordDto } from 'src/auth/dto/ChangePasswordDto';

@Controller('auth')
export class UsersController {
    constructor(
        private authService: AuthService,
        private jwtService: JwtService,
    ) {}

    @Post('register')
    @UsePipes(ValidationPipe)
    async registerUser(@Body() registerUserDto: RegisterUserDto) {
        const user = await this.authService.createUser(registerUserDto);

        const serialized = instanceToPlain(user);
        return { 
            ...serialized,
            access_token: await this.jwtService.signAsync({ ...user }, { secret: process.env.JWT_SECRET })
        };

    }

    @Post('login')
    @UsePipes(ValidationPipe)
    async loginUser(@Body() loginUserDto: LoginUserDto) {
        const user = await this.authService.login(loginUserDto);

        const serialized = instanceToPlain(user);

        return { 
            ...serialized,
            access_token: await this.jwtService.signAsync({ ...user }, { secret: process.env.JWT_SECRET })
        };
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return this.authService.getProfile(req.user.id);
    }

    @UseGuards(AuthGuard)
    @Post('change_password')
    @UsePipes(ValidationPipe)
    async changePassword(@Body() changePasswordDto: ChangePasswordDto, @Request() req) {
        const { phone_number, cars }: User = req.user;

        const user = await this.authService.changePassword(changePasswordDto, phone_number);

        return instanceToPlain(user);
    }
}
