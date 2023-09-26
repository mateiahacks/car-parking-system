import { Module } from '@nestjs/common'
import { UsersModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CarsModule } from './cars/cars.module';
import { AdminModule } from './admin/admin.module';
import { ReservationsModule } from './reservations/reservations.module';
import entities from './typeorm';

@Module({
  imports: [
    UsersModule, 
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
    type: 'mysql',
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: entities,
    synchronize: true,
  }),
    CarsModule,
    AdminModule,
    ReservationsModule],
})
export class AppModule {}
