import { Module } from '@nestjs/common';
import { ReservationsController } from './controllers/reservations/reservations.controller';
import { ReservationsService } from './services/reservations/reservations.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car, Parking, Reservation, User } from 'src/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reservation, User, Parking, Car])
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService]
})
export class ReservationsModule {}
