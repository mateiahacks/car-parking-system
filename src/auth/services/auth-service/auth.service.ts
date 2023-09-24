import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm';
import { RegisterUserDto } from 'src/types/dto/RegisterUser.dto';
import { hashPassword } from 'src/utils/helpers';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from 'src/dto/LoginUserDto';
import * as bcrypt from 'bcrypt';
import { ChangePasswordDto } from 'src/dto/ChangePasswordDto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        private jwtService: JwtService,   
    ) {}

    async createUser(registerUserDto: RegisterUserDto) {
        const { phone_number, password } = registerUserDto;
        const user = await this.userRepository.findOneBy({ phone_number });
        
        if (user)
            throw new HttpException('User with this phone number exists!', HttpStatus.BAD_REQUEST);

        const hashedPassword = await hashPassword(password);

        const newUser = this.userRepository.create({ ...registerUserDto, password: hashedPassword });
        return this.userRepository.save(newUser);
        
    }

    async login(loginUserDto: LoginUserDto) {
        const { phone_number, password } = loginUserDto;
        const user = await this.userRepository.findOneBy({ phone_number });

        if (!await bcrypt.compare(password, user.password)) {
            throw new UnauthorizedException();
        }
        return user;
    }

    async changePassword(changePasswordDto: ChangePasswordDto, phone_number: string) {
        const user = await this.userRepository.findOneBy({ phone_number });
        const { currentPassword, newPassword } = changePasswordDto;

        if (!await bcrypt.compare(currentPassword, user.password)) {
            throw new UnauthorizedException("Current password is not correct!");
        }

        user.password = await hashPassword(newPassword);
        return this.userRepository.save(user);
    }
}
