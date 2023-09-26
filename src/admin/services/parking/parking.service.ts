import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createParkingDto } from 'src/admin/dto/CreateParkingDto';
import { Parking } from 'src/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ParkingService {
    constructor(
        @InjectRepository(Parking) private readonly parkingRepository: Repository<Parking>,
    ) {}

    async createParking(createParkingDto: createParkingDto) {
        const { name } = createParkingDto;
        const parking = await this.parkingRepository.findOneBy({ name });
        if (parking)
            throw new HttpException('Parking with this name already exists', HttpStatus.BAD_REQUEST);

        const newParking = this.parkingRepository.create({ ...createParkingDto });

        return await this.parkingRepository.save(newParking);
    }

    async getParkings() {
        return await this.parkingRepository.find({
            relations: { reservations: true }
        });
    }
}
