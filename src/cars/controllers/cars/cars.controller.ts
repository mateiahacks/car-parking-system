import { Body, Controller, Get, Post, Req, Request, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { AddCarDto } from 'src/cars/dto/AddCarDto';
import { CarsService } from 'src/cars/services/cars/cars.service';
import { User } from 'src/types';

@Controller('cars')
export class CarsController {
    constructor(
        private carService: CarsService,
    ) {}
    
    @UseGuards(AuthGuard)
    @Post()
    @UsePipes(ValidationPipe)
    addMyCar(@Request() req, @Body() addCarDto: AddCarDto) {
        const { id }: User = req.user;
        return this.carService.createCar(addCarDto, id);
    } 


    @UseGuards(AuthGuard)
    @Get()
    async getMyCars(@Request() req) {
        const { id }: User = req.user;
        
        return this.carService.getMyCars(id);
    }
}
