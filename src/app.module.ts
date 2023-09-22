import { Module } from '@nestjs/common'
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from './typeorm';

@Module({
  imports: [
    UsersModule, 
    TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'mateus',
    password: 'matemate123',
    database: 'car_parking_system',
    entities: entities,
    synchronize: true,
  })],
  controllers: [],
  providers: [],
})
export class AppModule {}
