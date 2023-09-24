import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { instanceToPlain } from 'class-transformer';
import { AddCarDto } from 'src/cars/dto/AddCarDto';
import { Car, User } from 'src/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CarsService {
    constructor(
        @InjectRepository(Car) private readonly carRepository: Repository<Car>,
        @InjectRepository(User) private readonly userRepository: Repository<User>,
    ) {}

    async createCar(addCarDto: AddCarDto, owner: number) {
        const user = await this.userRepository.findOneBy({ id: owner });

        if (!user)
            throw new HttpException('No such user', HttpStatus.BAD_REQUEST)

        const newCar = this.carRepository.create({...addCarDto, owner: instanceToPlain(user)});
        return this.carRepository.save(newCar);
    }

    async getMyCars(owner: number) {
        const user = await this.userRepository.findOneBy({ id: owner });

        if (!user)
            throw new HttpException('No such user', HttpStatus.BAD_REQUEST)

        return this.carRepository.findBy({ owner: user });
    }



}
