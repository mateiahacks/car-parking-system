import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { instanceToPlain } from 'class-transformer';
import * as moment from 'moment';
import { CreateReservationDto } from 'src/reservations/dto/CreateReservationDto';
import { Car, Parking, Reservation, User } from 'src/typeorm';
import { isCurrentlyReserved } from 'src/utils/helpers';
import { Repository } from 'typeorm';

@Injectable()
export class ReservationsService {
    constructor(
        @InjectRepository(Reservation) private readonly reservationRepository: Repository<Reservation>,
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        @InjectRepository(Car) private readonly carRepository: Repository<Car>,
        @InjectRepository(Parking) private readonly parkingRepository: Repository<Parking>,
    ) {}

    async createReservation(userId: number, createReservationDto: CreateReservationDto) {
        const { carId, parkingId, hours } = createReservationDto;
        const now = moment(new Date());
        const expiration_date = now.add(hours, 'hours').toJSON();
        
        const user = await this.userRepository.findOne({where: { id: userId }});
        const car = await this.carRepository.findOne({where: { id: carId }, relations: { owner: true }});
        const parking = await this.parkingRepository.findOne({where: { id: parkingId }, relations: { reservations: true }});

        if (isCurrentlyReserved(parking.reservations)) {
            throw new HttpException('Parking is currently in reservation!', HttpStatus.BAD_REQUEST);
        }

        if (!parking) {
            throw new HttpException("Parking with such id doesn't exist", HttpStatus.BAD_REQUEST);
        }

        if (!car) {
            throw new HttpException("Car with such id doesn't exist", HttpStatus.BAD_REQUEST);
        }

        if (car.owner.id !== user.id) {
            throw new HttpException("Not your car", HttpStatus.BAD_REQUEST);
        }
        
        const newReservation = await this.reservationRepository.create({
            expiration_date: expiration_date,
            user: { ...user, balance: user.balance - parking.cost * hours},
            car: car,
            parking: parking,
        });

        await this.userRepository.update({ id: user.id }, { balance: user.balance - parking.cost*hours});

        return await this.reservationRepository.save(newReservation);
    }

    async getMyReservations(userId: number) {
        const reservations = await this.userRepository.findOne({
            where: { id: userId },
            relations: { reservations: true },
            select: { reservations: true }
        });

        return reservations.reservations;
    }

}
