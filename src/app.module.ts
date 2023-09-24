import { Module } from '@nestjs/common'
import { UsersModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
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
  })],
  controllers: [],
  providers: [],
})
export class AppModule {}
