import { Module } from '@nestjs/common';
import { CarsController } from './controllers/cars/cars.controller';
import { CarsService } from './services/cars/cars.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car, User } from 'src/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Car, User]),
  ],
  controllers: [CarsController],
  providers: [CarsService]
})
export class CarsModule {}
