import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm';
import { RegisterUserDto } from 'src/types/dto/RegisterUser.dto';
import { Repository } from 'typeorm';

@Injectable()
export class AuthServiceService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

    async createUser(registerUserDto: RegisterUserDto) {
        const { phone_number } = registerUserDto;
        const user = await this.userRepository.findOneBy({ phone_number });

        if (user)
            throw new HttpException('User with this phone number exists!', HttpStatus.BAD_REQUEST);

        const newUser = this.userRepository.create(registerUserDto);
        return this.userRepository.save(newUser);
        
    }
}
