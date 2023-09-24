import { Body, Controller, Get, Post, Req, Request, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { AddCarDto } from 'src/cars/dto/AddCarDto';

@Controller('cars')
export class CarsController {

    @Post()
    @UsePipes(ValidationPipe)
    addMyCar(@Request() req, @Body() addCarDto: AddCarDto) {

    }


    @UseGuards(AuthGuard)
    @Get()
    getMyCars(@Request() req) {
        return {
            msg: 'get cars',
        }
    }
}
