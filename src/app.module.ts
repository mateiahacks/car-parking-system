import { Module, OnModuleInit } from '@nestjs/common'
import { UsersModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CarsModule } from './cars/cars.module';
import { AdminModule } from './admin/admin.module';
import { ReservationsModule } from './reservations/reservations.module';
import entities from './typeorm';
import { AuthService } from './auth/services/auth-service/auth.service';

@Module({
  imports: [
    UsersModule, 
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature(entities),
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
    ReservationsModule,
  ],
  providers: [AuthService],
})
export class AppModule implements OnModuleInit{
  constructor(
    private authService: AuthService,
  ) {}

  async onModuleInit() {
    console.log(await this.authService.createAdmin());
  }
}
