import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createParkingDto } from 'src/admin/dto/CreateParkingDto';
import { UpdateParkingDto } from 'src/admin/dto/UpdateParkingDto';
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

    async deleteParking(id: number) {
        const parking = await this.parkingRepository.findOne(
            { where: {id} }
        );

        if (!parking)
            throw new HttpException("Parking with such id doesn't exist!", HttpStatus.BAD_REQUEST);

        await this.parkingRepository.delete({ id });

        return { message: "Successfully deleted" }
    }

    async updateParking(id: number, updateParkingDto: UpdateParkingDto) {
        const parking = await this.parkingRepository.findOne({
            where: { id }
        });

        if (!parking)
            throw new HttpException("Parking with such id doesn't exist!", HttpStatus.BAD_REQUEST);

        await this.parkingRepository.update({ id }, { ...updateParkingDto });

        return { message: "Succesfully updated" };
    }
}
