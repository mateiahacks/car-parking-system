import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { instanceToPlain } from 'class-transformer';
import { AddCarDto } from 'src/cars/dto/AddCarDto';
import { UpdateCarDto } from 'src/cars/dto/UpdateCarDto';
import { Car, User } from 'src/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CarsService {
    constructor(
        @InjectRepository(Car) private readonly carRepository: Repository<Car>,
        @InjectRepository(User) private readonly userRepository: Repository<User>,
    ) {}

    async createCar(addCarDto: AddCarDto, owner: number) {
        const user = await this.userRepository.findOne({
            where: {id: owner}
        });

        if (!user)
            throw new HttpException('No such user', HttpStatus.BAD_REQUEST)

        const newCar = this.carRepository.create({...addCarDto, owner: user});

        return await this.carRepository.save(newCar);
    }

    async getMyCars(owner: number) {
        const user = await this.userRepository.findOneBy({ id: owner });

        if (!user)
            throw new HttpException('No such user', HttpStatus.BAD_REQUEST)

        return this.carRepository.findBy({ owner: user });
    }

    async deleteCar(id: number, user_id: number) {
        const car = await this.carRepository.findOne({
            where: { id },
            relations: { owner: true },
        });

        if (!car)
            throw new HttpException("Car with such id doesn't exist!", HttpStatus.BAD_REQUEST);
        
        if (car.owner.id !== user_id)
            throw new HttpException("This is not your car", HttpStatus.BAD_REQUEST);

        await this.carRepository.delete({ id });

        return { message: "Successfully deleted" }
    }

    async updateCar(id: number, updateCarDto: UpdateCarDto, user_id: number) {
        const car = await this.carRepository.findOne({
            where: { id },
            relations: {owner: true}
        });

        if (!car)
            throw new HttpException("Car with such id doesn't exist!", HttpStatus.BAD_REQUEST); 

        if (car.owner.id !== user_id)
            throw new HttpException("This is not your car", HttpStatus.BAD_REQUEST);
        
        await this.carRepository.update({ id }, {...updateCarDto});
        
        return { message: "Successfully updated" }
    }



}
