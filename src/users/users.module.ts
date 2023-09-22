import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users/users.controller';
import { AuthServiceService } from './services/auth-service/auth-service.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([User])
  ],
  controllers: [UsersController],
  providers: [AuthServiceService]
})
export class UsersModule {}
