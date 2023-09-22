import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { RegisterUserDto } from 'src/types/dto/RegisterUser.dto';
import { AuthServiceService } from 'src/users/services/auth-service/auth-service.service';

@Controller('auth')
export class UsersController {
    constructor(private authService: AuthServiceService) {}

    @Post('register')
    @UsePipes(ValidationPipe)
    registerUser(@Body() registerUserDto: RegisterUserDto) {
        
        return this.authService.createUser(registerUserDto);

    }
}
