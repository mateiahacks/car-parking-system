import { Module } from '@nestjs/common';
import { AdminController } from './controllers/admin/admin.controller';
import { ParkingService } from './services/parking/parking.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Parking } from 'src/typeorm';
import { Reservation } from 'src/typeorm/entities/Reservation';

@Module({
  imports: [
    TypeOrmModule.forFeature([ Parking, Reservation ])
  ],
  controllers: [AdminController],
  providers: [ParkingService]
})
export class AdminModule {}
