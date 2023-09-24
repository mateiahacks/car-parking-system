import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users/auth.controller';
import { AuthService } from './services/auth-service/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { User } from 'src/typeorm';
import { Car } from 'src/typeorm/entities/Car';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Car]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '30d' }
    })
  ],
  controllers: [UsersController],
  providers: [AuthService]
})
export class UsersModule {}
