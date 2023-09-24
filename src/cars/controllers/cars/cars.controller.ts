import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put, Req, Request, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { AddCarDto } from 'src/cars/dto/AddCarDto';
import { UpdateCarDto } from 'src/cars/dto/UpdateCarDto';
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

    @UseGuards(AuthGuard)
    @Delete(':id')
    async deleteCar(@Param('id', ParseIntPipe) id: number, @Request() req) {
        return await this.carService.deleteCar(id, req.user.id);
    }

    @UseGuards(AuthGuard)
    @UsePipes(ValidationPipe)
    @Put(':id')
    async updateCar
    (
        @Param('id', ParseIntPipe) id: number, 
        @Body() updateCarDto: UpdateCarDto,
        @Request() req
    ) {
        if (!updateCarDto.name && !updateCarDto.state_number && !updateCarDto.type) {
            throw new HttpException("Provide least 1 filed for update", HttpStatus.BAD_REQUEST);
        }

        return await this.carService.updateCar(id, updateCarDto, req.user.id);
    }

}
